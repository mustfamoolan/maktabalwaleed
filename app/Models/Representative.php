<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Representative extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'phone',
        'identity_number',
        'address',
        'commission_percentage',
        'fixed_commission',
        'commission_type',
        'status',
        'areas',
        'product_categories',
        'monthly_target',
        'current_sales',
        'hire_date',
        'notes',
    ];

    protected $casts = [
        'areas' => 'array',
        'product_categories' => 'array',
        'commission_percentage' => 'decimal:2',
        'fixed_commission' => 'decimal:2',
        'monthly_target' => 'decimal:2',
        'current_sales' => 'decimal:2',
        'hire_date' => 'date',
    ];

    public function targets(): HasMany
    {
        return $this->hasMany(RepresentativeTarget::class);
    }

    public function incentives(): HasMany
    {
        return $this->hasMany(RepresentativeIncentive::class);
    }

    public function sales(): HasMany
    {
        return $this->hasMany(Sale::class);
    }

    public function commissionPlans(): HasMany
    {
        return $this->hasMany(RepresentativeCommissionPlan::class);
    }

    public function activeCommissionPlan()
    {
        return $this->commissionPlans()->where('is_active', true)->first();
    }

    // حساب نسبة تحقيق الهدف
    public function getTargetAchievementPercentageAttribute()
    {
        if ($this->monthly_target == 0) return 0;
        return round(($this->current_sales / $this->monthly_target) * 100, 2);
    }

    // حساب العمولة بناءً على نوع الخطة
    public function calculateCommission($month = null, $year = null)
    {
        $plan = $this->activeCommissionPlan();
        if (!$plan) return 0;

        $salesQuery = $this->sales();
        if ($month && $year) {
            $salesQuery->whereMonth('sale_date', $month)->whereYear('sale_date', $year);
        }

        switch ($plan->plan_type) {
            case 'target_based':
                return $this->calculateTargetBasedCommission($salesQuery, $plan);
            case 'box_based':
                return $this->calculateBoxBasedCommission($salesQuery, $plan);
            case 'profit_based':
                return $this->calculateProfitBasedCommission($salesQuery, $plan);
            default:
                return 0;
        }
    }

    private function calculateTargetBasedCommission($salesQuery, $plan)
    {
        $targetSettings = $plan->target_settings;
        $commission = 0;

        foreach ($targetSettings as $supplierId => $targetAmount) {
            $achieved = $salesQuery->where('supplier_id', $supplierId)->sum('total_amount');
            $achievementRate = $targetAmount > 0 ? ($achieved / $targetAmount) * 100 : 0;

            // إذا حقق أكثر من النسبة المطلوبة، يستحق عمولة
            if ($achievementRate >= $plan->minimum_performance_rate) {
                $commission += $achieved * 0.05; // 5% مثال
            }
        }

        return $commission;
    }

    private function calculateBoxBasedCommission($salesQuery, $plan)
    {
        $totalBoxes = $salesQuery->sum('cartons_sold');
        return $totalBoxes * $plan->box_commission;
    }

    private function calculateProfitBasedCommission($salesQuery, $plan)
    {
        $totalProfit = $salesQuery->sum('profit_amount');
        return $totalProfit * ($plan->profit_percentage / 100);
    }

    // إحصائيات المندوب
    public function getMonthlyStats($month, $year)
    {
        $sales = $this->sales()
            ->whereMonth('sale_date', $month)
            ->whereYear('sale_date', $year);

        return [
            'total_sales' => $sales->sum('total_amount'),
            'total_profit' => $sales->sum('profit_amount'),
            'total_cartons' => $sales->sum('cartons_sold'),
            'invoice_count' => $sales->count(),
            'cash_collected' => $sales->sum('amount_received'),
            'total_debt' => $sales->sum('debt_amount'),
            'returned_amount' => $sales->sum('returned_amount'),
            'commission_earned' => $this->calculateCommission($month, $year),
        ];
    }
}
