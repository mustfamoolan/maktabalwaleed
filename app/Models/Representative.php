<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Representative extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'phone',
        'email',
        'area',
        'hire_date',
        'base_salary',
        'commission_plan', // targets, boxes, profit
        'is_active',
        'minimum_performance_rate',
        'targets_settings', // JSON field for targets configuration
        'commission_settings' // JSON field for commission configuration
    ];

    protected $casts = [
        'hire_date' => 'date',
        'base_salary' => 'decimal:2',
        'is_active' => 'boolean',
        'minimum_performance_rate' => 'decimal:2',
        'targets_settings' => 'array',
        'commission_settings' => 'array'
    ];

    // Relationships
    public function sales()
    {
        return $this->hasMany(Sale::class);
    }

    public function targets()
    {
        return $this->hasMany(RepresentativeTarget::class);
    }

    public function commissions()
    {
        return $this->hasMany(RepresentativeCommission::class);
    }

    public function invoices()
    {
        return $this->hasMany(Invoice::class);
    }

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeByArea($query, $area)
    {
        return $query->where('area', $area);
    }

    public function scopeByCommissionPlan($query, $plan)
    {
        return $query->where('commission_plan', $plan);
    }

    // Helper methods
    public function getCurrentMonthSales($month = null)
    {
        $month = $month ?: now()->format('Y-m');

        return $this->sales()
            ->whereYear('created_at', substr($month, 0, 4))
            ->whereMonth('created_at', substr($month, 5, 2))
            ->sum('amount');
    }

    public function getCurrentMonthReturns($month = null)
    {
        $month = $month ?: now()->format('Y-m');

        return $this->sales()
            ->whereYear('created_at', substr($month, 0, 4))
            ->whereMonth('created_at', substr($month, 5, 2))
            ->sum('returned_amount');
    }

    public function getCurrentMonthBoxes($month = null)
    {
        $month = $month ?: now()->format('Y-m');

        return $this->sales()
            ->whereYear('created_at', substr($month, 0, 4))
            ->whereMonth('created_at', substr($month, 5, 2))
            ->sum('boxes_count');
    }

    public function getCurrentMonthCashCollected($month = null)
    {
        $month = $month ?: now()->format('Y-m');

        return $this->sales()
            ->whereYear('created_at', substr($month, 0, 4))
            ->whereMonth('created_at', substr($month, 5, 2))
            ->sum('cash_collected');
    }

    public function getCurrentMonthInvoicesCount($month = null)
    {
        $month = $month ?: now()->format('Y-m');

        return $this->invoices()
            ->whereYear('created_at', substr($month, 0, 4))
            ->whereMonth('created_at', substr($month, 5, 2))
            ->count();
    }

    public function getCurrentMonthClientsDebt($month = null)
    {
        $month = $month ?: now()->format('Y-m');

        return $this->invoices()
            ->whereYear('created_at', substr($month, 0, 4))
            ->whereMonth('created_at', substr($month, 5, 2))
            ->sum('debt_amount');
    }

    public function getCurrentMonthProfit($month = null)
    {
        $month = $month ?: now()->format('Y-m');

        return $this->sales()
            ->whereYear('created_at', substr($month, 0, 4))
            ->whereMonth('created_at', substr($month, 5, 2))
            ->sum('profit_amount');
    }

    public function calculateCommission($month = null)
    {
        $month = $month ?: now()->format('Y-m');

        switch ($this->commission_plan) {
            case 'targets':
                return $this->calculateTargetsCommission($month);
            case 'boxes':
                return $this->calculateBoxesCommission($month);
            case 'profit':
                return $this->calculateProfitCommission($month);
            default:
                return 0;
        }
    }

    private function calculateTargetsCommission($month)
    {
        // Get targets for the month
        $targets = $this->targets()
            ->whereYear('period', substr($month, 0, 4))
            ->whereMonth('period', substr($month, 5, 2))
            ->get();

        $totalCommission = 0;
        $totalPerformance = 0;
        $targetCount = 0;

        foreach ($targets as $target) {
            $achieved = $this->getAchievedAmountForTarget($target, $month);
            $percentage = ($achieved / $target->target_amount) * 100;

            $totalPerformance += $percentage;
            $targetCount++;

            // Calculate commission based on performance
            if ($percentage >= 100) {
                // Bonus for over-achievement
                $bonus = ($percentage - 100) * ($this->commission_settings['over_achievement_rate'] ?? 0.1);
                $totalCommission += $target->target_amount * (0.1 + $bonus / 100);
            } elseif ($percentage >= ($this->minimum_performance_rate ?? 80)) {
                // Full commission for meeting minimum
                $totalCommission += $target->target_amount * 0.1;
            } else {
                // Penalty for under-performance
                $penalty = (($this->minimum_performance_rate ?? 80) - $percentage) * ($this->commission_settings['penalty_rate'] ?? 0.15);
                $totalCommission -= $target->target_amount * ($penalty / 100);
            }
        }

        $averagePerformance = $targetCount > 0 ? $totalPerformance / $targetCount : 0;

        return [
            'amount' => max(0, $totalCommission), // Ensure no negative commission
            'percentage' => $averagePerformance,
            'details' => [
                'targets_count' => $targetCount,
                'average_performance' => $averagePerformance
            ]
        ];
    }

    private function calculateBoxesCommission($month)
    {
        $boxesSold = $this->getCurrentMonthBoxes($month);
        $pricePerBox = $this->commission_settings['price_per_box'] ?? 300;
        $targetBoxes = $this->commission_settings['target_boxes'] ?? 6000;

        $commission = $boxesSold * $pricePerBox;
        $percentage = ($boxesSold / $targetBoxes) * 100;

        return [
            'amount' => $commission,
            'percentage' => $percentage,
            'details' => [
                'boxes_sold' => $boxesSold,
                'price_per_box' => $pricePerBox,
                'target_boxes' => $targetBoxes
            ]
        ];
    }

    private function calculateProfitCommission($month)
    {
        $profit = $this->getCurrentMonthProfit($month);
        $profitPercentage = $this->commission_settings['profit_percentage'] ?? 20;

        $commission = $profit * ($profitPercentage / 100);

        return [
            'amount' => $commission,
            'percentage' => $profitPercentage,
            'details' => [
                'total_profit' => $profit,
                'profit_percentage' => $profitPercentage
            ]
        ];
    }

    private function getAchievedAmountForTarget($target, $month)
    {
        // This would need to be implemented based on your sales tracking logic
        // For now, return a placeholder
        return 0;
    }

    public function getTotalSalary($month = null)
    {
        $commission = $this->calculateCommission($month);
        return $this->base_salary + $commission['amount'];
    }

    public function getEfficiencyRate($month = null)
    {
        $sales = $this->getCurrentMonthSales($month);
        $returns = $this->getCurrentMonthReturns($month);

        if ($sales == 0) return 0;

        return (($sales - $returns) / $sales) * 100;
    }

    public function getPerformanceReport($month = null)
    {
        $month = $month ?: now()->format('Y-m');

        return [
            'sales_amount' => $this->getCurrentMonthSales($month),
            'returned_goods' => $this->getCurrentMonthReturns($month),
            'total_boxes' => $this->getCurrentMonthBoxes($month),
            'cash_collected' => $this->getCurrentMonthCashCollected($month),
            'invoices_count' => $this->getCurrentMonthInvoicesCount($month),
            'clients_debt' => $this->getCurrentMonthClientsDebt($month),
            'profit' => $this->getCurrentMonthProfit($month),
            'efficiency_rate' => $this->getEfficiencyRate($month),
            'commission' => $this->calculateCommission($month),
            'total_salary' => $this->getTotalSalary($month)
        ];
    }
}
