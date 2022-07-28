<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Captcha;
use Illuminate\Http\Request;

class CaptchaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Captcha  $captcha
     * @return \Illuminate\Http\Response
     */
    public function show(Captcha $captcha)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Captcha  $captcha
     * @return \Illuminate\Http\Response
     */
    public function edit(Captcha $captcha)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Captcha  $captcha
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Captcha $captcha)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Captcha  $captcha
     * @return \Illuminate\Http\Response
     */
    public function destroy(Captcha $captcha)
    {
        //
    }
    public function getOne()
    {
        $captcha = Captcha::inRandomOrder()->first();
        if (!$captcha) {
            return response()->json("looks we can't give our captcha to you", 404);
        } else {
            $data = $captcha->only(['imageUrl', 'id']);
            return response()->json($data, 200);
        }
    }
    public function validateCaptcha(Request $req)
    {
        $req->validate([
            'value' => 'required',
            'id' => 'required'
        ]);
        $captcha = Captcha::where('id', '=', $req->id)->first();
        if (!$captcha) {
            return response()->json("Im sorry, no captcha available", 400);
        } else if ($captcha['value'] !== $req->value) {
            return response()->json(false, 200);
        } else {
            return response()->json(true, 200);
        }
    }
}
