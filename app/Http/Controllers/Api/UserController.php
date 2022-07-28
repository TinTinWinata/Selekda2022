<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = User::all();
        return response()->json($user, 200);
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
            'username' => 'required',
            'name' => 'required',
            'email' => 'required | unique:users',
            'password' => 'required',
            'dob' => 'required',
            'phone' => 'required|numeric'
        ]);


        $data = [];

        if ($request->image) {

            $imageName =  time() . $request->image->getClientOriginalName();

            $imageUrl = "/images/" . $imageName;
            $request->image->move(public_path('images\\'), $imageName);
            $data = [
                'photoProfileUrl' => $imageUrl,
                'name' => $request->name,
                'password' => Hash::make($request->password),
                'username' => $request->username,
                'email' => $request->email,
                'role' => $request->role,
                'phone' => $request->phone,
                'dob' => $request->dob
            ];
        } else {
            $data = [
                'name' => $request->name,
                'password' => Hash::make($request->password),
                'username' => $request->username,
                'email' => $request->email,
                'phone' => $request->phone,
                'dob' => $request->dob,
            ];
        }


        $user = User::create($data);
        if ($user)
            return response()->json("Sucesss registering user", 200);
        else
            return response()->json("Failed to register user, 404");
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        if (!$user) {
            return response()->json("There's no use with that id!", 400);
        }
        return response()->json($user, 200);
    }


    public function get($id)
    {
        $user = User::where('id', $id)->first();
        if (!$user) {
            return response()->json("There's no use with that id!", 400);
        }
        return response()->json($user->only(['username', 'email', 'photoProfileUrl', 'dob', 'name', 'phone']), 200);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */

    public function updateUser(Request $request, $id)
    {
        $currUser = Auth::user();
        $user = User::where('id', $id)->first();


        if ($request->phone) {
            $request->validate(['phone' => 'numeric']);
        }
        if ($currUser['id'] !== $user['id']) {
            return response()->json("You cannot update someone profile!", 400);
        }

        if ($user->update($request->all())) {
            return response()->json("Succesfully update data!", 200);
        } else {
            return response()->json("Failed update data!", 400);
        }
    }

    public function updateUserAdmin(Request $request)
    {
        $request->validate([
            'username' => 'required',
            'name' => 'required',
            'email' => 'required | unique:users',
            'password' => 'required',
            'dob' => 'required',
            'phone' => 'required|numeric'
        ]);

        $user = User::where('id', $request->id)->first();
        if ($user) {
            if ($request->image) {
                $imageName =  time() . $request->image->getClientOriginalName();
                $imageUrl = "/images/" . $imageName;
                $request->image->move(public_path('images\\'), $imageName);
                $data = $request->except(['image']);
                $data['photoProfileUrl'] = $imageUrl;
                $user->update($data);
                return response()->json("Succesfully update user!", 200);
            } else {
                $user->update($request->all());
                return response()->json("Succesfully update user!", 200);
            }
        } else {
            return response()->json("User not found!", 404);
        }
    }

    public function update(Request $request, User $user)
    {
        if ($user->update($request->all())) {
            return response()->json("Succesfully update data!");
        } else {
            return response()->json("Failed update data!");
        }
    }

    public function changePassword(Request $request, User $user)
    {

        $user = User::where('id', $request->id)->first();
        if (!$user) {
            return response()->json("User not found", 404);
        }

        $request->validate([
            'password' => 'required',
            'old' => 'required',
        ]);

        if (Hash::check($request->old, $user->password)) {
            $user->update($request->only(['password']));
            return response()->json("Succesfully change password", 200);
        } else {
            return response()->json("Old password is invalid!", 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        if ($user->delete()) {
            return response()->json("User has been deleted");
        } else {
            return response()->json("Failed to delete user!");
        }
    }
}
