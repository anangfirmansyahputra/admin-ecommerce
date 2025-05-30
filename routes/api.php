<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\OrderController;
use App\Http\Controllers\API\ProductController;
use App\Http\Controllers\CategoryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/profile', [AuthController::class, 'profile']);
    Route::post('/orders', [OrderController::class, 'createOrder']);
    Route::post('/orders/{order}/pay', [OrderController::class, 'payOrder']);

    Route::get('/orders', [OrderController::class, 'getOrders']);
    Route::get('/orders/{order}', [OrderController::class, 'getOrder']);

    Route::resource('products', ProductController::class)->except([
        'index',
        'show'
    ]);

    Route::resource('categories', CategoryController::class)->except([
        'index',
        'show',
    ]);
});

Route::post('/webhook/orders', [OrderController::class, 'webhookPayment']);

Route::resource('products', ProductController::class)->only([
    'index',
    'show'
]);

Route::resource('categories', CategoryController::class)->only([
    'index',
    'show'
]);
