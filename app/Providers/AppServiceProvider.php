<?php

namespace App\Providers;

use App\Listeners\StripeEventListener;
use Illuminate\Auth\Events\Registered as Registerd;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Support\ServiceProvider;
use Laravel\Cashier\Cashier;
use Laravel\Cashier\Events\WebhookReceived;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Cashier::calculateTaxes();
    }

    /**
     * The event to listener moppings for the applicatin
     *
     * @var array<class-string, array<int, class-string>>
     */
    protected $listen = [
        Registerd::class => [
            SendEmailVerificationNotification::class,
        ],
        WebhookReceived::class => [
            StripeEventListener::class,
        ],
    ];
}
