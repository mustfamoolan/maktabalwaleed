<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RepresentativeCommissionPlan extends Model
{
    use HasFactory;

    protected $fillable = [
        'representative_id',
        'plan_type',
        'fixed_salary',
        'is_active',
        'target_settings',
        'box_target',
        'box_commission',
        'profit_percentage',
        'minimum_performance_rate',
        'notes',
    ];

    protected $casts = [
        'fixed_salary' => 'decimal:2',
        'is_active' => 'boolean',
        'target_settings' => 'array',
        'box_commission' => 'decimal:2',
        'profit_percentage' => 'decimal:2',
        'minimum_performance_rate' => 'decimal:2',
    ];

    public function representative(): BelongsTo
    {
        return $this->belongsTo(Representative::class);
    }

    // تحديد نوع الخطة
    public function getReadablePlanTypeAttribute()
    {
        $types = [
            'target_based' => 'خطة الأهداف المحددة',
            'box_based' => 'خطة الكراتين',
            'profit_based' => 'خطة العمولة على الربح',
        ];

        return $types[$this->plan_type] ?? 'غير محدد';
    }

    // التحقق من صحة الخطة
    public function isValidPlan()
    {
        switch ($this->plan_type) {
            case 'target_based':
                return !empty($this->target_settings);
            case 'box_based':
                return $this->box_target > 0 && $this->box_commission > 0;
            case 'profit_based':
                return $this->profit_percentage > 0;
            default:
                return false;
        }
    }

    // تفعيل الخطة (إلغاء تفعيل الخطط الأخرى)
    public function activate()
    {
        // إلغاء تفعيل جميع الخطط الأخرى للمندوب
        $this->representative
            ->commissionPlans()
            ->where('id', '!=', $this->id)
            ->update(['is_active' => false]);

        // تفعيل هذه الخطة
        $this->update(['is_active' => true]);
    }
}
