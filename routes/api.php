<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\OrderController;
use App\Http\Controllers\API\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/profile', [AuthController::class, 'profile']);
    // Route::post('/orders', [OrderController::class, 'createOrder']);
    // Route::post('/orders/{order}/pay', [OrderController::class, 'payOrder']);
});

// Route::post('/webhook/orders', [OrderController::class, 'webhookPayment']);
