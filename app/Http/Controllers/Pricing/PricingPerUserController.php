<?php

namespace App\Http\Controllers\Pricing;

use App\Models\PricingPerUser;
use App\Models\Ingredient;
use App\Models\PricingDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Routing\Controller;
use Inertia\Inertia;

class PricingPerUserController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name_pricing' => 'required|string|max:255',
        ]);

        $pricingPerUser = PricingPerUser::create([
            'name_pricing' => $request->input('name_pricing'),
            'user_id' => Auth::id(),
        ]);

        $pricingDetail = PricingDetail::where('pricing_id', $pricingPerUser->id)->first();

        if ($pricingDetail) {
            $pricingPerUser->update(['id_pricing_details' => $pricingDetail->id]);
        }

        $encodedName = urlencode($pricingPerUser->name_pricing);

        return redirect()->route('register_ingredients.show', [
            'id' => $pricingPerUser->id,
            'name_pricing' => $encodedName
        ])
            ->with('success', 'Precificação criada com sucesso!')
            ->with('pricingId', $pricingPerUser->id)
            ->with('pricingName', $pricingPerUser->name_pricing);
    }

    public function edit($id)
    {
        $pricing = PricingPerUser::with('ingredients')->findOrFail($id);
        $pricing_details = PricingDetail::where('pricing_id', $id)->first();

        return Inertia::render('Pricing/RegisterIngredients', [
            'pricing' => $pricing,
            'ingredients' => $pricing->ingredients,
            'pricing_id' => $pricing->id,
            'user_id' => $pricing->user_id,
            'pricing_details' => $pricing_details
        ]);
    }
}
