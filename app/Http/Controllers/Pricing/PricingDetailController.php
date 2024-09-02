<?php

namespace App\Http\Controllers\Pricing;

use App\Models\PricingDetail;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PricingDetailController
{
    public function store(Request $request)
    {
        echo($request);exit;
        $data = $request->validate([
            'pricing_id' => 'required|integer',
            'user_id' => 'required|integer',
            'ingredients' => 'required|array',
            'total_ingredients_cost' => 'required|numeric',
            'additional_costs' => 'required|numeric',
            'profit_and_labor_cost' => 'required|numeric',
            'units_yield' => 'required|integer',
            'price_per_unit' => 'required|numeric',
            'packaging_cost' => 'required|numeric',
            'final_price_per_unit' => 'required|numeric',
        ]);

        PricingDetail::create($data);

        return redirect()->route('pricing.finalized');
    }

    public function index()
    {
        $pricingDetails = PricingDetail::all();
        return Inertia::render('Pricing/ShowDetailPricing', compact('pricingDetails'));
    }
}
