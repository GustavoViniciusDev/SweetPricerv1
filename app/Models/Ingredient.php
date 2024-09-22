<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ingredient extends Model
{
    use HasFactory;

    protected $table = 'ingredients';

    protected $fillable = [
        'name',
        'quantity',
        'quantity_used',
        'cost',
        'pricing_id',
        'user_id',
    ];

    public function pricingPerUser()
    {
        return $this->belongsTo(PricingPerUser::class, 'pricing_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
