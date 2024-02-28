<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Order;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Stripe\Checkout\Session;
use Stripe\Stripe;


class StripeController extends Controller
{
    public function payment(Request $request)
    {
        try {
            $validator = Validator::make(
                $request->all(), [
                'product_ids' => 'required|array',
                ]
            );

            if ($validator->fails()) {
                return response()->json(['error' => $validator->errors()], 400);
            }


            $productIds = $request->product_ids;

            $products = Product::whereIn('id', $productIds)->get();

            // Ensure products are not empty
            if ($products->isEmpty()) {
                return response()->json(['error' => 'No valid products found'], 400);
            }

            $lineItems = [];

            foreach ($products as $product) {
                $priceInCents = is_numeric($product->price) ? $product->price * 100 : 0;

                $lineItems[] = [
                    'price_data' => [
                        'currency' => 'usd',
                        'unit_amount' => $priceInCents,
                        'product_data' => [
                            'name' => $product->name,
                            'description' => $product->description,
                        ],
                    ],
                    'quantity' => 1,
                ];
            }

            dd($lineItems);
            /*
            Stripe::setApiKey(config('stripe.secret_key'));

            $session = Session::create([
                'payment_method_types' => ['card', 'cashapp', 'us_bank_account'],
                'line_items' => $lineItems,
                'mode' => 'payment',
                'success_url' => 'https://nominet.vensle.com/payment/success',
                'cancel_url' => 'https://nominet.vensle.com/payment/cancel',
            ]);
            */
            $userId = Auth::id();

            Order::where('user_id', $userId)->delete();

            //TODO: Store product snapshot, incase user updates product in a later date
                $order = Order::create(
                    [
                    'user_id' => $userId,
                    'stripe_session_id' => 1,
                    //'stripe_session_id' => $session->id,
                    'product_ids' => json_encode($productIds),
                    ]
                );

            //return response()->json(['url' => $session->url]);
            return response()->json(['url' => 'https://nominet.vensle.com/payment/success']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function paymentSuccessful(Request $request)
    {
        try {
            $userId = Auth::id();

            // Find the user's existing order
            $order = Order::where('user_id', $userId)->firstOrFail();

            // If an order exists, update its status to "completed"
            $order->status = 'completed';
            $order->save();

            return response()->json(
                [
                'message' => 'Payment successful. Order status updated.',
                'product_ids' => $order->product_ids
                ]
            );
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
