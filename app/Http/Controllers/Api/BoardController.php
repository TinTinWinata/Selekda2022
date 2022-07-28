<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Board;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BoardController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $board = Board::all();
        return response()->json($board, 200);
    }

    public function getLeaderboard($n)
    {
        $boardList = Board::orderBy('score', 'DESC')->take($n)->get();

        if (!$boardList) {
            return response()->json("There is no boards available", 404);
        }

        foreach ($boardList as $board) {
            $user = User::where('id', $board['userId'])->first();
            $board['user'] = $user;
        }
        return response()->json($boardList);
    }

    public function getPaginateLeaderboard($n)
    {
        $boards = Board::orderBy('score', 'DESC')->with('user')->paginate($n);

        if (!$boards) {
            return response()->json("There is no boards available", 404);
        }

        foreach ($boards as $board) {
            $board->date = date('d-m-Y', strtotime($board->created_at));
        }
        return response()->json($boards, 200);
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
            'score' => 'required',
            'userId' => 'required',
            'lifetime' => 'required',
        ]);

        $board = Board::create($request->all());
        if (!$board) {
            return response()->json("Not succesfully create board", 400);
        }
        return response()->json('Succesfully saved to leaderboard!', 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Board  $board
     * @return \Illuminate\Http\Response
     */
    public function show(Board $board)
    {
        if (!$board) {
            return response()->json("You cannot get this board!");
        } else {
            return response()->json($board, 200);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Board  $board
     * @return \Illuminate\Http\Response
     */
    public function edit(Board $board)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Board  $board
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Board $board)
    {
        if ($board->update($request->all())) {
            return response()->json("Succesfully update data!");
        } else {
            return response()->json("Failed update data!");
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Board  $board
     * @return \Illuminate\Http\Response
     */
    public function destroy(Board $board)
    {
        if ($board->delete()) {
            return response()->json("User has been deleted");
        } else {
            return response()->json("Failed to delete user!");
        }
    }
}
