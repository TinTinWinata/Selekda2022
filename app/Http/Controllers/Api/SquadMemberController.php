<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SquadMember;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class SquadMemberController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $squadMember = SquadMember::all();
        return response()->json($squadMember, 200);
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
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'name' => 'required',
            'squadId' => 'required',
            'email' => 'required',
            'role' => 'required',
            'phone' => 'required||numeric',
            'dob' => 'required'
        ]);
        $imageName =  time() . $request->image->getClientOriginalName();

        $imageUrl = "/images/" . $imageName;
        $request->image->move(public_path('images\\'), $imageName);
        $data = [
            'photoProfileUrl' => $imageUrl,
            'name' => $request->name,
            'squadId' => $request->squadId,
            'email' => $request->email,
            'role' => $request->role,
            'phone' => $request->squadId,
            'dob' => $request->dob,
        ];

        $squadMember = SquadMember::create($data);

        if (!$squadMember) {
            return response()->json("Not succesfully create Member Squad", 400);
        }
        return response()->json('Succesfully created Member Squad!', 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\SquadMember  $squadMember
     * @return \Illuminate\Http\Response
     */
    public function show(SquadMember $squadMember)
    {
        if (!$squadMember) {
            return response()->json("You cannot get this squadMember!");
        } else {
            return response()->json($squadMember, 200);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\SquadMember  $squadMember
     * @return \Illuminate\Http\Response
     */
    public function edit(SquadMember $squadMember)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\SquadMember  $squadMember
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, SquadMember $squadMember)
    {

        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'name' => 'required',
            'squadId' => 'required',
            'email' => 'required',
            'role' => 'required',
            'phone' => 'required||numeric',
            'dob' => 'required'
        ]);

        File::delete($request->photoProfileUrl);

        $imageName =  time() . $request->image->getClientOriginalName();

        $imageUrl = "/images/" . $imageName;
        $request->image->move(public_path('images\\'), $imageName);
        $data = [
            'photoProfileUrl' => $imageUrl,
            'name' => $request->name,
            'squadId' => $request->squadId,
            'email' => $request->email,
            'role' => $request->role,
            'phone' => $request->squadId,
            'dob' => $request->dob,
        ];

        if ($squadMember->update($data)) {
            return response()->json("Succesfully update data!");
        } else {
            return response()->json("Failed update data!");
        }
    }

    public function updateMember(Request $request)
    {
        $squadMember = SquadMember::where('id', $request->id);

        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'name' => 'required',
            'squadId' => 'required',
            'email' => 'required',
            'role' => 'required',
            'phone' => 'required||numeric',
            'dob' => 'required'
        ]);

        File::delete($request->photoProfileUrl);

        $imageName =  time() . $request->image->getClientOriginalName();

        $imageUrl = "/images/" . $imageName;
        $request->image->move(public_path('images\\'), $imageName);
        $data = [
            'photoProfileUrl' => $imageUrl,
            'name' => $request->name,
            'email' => $request->email,
            'role' => $request->role,
            'phone' => $request->squadId,
            'dob' => $request->dob,
        ];

        // return response()->json($data['photoProfileUrl'], 200);

        if ($squadMember->update($data)) {
            return response()->json("Succesfully update data!", 200);
        } else {
            return response()->json("Failed update data!", 200);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\SquadMember  $squadMember
     * @return \Illuminate\Http\Response
     */
    public function destroy(SquadMember $squadMember)
    {
        if ($squadMember->delete()) {
            return response()->json("User has been deleted");
        } else {
            return response()->json("Failed to delete user!");
        }
    }
}
