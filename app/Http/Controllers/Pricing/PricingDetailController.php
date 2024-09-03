<?php

namespace App\Http\Controllers\Pricing;

use App\Models\PricingDetail;
use App\Models\PricingPerUser;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PricingDetailController
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'total_ingredients_cost' => 'required|numeric',
            'additional_costs' => 'required|numeric',
            'profit_and_labor_cost' => 'required|numeric',
            'units_yield' => 'required|numeric',
            'price_per_unit' => 'required|numeric',
            'packaging_cost' => 'required|numeric',
            'final_price_per_unit' => 'required|numeric',
            'pricing_id' => 'required|integer',
            'user_id' => 'required|integer',
        ]);

        $pricingDetail = PricingDetail::where('pricing_id', $validatedData['pricing_id'])->first();

        if ($pricingDetail) {
            $pricingDetail->update($validatedData);
        } else {
            $pricingDetail = PricingDetail::create($validatedData);
        }

        PricingPerUser::where('id', $validatedData['pricing_id'])
            ->update(['id_pricing_details' => $pricingDetail->id]);

        return redirect()->route('pricing_details.finalized', ['id' => $pricingDetail->id]);
    }


    public function index($id)
    {
        $pricingDetail = PricingDetail::findOrFail($id);

        return Inertia::render('Pricing/ShowDetailPricing', [
            'pricingDetails' => $pricingDetail,
        ]);
    }
}
