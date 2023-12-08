<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User; // Import the User model or your relevant model

class CartController extends Controller
{
    public function addToCart(Request $request)
    {
        $productId = $request->input('productId');
        $quantity = $request->input('quantity');

        $user = auth()->user();

        $cartItem = $user->cart()->where('product_id', $productId)->first();

        if ($cartItem) {
            $cartItem->update(['quantity' => $cartItem->quantity + $quantity]);
        } else {
            $cartItem = $user->cart()->create([
                'product_id' => $productId,
                'quantity' => $quantity,
            ]);
        }

        return response()->json(['message' => 'Item added to cart successfully', 'cartItem' => $cartItem]);
    }

    public function removeFromCart(Request $request)
    {
        $productId = $request->input('productId');

        $user = auth()->user();

        $user->cart()->where('product_id', $productId)->delete();

        return response()->json(['message' => 'Item removed from cart successfully', 'cartItem' => null]);
    }

    public function updateCart(Request $request)
    {
        $productId = $request->input('productId');
        $quantity = $request->input('quantity');

        $user = auth()->user();

        $user->cart()->where('product_id', $productId)->update(['quantity' => $quantity]);

        return response()->json(['message' => 'Cart updated successfully', 'cartItem' => null]);
    }

    public function clearCart()
    {
        $user = auth()->user();

        $user->cart()->delete();

        return response()->json(['message' => 'Cart cleared successfully', 'cartItem' => null]);
    }
    




public function mergeCarts(Request $request)
{
    $user = auth()->user();

    // Assume $request->input('unauthenticatedCart') is an array of cart items
    $unauthenticatedCart = $request->input('unauthenticatedCart');

    foreach ($unauthenticatedCart as $cartItem) {
        $existingCartItem = $user->cart()->where('product_id', $cartItem['product_id'])->first();

        if ($existingCartItem) {
            // Update quantity if the product is already in the cart
            $existingCartItem->update(['quantity' => $existingCartItem->quantity + $cartItem['quantity']]);
        } else {
            // Otherwise, create a new cart item
            $user->cart()->create([
                'product_id' => $cartItem['product_id'],
                'quantity' => $cartItem['quantity'],
            ]);
        }
    }

    // Return the updated cart along with a success message
    $mergedCart = $user->cart()->get();

    return response()->json(['message' => 'Carts merged successfully', 'cart' => $mergedCart]);
}
   




}

