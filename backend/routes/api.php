<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserAuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\FilterController;
use App\Http\Controllers\ProductRequestController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/v1/register', [UserAuthController::class, 'register']);
Route::post('/v1/login', [UserAuthController::class, 'login']);

Route::middleware('auth:api')->group(function () {
    Route::post('/v1/update-profile', 'App\Http\Controllers\UserAuthController@updateProfile');
    Route::post('/v1/update-password', 'App\Http\Controllers\UserAuthController@updatePassword');
    Route::post('/v1/update-profile-picture', 'App\Http\Controllers\UserAuthController@updateProfilePicture');
});

//Route::get('/v1/products/filter', [FilterController::class, 'test']);

//Test
Route::get('/v1/products/filter', [ProductController::class, 'filter']);

/**
 * Query Parameters:
 * - per_page: Number of items per page.
 * - e.g: http://localhost:8000/api/v1/products/top-by-sold?per_page=10
 */
Route::get('/v1/products/top-by-quantity', [ProductController::class, 'getTopProductsByQuantity']);
Route::get('/v1/products/top-by-sold', [ProductController::class, 'getTopProductsBySold']);
Route::get('/v1/products/top-by-ratings', [ProductController::class, 'getTopProductsByRatings']);
Route::get('/v1/products/top-by-views', [ProductController::class, 'getTopProductsByViews']);
/** */

Route::apiResource('v1/products', ProductController::class);


//Route::middleware('auth:api')->apiResource('v1/products', ProductController::class);


//[ Product request
Route::apiResource('/v1/product-requests', ProductRequestController::class);
// ]

Route::post('v1/add-to-cart', [CartController::class, 'addToCart']);
Route::post('v1/remove-from-cart', [CartController::class, 'removeFromCart']);
Route::post('v1/update-cart', [CartController::class, 'updateCart']);
Route::post('v1/clear-cart', [CartController::class, 'clearCart']);

Route::middleware('auth')->post('/merge-carts', [CartController::class, 'mergeCarts']);

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});


Route::post('/v1/payment', [PaymentController::class, 'makePayment']);
