<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Supplier extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'product_categories',
        'contact_person',
        'phone',
        'email',
        'address',
        'city',
        'status',
        'credit_limit',
        'current_balance',
        'notes'
    ];

    protected $casts = [
        'product_categories' => 'array',
        'credit_limit' => 'decimal:2',
        'current_balance' => 'decimal:2',
    ];

    // العلاقات
    public function products()
    {
        return $this->hasMany(Product::class);
    }

    public function sales()
    {
        return $this->hasMany(Sale::class);
    }

    // إحصائيات المورد
    public function getTotalSalesAttribute()
    {
        return $this->sales()->sum('total_amount');
    }

    public function getTotalProfitAttribute()
    {
        return $this->sales()->sum('profit_amount');
    }

    // فئات المنتجات المتاحة
    public static function getProductCategories()
    {
        return [
            'غذائية' => 'المواد الغذائية والمشروبات',
            'منظفات' => 'منتجات التنظيف والصحة'
        ];
    }

    // الحصول على أسماء الفئات باللغة العربية
    public function getCategoriesNamesAttribute()
    {
        $categories = self::getProductCategories();
        return collect($this->product_categories)->map(function ($category) use ($categories) {
            return $categories[$category] ?? $category;
        })->toArray();
    }

    // التحقق من وجود فئة معينة
    public function hasCategory($category)
    {
        return in_array($category, $this->product_categories);
    }

    // إضافة فئة جديدة
    public function addCategory($category)
    {
        $categories = $this->product_categories;
        if (!in_array($category, $categories)) {
            $categories[] = $category;
            $this->update(['product_categories' => $categories]);
        }
    }

    // حذف فئة
    public function removeCategory($category)
    {
        $categories = array_filter($this->product_categories, function ($cat) use ($category) {
            return $cat !== $category;
        });
        $this->update(['product_categories' => array_values($categories)]);
    }

    // الحصول على الرصيد المتبقي
    public function getRemainingCreditAttribute()
    {
        return $this->credit_limit - $this->current_balance;
    }

    // التحقق من إمكانية الشراء
    public function canPurchase($amount)
    {
        return $this->remaining_credit >= $amount;
    }

    // تحديث الرصيد
    public function updateBalance($amount, $type = 'add')
    {
        if ($type === 'add') {
            $this->increment('current_balance', $amount);
        } else {
            $this->decrement('current_balance', $amount);
        }
    }

    // الموردين النشطين
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    // البحث بالاسم أو الفئة
    public function scopeSearch($query, $search)
    {
        return $query->where(function ($q) use ($search) {
            $q->where('name', 'like', "%{$search}%")
              ->orWhere('contact_person', 'like', "%{$search}%")
              ->orWhere('phone', 'like', "%{$search}%")
              ->orWhere('city', 'like', "%{$search}%");
        });
    }
}
