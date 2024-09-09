<?php

namespace App\Http\Controllers;

use App\Models\PricingPerUser;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class DashboardController
{
    public function index()
    {
        $userId = Auth::id();

        $list_pricings = PricingPerUser::where('user_id', $userId)
            ->orderByDesc('created_at')
            ->with('pricingDetails')
            ->get()
            ->map(function ($pricing) {
                return [
                    'id' => $pricing->id,
                    'name_pricing' => $pricing->name_pricing,
                    'user_id' => $pricing->user_id,
                    'id_pricing_details' => $pricing->pricingDetails ? $pricing->pricingDetails->id : null,
                ];
            });

        return Inertia::render('Dashboard', [
            'list_pricings' => $list_pricings,
        ]);
    }
}
