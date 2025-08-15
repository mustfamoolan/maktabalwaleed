<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Sale extends Model
{
    use HasFactory;

    protected $fillable = [
        'invoice_number',
        'representative_id',
        'product_id',
        'supplier_id',
        'quantity',
        'cartons_sold',
        'unit_price',
        'total_amount',
        'profit_amount',
        'commission_earned',
        'customer_name',
        'customer_address',
        'customer_phone',
        'amount_received',
        'debt_amount',
        'payment_status',
        'sale_date',
        'is_returned',
        'returned_amount',
        'notes',
    ];

    protected $casts = [
        'unit_price' => 'decimal:2',
        'total_amount' => 'decimal:2',
        'profit_amount' => 'decimal:2',
        'commission_earned' => 'decimal:2',
        'amount_received' => 'decimal:2',
        'debt_amount' => 'decimal:2',
        'returned_amount' => 'decimal:2',
        'sale_date' => 'date',
        'is_returned' => 'boolean',
    ];

    public function representative(): BelongsTo
    {
        return $this->belongsTo(Representative::class);
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function supplier(): BelongsTo
    {
        return $this->belongsTo(Supplier::class);
    }

    // حساب العمولة تلقائياً بناءً على خطة المندوب
    public function calculateCommission()
    {
        $plan = $this->representative->activeCommissionPlan();
        if (!$plan) return 0;

        switch ($plan->plan_type) {
            case 'target_based':
                // حساب العمولة بناءً على تحقيق الأهداف
                return $this->total_amount * 0.05; // نسبة مثال
            case 'box_based':
                // حساب العمولة بناءً على عدد الكراتين
                return $this->cartons_sold * $plan->box_commission;
            case 'profit_based':
                // حساب العمولة بناءً على الربح
                return $this->profit_amount * ($plan->profit_percentage / 100);
            default:
                return 0;
        }
    }

    // تحديث العمولة عند الحفظ
    protected static function boot()
    {
        parent::boot();

        static::saving(function ($sale) {
            $sale->commission_earned = $sale->calculateCommission();
            $sale->debt_amount = $sale->total_amount - $sale->amount_received;
        });
    }
}
