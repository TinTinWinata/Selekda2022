<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Banner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;

class BannerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {


        $banner = Banner::all();
        return response()->json($banner, 200);
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
            'title' => 'required',
            'status' => 'required'
        ]);


        $imageName =  time() . $request->image->getClientOriginalName();

        $imageUrl = "/images/" . $imageName;
        $request->image->move(public_path('images\\'), $imageName);
        $data = [
            'imageUrl' => $imageUrl,
            'title' => $request->title,
            'status' => $request->status,
        ];

        $banner = Banner::create($data);
        if (!$banner) {
            return response()->json("Not succesfully create banner", 400);
        }
        return response()->json('Succesfully created banner!', 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Banner $banner)
    {

        if (!$banner) {
            return response()->json("You cannot get this banner!");
        } else {
            return response()->json($banner, 200);
        }
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Banner $banner)
    {
    }

    public function randomBanner($n)
    {
        $banner = Banner::take($n)->get();
        return response()->json($banner, 200);
    }

    public function updateBanner(Request $request)
    {

        $request->validate([
            'id' => 'required',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'title' => 'required',
            'status' => 'required'
        ]);

        $banner = Banner::where('id', $request->id)
            ->first();
        if (!$banner) {
            return response()->json("Cannot find this banner");
        }

        File::delete($banner->imageUrl);

        $imageName =  time() . $request->image->getClientOriginalName();

        $imageUrl = "/images/" . $imageName;
        $request->image->move(public_path('images\\'), $imageName);
        $data = [
            'imageUrl' => $imageUrl,
            'title' => $request->title,
            'status' => $request->status,
        ];

        if ($banner->update($data)) {
            return response()->json("Succesfully update data!", 200);
        } else {
            return response()->json("Failed update data!", 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Banner $banner)
    {

        if ($banner->delete()) {
            return response()->json("Banner has been deleted", 200);
        } else {
            return response()->json("Failed to delete user!", 400);
        }
    }
}
