<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PricingPerUser extends Model
{
    use HasFactory;
    protected $table = 'pricing_per_user';

    protected $fillable = [
        'name_pricing',
        'user_id',
    ];

    public function ingredients()
    {
        return $this->hasMany(Ingredient::class, 'pricing_id');
    }
}


