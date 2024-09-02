<?php

namespace App\Http\Controllers\Pricing;

use App\Models\PricingPerUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Routing\Controller;

class IngredientController extends Controller
{

    public function store(Request $request)
    {
        $request->validate([
            'pricing_id' => 'required|exists:pricing_per_user,id',
            'ingredients.*.name' => 'required|string',
            'ingredients.*.quantity' => 'required|numeric',
            'ingredients.*.cost' => 'required|numeric',
        ]);

        $pricingPerUser = PricingPerUser::findOrFail($request->input('pricing_id'));

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
}
