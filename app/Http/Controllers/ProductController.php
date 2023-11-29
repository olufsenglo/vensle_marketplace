<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

/**
 * Class ProductController
 * @package App\Http\Controllers
 */
class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        try {
            $products = Product::paginate(10); // Adjust the number based on your needs
            return response()->json($products);
        } catch (\Exception $e) {
            Log::error('Error fetching products: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }


    public function create()
    {
        // Not needed for API
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'name' => 'required|string',
                'condition' => 'required|in:New,Fairly Used,N/A',
                'price' => 'required|numeric',
                'address' => 'required|string',
                'phone_number' => 'required|string',
                'description' => 'required|string',
                'type' => 'required|string',
                'status' => 'required|in:Active,Inactive',
                'category_ids' => 'required|array',
                'specification_ids' => 'required|array',
            ]);

            $product = Product::create($validatedData);
	    $product->categories()->attach($request->category_ids);

	    //Attach specifications: adds new entries to the pivot table
            $product->specifications()->attach($request->specification_ids);

            return response()->json($product, 201);
        } catch (\Exception $e) {
            Log::error('Error storing product: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(string $id)
    {
        try {
            return response()->json($product);
        } catch (\Exception $e) {
            Log::error('Error fetching product: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        // Not needed for API
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, string $id)
    {
        try {
            $validatedData = $request->validate([
                'name' => 'required|string',
                'condition' => 'required|in:New,Fairly Used,N/A',
                'price' => 'required|numeric',
                'address' => 'required|string',
                'phone_number' => 'required|string',
                'description' => 'required|string',
                'type' => 'required|string',
                'status' => 'required|in:Active,Inactive',
                'category_ids' => 'required|array',
                'specification_ids' => 'required|array',
            ]);

            $product->update($validatedData);
            $product->categories()->sync($request->category_ids);

    	    // Sync specifications: update the pivot table for specifications
            $product->specifications()->sync($request->specification_ids);

            return response()->json($product);
        } catch (\Exception $e) {
            Log::error('Error updating product: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(string $id)
    {
        try {
            $product->delete();
            return response()->json(null, 204);
        } catch (\Exception $e) {
            Log::error('Error deleting product: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }
}
