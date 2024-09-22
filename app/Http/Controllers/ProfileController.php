<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Cashier\Cashier;
use Illuminate\Support\Facades\Log;
use App\Models\Subscription;

class ProfileController
{
    /**
     * Display the user's profile form.
     */
   public function edit(Request $request): Response
    {
        $sessionId = $request->get('session_id');

        // Obter assinatura ativa do usuário
        $subscription = Subscription::where('user_id', $request->user()->id)
            ->where('stripe_status', 'active')
            ->first();

        if ($sessionId) {
            $metadata = Cashier::stripe()->checkout->sessions->retrieve($sessionId, []);
            Log::info($metadata);

            return Inertia::render('Profile/Edit', [
                'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
                'status' => session('status'),
                'stripeSessionData' => $metadata,
                'subscription' => $subscription,
            ]);
        }

        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'subscription' => $subscription,
        ]);
    }


    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
