<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
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


// [ Products
/**
 * Query Parameters:
 * - per_page: Number of items per page.
 * - e.g: http://localhost:8000/api/v1/products/top-by-quantity?per_page=10
 */
Route::get('/v1/products/top-by-quantity', [ProductController::class, 'getTopProductsByQuantity']);
Route::get('/v1/products/top-by-sold', [ProductController::class, 'getTopProductsBySold']);
Route::get('/v1/products/top-by-ratings', [ProductController::class, 'getTopProductsByRatings']);
Route::get('/v1/products/top-by-views', [ProductController::class, 'getTopProductsByViews']);
/** */
Route::apiResource('v1/products', ProductController::class);
// ]

//[ Product request
Route::apiResource('/v1/product-requests', ProductRequestController::class);
// ]




