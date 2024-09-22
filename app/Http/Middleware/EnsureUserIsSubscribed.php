<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Subscription; // Adicione a importação do modelo Subscription

class EnsureUserIsSubscribed
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->user()) {
            $subscription = Subscription::where('user_id', $request->user()->id)
                ->orderBy('created_at', 'desc')
                ->first();

            if (!$subscription || $subscription->stripe_status !== 'active') {
                return redirect('/choose_plan');
            }
        } else {
            return redirect('/login');
        }

        return $next($request);
    }
}
