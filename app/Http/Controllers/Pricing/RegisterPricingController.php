<?php

namespace App\Http\Controllers\Pricing;

use App\Models\PricingPerUser;
use Inertia\Inertia;
use Inertia\Response;

class RegisterPricingController
{
    public function show(string $id, string $name_pricing) : Response
    {
        $pricing = PricingPerUser::findOrFail($id);

        return Inertia::render('Pricing/RegisterIngredients', [
            'pricing' => $pricing,
            'name_pricing' => $name_pricing
        ]);
    }
}
