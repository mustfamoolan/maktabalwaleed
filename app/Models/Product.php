<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'code',
        'supplier_id',
        'category',
        'purchase_price',
        'selling_price',
        'stock_quantity',
        'boxes_per_carton',
        'expiry_date',
        'description',
        'is_active',
    ];

    protected $casts = [
        'purchase_price' => 'decimal:2',
        'selling_price' => 'decimal:2',
        'expiry_date' => 'date',
        'is_active' => 'boolean',
    ];

    public function supplier(): BelongsTo
    {
        return $this->belongsTo(Supplier::class);
    }

    public function sales(): HasMany
    {
        return $this->hasMany(Sale::class);
    }

    public function getProfitMarginAttribute()
    {
        return $this->selling_price - $this->purchase_price;
    }

    public function getProfitPercentageAttribute()
    {
        if ($this->purchase_price == 0) return 0;
        return round((($this->selling_price - $this->purchase_price) / $this->purchase_price) * 100, 2);
    }

    // إحصائيات المنتج
    public function getTotalSoldAttribute()
    {
        return $this->sales()->sum('quantity');
    }

    public function getTotalCartonsSoldAttribute()
    {
        return $this->sales()->sum('cartons_sold');
    }

    public function getTotalRevenueAttribute()
    {
        return $this->sales()->sum('total_amount');
    }
}
