<?php

use App\Http\Controllers\Api\AchievementController;
use App\Http\Controllers\Api\BannerController;
use App\Http\Controllers\Api\BoardController;
use App\Http\Controllers\Api\CaptchaController;
use App\Http\Controllers\Api\LoginController;
use App\Http\Controllers\Api\SquadController;
use App\Http\Controllers\Api\SquadMemberController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/




// GUEST ROUTES
Route::get('/get-captcha', [CaptchaController::class, 'getOne']);
Route::post('/validate-captcha', [CaptchaController::class, 'validateCaptcha']);
Route::get('/paginate-leaderboard/{n}', [BoardController::class, 'getPaginateLeaderboard']);
Route::get('/leaderboard/{n}', [BoardController::class, 'getLeaderboard']);
Route::post('/login', [LoginController::class, 'login']);
Route::post('/register', [UserController::class, 'store']);

// MEMBER ROUTES
Route::middleware(['auth:api'])->group(function () {
    Route::get('/user/{id}', [UserController::class, 'get']);
    Route::get('/random-banner/{n}', [BannerController::class, 'randomBanner']);
    Route::put('/update-user/{id}', [UserController::class, 'updateUser']);
    Route::put('/change-password/{id}', [UserController::class, 'changePassword']);
    // Route::apiResource('board', BoardController::class);
    Route::get('/logout', [LoginController::class, 'logout']);
    Route::post('/save-leaderboard', [BoardController::class, 'store']);
    Route::get('/all-squad', [SquadController::class, 'index']);
    Route::get('/all-squad/{n}', [SquadController::class, 'show']);
});

// ADMIN ROUTES
Route::middleware(['auth:api', 'admin'])->group(function () {
    Route::post('update-squad-member', [SquadMemberController::class, 'updateMember']);
    Route::post('update-banner', [BannerController::class, 'updateBanner']);
    Route::post('update-user-admin', [UserController::class, 'updateUserAdmin']);
    Route::apiResource('achievement', AchievementController::class);
    Route::apiResource('banner', BannerController::class);
    Route::apiResource('user', UserController::class);
    Route::apiResource('squad', SquadController::class);
    Route::apiResource('squadMember', SquadMemberController::class);
});
