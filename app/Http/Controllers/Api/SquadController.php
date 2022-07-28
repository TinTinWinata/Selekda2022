<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Squad;
use Illuminate\Http\Request;

class SquadController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $squad = Squad::with('squadMembers')->with('achievements')->get();
        return response()->json($squad, 200);
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
        $squad = Squad::create($request->all());
        if (!$squad) {
            return response()->json("Not succesfully create squad", 400);
        }
        return response()->json('Succesfully created squad!', 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Squad  $squad
     * @return \Illuminate\Http\Response
     */
    public function show(Squad $squad)
    {
        $squad = Squad::with('squadMembers')->with('achievements')->first();

        if (!$squad) {
            return response()->json("You cannot get this squad!");
        } else {
            return response()->json($squad, 200);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Squad  $squad
     * @return \Illuminate\Http\Response
     */
    public function edit(Squad $squad)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Squad  $squad
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Squad $squad)
    {

        if ($squad->update($request->all())) {
            return response()->json("Succesfully update data!", 200);
        } else {
            return response()->json("Failed update data!", 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Squad  $squad
     * @return \Illuminate\Http\Response
     */
    public function destroy(Squad $squad)
    {
        if ($squad->delete()) {
            return response()->json("Squad has been deleted", 200);
        } else {
            return response()->json("Failed to delete user!", 404);
        }
    }
}
