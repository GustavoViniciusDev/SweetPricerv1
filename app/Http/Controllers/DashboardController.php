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
                ->with('ingredients')
                ->get();

        return Inertia::render('Dashboard', [
            'list_pricings' => $list_pricings,
        ]);
    }
}
