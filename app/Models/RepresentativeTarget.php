<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RepresentativeTarget extends Model
{
    use HasFactory;

    protected $fillable = [
        'representative_id',
        'target_type', // product, supplier, category
        'target_reference_id', // product_id, supplier_id, category_id
        'target_name',
        'target_amount',
        'achieved_amount',
        'period', // YYYY-MM format
        'period_type', // monthly, quarterly, yearly
        'is_active'
    ];

    protected $casts = [
        'target_amount' => 'decimal:2',
        'achieved_amount' => 'decimal:2',
        'period' => 'date',
        'is_active' => 'boolean'
    ];

    // Relationships
    public function representative()
    {
        return $this->belongsTo(Representative::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'target_reference_id')
                    ->where('target_type', 'product');
    }

    public function supplier()
    {
        return $this->belongsTo(Supplier::class, 'target_reference_id')
                    ->where('target_type', 'supplier');
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'target_reference_id')
                    ->where('target_type', 'category');
    }

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeByType($query, $type)
    {
        return $query->where('target_type', $type);
    }

    public function scopeByPeriod($query, $period)
    {
        return $query->where('period', $period);
    }

    public function scopeCurrentMonth($query)
    {
        return $query->where('period', now()->format('Y-m-01'));
    }

    // Helper methods
    public function getPercentageAttribute()
    {
        if ($this->target_amount == 0) return 0;
        return ($this->achieved_amount / $this->target_amount) * 100;
    }

    public function getRemainingAttribute()
    {
        return max(0, $this->target_amount - $this->achieved_amount);
    }

    public function updateAchievedAmount()
    {
        // This would calculate the achieved amount based on sales data
        // Implementation depends on your sales tracking system
        $achieved = $this->calculateAchievedFromSales();
        $this->update(['achieved_amount' => $achieved]);
        return $achieved;
    }

    private function calculateAchievedFromSales()
    {
        // Placeholder - implement based on your sales system
        return 0;
    }

    public function isOverAchieved()
    {
        return $this->achieved_amount > $this->target_amount;
    }

    public function isUnderPerforming($minimumRate = 80)
    {
        return $this->getPercentageAttribute() < $minimumRate;
    }

    public function getStatusAttribute()
    {
        $percentage = $this->getPercentageAttribute();

        if ($percentage >= 100) {
            return 'exceeded';
        } elseif ($percentage >= 80) {
            return 'on_track';
        } elseif ($percentage >= 50) {
            return 'behind';
        } else {
            return 'critical';
        }
    }

    public function getStatusColorAttribute()
    {
        switch ($this->getStatusAttribute()) {
            case 'exceeded':
                return 'green';
            case 'on_track':
                return 'blue';
            case 'behind':
                return 'yellow';
            case 'critical':
                return 'red';
            default:
                return 'gray';
        }
    }
}
