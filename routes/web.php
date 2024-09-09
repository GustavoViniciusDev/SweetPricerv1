<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Pricing\PricingPerUserController;
use App\Http\Controllers\Pricing\RegisterPricingController;
use App\Http\Controllers\Pricing\IngredientController;
use App\Http\Controllers\Pricing\PricingController;
use App\Http\Controllers\Pricing\PricingDetailController;
use App\Http\Controllers\PricingHistory\PricingHistoryController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;

Route::get('/email/verify', function () {
    return Inertia::render('Auth/VerifyEmail');
})->middleware('auth')->name('verification.notice');

Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    $request->fulfill();

    return Inertia::render('/Dashboard');
})->middleware(['auth', 'signed'])->name('verification.verify');

Route::post('/email/verification-notification', function (Request $request) {
    $request->user()->sendEmailVerificationNotification();

    return back()->with('message', 'Email de Verificação Enviado!');
})->middleware(['auth', 'throttle:6,1'])->name('verification.send');

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware('auth', 'verified')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::post('/pricing', [PricingPerUserController::class, 'store'])->name('pricing.store');
    Route::get('/register_ingredients/{id}/{name_pricing}', [RegisterPricingController::class, 'show'])
        ->name('register_ingredients.show');
    Route::get('/edit-pricing/{id}', [PricingPerUserController::class, 'edit'])->name('pricing.edit');
    Route::get('/pricing_list', [PricingPerUserController::class, 'showpricings'])->name('pricing.showpricings');

    Route::get('/calculate-pricing/{pricing_id}', [PricingController::class, 'showPricing'])->name('calculate_pricing.show');
    Route::post('/pricing-details', [PricingController::class, 'storePricingDetails'])->name('pricing_details.store');
    Route::get('/pricing-details/{id}', [PricingController::class, 'showPricingDetails'])->name('pricing_details.finalized');
    Route::delete('/pricing/{id}', [PricingController::class, 'destroy'])->name('pricing.destroy');

    // Route::get('/pricing-history', [PricingHistoryController::class, 'index'])->name('pricing_history.index');
});

require __DIR__.'/auth.php';
