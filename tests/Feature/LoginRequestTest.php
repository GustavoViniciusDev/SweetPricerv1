<?php

namespace Tests\Feature;

use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LoginRequestTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_does_not_throw_exception_when_rate_limit_not_exceeded()
    {
        $request = new LoginRequest();

        RateLimiter::clear($request->throttleKey());

        // Simula que o limite de tentativas não foi atingido
        $request->ensureIsNotRateLimited();

        $this->assertTrue(true); // Teste passou se não lançou uma exceção
    }

    /** @test */
    public function it_throws_exception_when_rate_limit_exceeded()
    {
        $request = new LoginRequest();

        // Simula tentativas de login
        RateLimiter::hit($request->throttleKey(), 5);

        $this->expectException(\Illuminate\Validation\ValidationException::class);

        $request->ensureIsNotRateLimited();
    }
}
