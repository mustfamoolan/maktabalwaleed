<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RepresentativeCommission extends Model
{
    use HasFactory;

    protected $fillable = [
        'representative_id',
        'period', // YYYY-MM format
        'commission_type', // targets, boxes, profit
        'base_amount',
        'bonus_amount',
        'penalty_amount',
        'total_amount',
        'performance_percentage',
        'calculation_details', // JSON field with calculation breakdown
        'is_paid',
        'paid_at'
    ];

    protected $casts = [
        'period' => 'date',
        'base_amount' => 'decimal:2',
        'bonus_amount' => 'decimal:2',
        'penalty_amount' => 'decimal:2',
        'total_amount' => 'decimal:2',
        'performance_percentage' => 'decimal:2',
        'calculation_details' => 'array',
        'is_paid' => 'boolean',
        'paid_at' => 'datetime'
    ];

    // Relationships
    public function representative()
    {
        return $this->belongsTo(Representative::class);
    }

    // Scopes
    public function scopePaid($query)
    {
        return $query->where('is_paid', true);
    }

    public function scopeUnpaid($query)
    {
        return $query->where('is_paid', false);
    }

    public function scopeByPeriod($query, $period)
    {
        return $query->where('period', $period);
    }

    public function scopeCurrentMonth($query)
    {
        return $query->where('period', now()->format('Y-m-01'));
    }

    public function scopeByType($query, $type)
    {
        return $query->where('commission_type', $type);
    }

    // Helper methods
    public function markAsPaid()
    {
        $this->update([
            'is_paid' => true,
            'paid_at' => now()
        ]);
    }

    public function markAsUnpaid()
    {
        $this->update([
            'is_paid' => false,
            'paid_at' => null
        ]);
    }

    public function getNetAmountAttribute()
    {
        return $this->base_amount + $this->bonus_amount - $this->penalty_amount;
    }

    public function getFormattedPeriodAttribute()
    {
        return $this->period->format('Y-m');
    }

    public function getStatusAttribute()
    {
        if ($this->is_paid) {
            return 'paid';
        } elseif ($this->period->isPast()) {
            return 'overdue';
        } else {
            return 'pending';
        }
    }

    public function getStatusColorAttribute()
    {
        switch ($this->getStatusAttribute()) {
            case 'paid':
                return 'green';
            case 'overdue':
                return 'red';
            case 'pending':
                return 'yellow';
            default:
                return 'gray';
        }
    }

    public static function calculateForRepresentative(Representative $representative, $period = null)
    {
        $period = $period ?: now()->format('Y-m-01');

        // Get existing commission record or create new one
        $commission = static::firstOrNew([
            'representative_id' => $representative->id,
            'period' => $period
        ]);

        // Calculate commission based on representative's plan
        $calculation = $representative->calculateCommission($period);

        // Update commission record
        $commission->fill([
            'commission_type' => $representative->commission_plan,
            'base_amount' => $calculation['details']['base_amount'] ?? 0,
            'bonus_amount' => $calculation['details']['bonus_amount'] ?? 0,
            'penalty_amount' => abs($calculation['details']['penalty_amount'] ?? 0),
            'total_amount' => $calculation['amount'],
            'performance_percentage' => $calculation['percentage'],
            'calculation_details' => $calculation['details']
        ]);

        $commission->save();

        return $commission;
    }

    public static function calculateForAllRepresentatives($period = null)
    {
        $period = $period ?: now()->format('Y-m-01');
        $representatives = Representative::active()->get();
        $commissions = [];

        foreach ($representatives as $representative) {
            $commissions[] = static::calculateForRepresentative($representative, $period);
        }

        return collect($commissions);
    }

    public function getCalculationSummary()
    {
        $details = $this->calculation_details ?: [];

        return [
            'commission_type' => $this->commission_type,
            'performance_percentage' => $this->performance_percentage,
            'base_salary' => $this->representative->base_salary,
            'base_commission' => $this->base_amount,
            'bonus' => $this->bonus_amount,
            'penalty' => $this->penalty_amount,
            'total_commission' => $this->total_amount,
            'total_salary' => $this->representative->base_salary + $this->total_amount,
            'details' => $details
        ];
    }
}
