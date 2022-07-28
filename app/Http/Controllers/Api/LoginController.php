<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Response;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required',
            'password' => 'required',
        ]);

        $cred = $request->only('email', 'password');

        if (Auth::attempt($cred)) {
            $token = $request->user()->createToken('Api Token')->accessToken;
            $user = Auth::user();
            $user['token'] = $token;
            return response()->json($user, 200);
        } else {
            return response()->json('Invalid login credentials!', 401);
        }

        $request->validate();
    }

    public function logout()
    {
        $token = Auth::user()->token();
        if ($token) {
            $token->revoke();
            return response()->json("Logout success", 200);
        } else {
            return response()->json('Unauthorized user!', 401);
        }
    }
}
