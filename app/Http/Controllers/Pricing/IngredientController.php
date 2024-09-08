<?php

namespace App\Http\Controllers\Pricing;

use App\Models\Ingredient;
use Illuminate\Http\Request;
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

        foreach ($request->ingredients as $ingredient) {
            Ingredient::create([
                'name' => $ingredient['name'],
                'quantity' => $ingredient['quantity'],
                'cost' => $ingredient['cost'],
                'pricing_id' => $request->pricing_id,
            ]);
        }

        return response()->json(['message' => 'Ingredientes salvos com sucesso']);
    }
}
