<?php

namespace App\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;
use Laravel\Cashier\Events\WebhookReceived;

class StripeEventListener
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(WebhookReceived $event): void
    {
        if ($event->payload['type'] === 'payment_intent.succeeded') {
            Log::info('Payment succeeded From Listener' . json_encode($event->payload));
        }

        if ($event->payload['type'] === 'checkout.session.completed') {
            Log::info('Payment succeeded From Listener' . json_encode($event->payload));
        }

    }
}
