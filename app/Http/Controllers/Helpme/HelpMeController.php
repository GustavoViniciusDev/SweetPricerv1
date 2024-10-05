<?php

namespace App\Http\Controllers\Helpme;

use Illuminate\Http\Request;
use App\Models\Helpme;
use Inertia\Inertia;

class HelpMeController
{
    public function send(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
            'message' => 'required|string|max:800',
        ]);

        $helpMe =  Helpme::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'message' => $request->input('message'),
        ]);

        return back()->with('success', 'Mensagem enviada com sucesso!');
    }
}
