<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Subscription;
use Illuminate\Support\Facades\Auth;

class ChoosePlanController
{
    public function choosePlan()
    {
        $userId = Auth::id();

        $subscription = Subscription::where('user_id', $userId)
            ->where('stripe_status', 'active')
            ->first();

        return Inertia::render('Plans/PlanSelection', [
            'subscription' => $subscription,
        ]);
    }
}
