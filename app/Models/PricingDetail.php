<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PricingDetail extends Model
{
    use HasFactory;
    protected $table = 'pricing_details';

    protected $fillable = [
        'pricing_id',
        'user_id',
        'total_ingredients_cost',
        'additional_costs',
        'profit_and_labor_cost',
        'units_yield',
        'price_per_unit',
        'packaging_cost',
        'final_price_per_unit',
    ];

}
