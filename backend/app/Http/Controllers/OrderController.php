<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    //

    /**
     * Get orders for the authenticated user.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getUserOrders()
    {
        try {
            $user = Auth::user();
            $orders = Order::with('products')->where('user_id', $user->id)->get();

            return response()->json($orders);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }	


    /**
     * Get details of a specific order by ID.
     *
     * @param  int  $orderId
     * @return \Illuminate\Http\JsonResponse
     */
    public function getOrderDetails($orderId)
    {
        try {
            $user = Auth::user();

            //$order = Order::with('products')->where('user_id', $user->id)->findOrFail($orderId);
            $order = Order::with('products')->where('user_id', $user->id)->find($orderId);

            if (!$order) {
                return response()->json(['error' => 'Order not found'], 404);
	    }

            return response()->json($order);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

}
