<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RepresentativeTarget extends Model
{
    use HasFactory;

    protected $fillable = [
        'representative_id',
        'period_type',
        'period_year',
        'period_month',
        'period_quarter',
        'target_amount',
        'achieved_amount',
        'achievement_percentage',
        'description',
    ];

    protected $casts = [
        'target_amount' => 'decimal:2',
        'achieved_amount' => 'decimal:2',
        'achievement_percentage' => 'decimal:2',
    ];

    public function representative(): BelongsTo
    {
        return $this->belongsTo(Representative::class);
    }

    public function updateAchievementPercentage()
    {
        if ($this->target_amount > 0) {
            $this->achievement_percentage = round(($this->achieved_amount / $this->target_amount) * 100, 2);
            $this->save();
        }
    }
}
