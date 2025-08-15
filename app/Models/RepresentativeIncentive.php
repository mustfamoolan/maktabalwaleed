<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RepresentativeIncentive extends Model
{
    use HasFactory;

    protected $fillable = [
        'representative_id',
        'type',
        'amount',
        'reason',
        'effective_date',
        'status',
        'notes',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'effective_date' => 'date',
    ];

    public function representative(): BelongsTo
    {
        return $this->belongsTo(Representative::class);
    }
}
