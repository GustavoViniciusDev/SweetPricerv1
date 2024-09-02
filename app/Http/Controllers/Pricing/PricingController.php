<?php

namespace App\Http\Controllers\Pricing;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\PricingPerUser;
use Illuminate\Support\Facades\Auth;

class PricingController
{
    public function show($pricing_id)
    {
        $pricing = PricingPerUser::with('ingredients')
            ->where('id', $pricing_id)
            ->where('user_id', Auth::id())
            ->firstOrFail();

        return Inertia::render('Pricing/CalculatePricing', [
            'pricing_id' => $pricing->id,
            'user_id' => Auth::id(),
            'ingredients' => $pricing->ingredients,
        ]);
    }
}
