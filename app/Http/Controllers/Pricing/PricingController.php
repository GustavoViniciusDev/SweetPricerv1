<?php

namespace App\Http\Controllers\Pricing;

use App\Models\PricingPerUser;
use App\Models\PricingDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PricingController
{
    public function storeIngredients(Request $request)
    {
        $request->validate([
            'pricing_id' => 'required|exists:pricing_per_user,id',
            'ingredients.*.name' => 'required|string',
            'ingredients.*.quantity' => 'required|numeric',
            'ingredients.*.cost' => 'required|numeric',
        ]);

        $pricingPerUser = PricingPerUser::where('id', $request->input('pricing_id'))
            ->where('user_id', Auth::id())
            ->firstOrFail();

        $ingredients = $request->input('ingredients');

        foreach ($ingredients as $ingredientData) {
            $pricingPerUser->ingredients()->create([
                'name' => $ingredientData['name'],
                'quantity' => $ingredientData['quantity'],
                'cost' => $ingredientData['cost'],
                'user_id' => Auth::id(),
            ]);
        }

        return redirect()->route('calculate_pricing.show', [
            'pricing_id' => $pricingPerUser->id,
            'user_id' => Auth::id(),
        ])->with('success', 'Ingredientes salvos com sucesso!');
    }

    public function showPricing($pricing_id)
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

    public function storePricingDetails(Request $request)
    {
        $validatedData = $request->validate([
            'total_ingredients_cost' => 'required|numeric',
            'additional_costs' => 'required|numeric',
            'profit_and_labor_cost' => 'required|numeric',
            'units_yield' => 'required|numeric',
            'price_per_unit' => 'required|numeric',
            'packaging_cost' => 'required|numeric',
            'final_price_per_unit' => 'required|numeric',
            'pricing_id' => 'required|exists:pricing_per_user,id',
            'user_id' => 'required|integer',
            'ingredients.*.id' => 'nullable|exists:ingredients,id',
            'ingredients.*.name' => 'required|string',
            'ingredients.*.quantity' => 'required|numeric',
            'ingredients.*.quantity_used' => 'required|numeric',
            'ingredients.*.cost' => 'required|numeric',
        ]);

        $pricingPerUser = PricingPerUser::where('id', $validatedData['pricing_id'])
            ->where('user_id', Auth::id())
            ->firstOrFail();

        $ingredients = $request->input('ingredients');

        foreach ($ingredients as $ingredientData) {
            $ingredientId = $ingredientData['id'] ?? null;

            $pricingPerUser->ingredients()->updateOrCreate(
                ['id' => $ingredientId],
                [
                    'name' => $ingredientData['name'],
                    'quantity' => $ingredientData['quantity'],
                    'quantity_used' => $ingredientData['quantity_used'],
                    'cost' => $ingredientData['cost'],
                    'user_id' => Auth::id(),
                ]
            );
        }

        $pricingDetail = PricingDetail::updateOrCreate(
            ['pricing_id' => $validatedData['pricing_id']],
            $validatedData
        );

        return redirect()->route('pricing_details.finalized', ['id' => $pricingDetail->id])
            ->with('success', 'Precificação salva com sucesso!');
    }

    public function showPricingDetails($id)
    {
        $pricingDetail = PricingDetail::findOrFail($id);

        return Inertia::render('Pricing/ShowDetailPricing', [
            'pricingDetails' => $pricingDetail,
        ]);
    }

    public function destroy($id)
    {
        $pricing = PricingPerUser::where('id', $id)
            ->where('user_id', Auth::id())
            ->firstOrFail();

        $pricing->ingredients()->delete();
        $pricing->pricingDetails()->delete();
        $pricing->delete();

        return redirect()->back()->with('success', 'Precificação excluída com sucesso!');
    }
}
