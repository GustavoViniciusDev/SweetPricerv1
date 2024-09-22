<?php

namespace App\Http\Controllers\Stripe;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Laravel\Cashier\Http\Controllers\WebhookController as ControllersWebhookController;
use Illuminate\Support\Facades\Log;

class WebhookController extends ControllersWebhookController
{
    // public function handlePaymentIntentSucceeded(array $payload)
    // {
    //     Log::info('Payment succeeded' . json_encode($payload));
    // }
}
