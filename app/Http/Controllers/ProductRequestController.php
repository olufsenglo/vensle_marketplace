<?php

namespace App\Http\Controllers;

use App\Models\ProductRequest;
use Illuminate\Http\Request;

class ProductRequestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $product_requests = ProductRequest::orderBy('created_at', 'desc')
                    ->paginate(10);

            return response()->json($product_requests);
        } catch (\Exception $e) {
            Log::error('Error fetching product requests: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
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
                'category_id' => 'required|exists:categories,id',
                'price' => 'required|numeric',
                'address' => 'required|string',
                'phone_number' => 'required|string',
                'description' => 'required|string',
                'type' => 'required|string',
                'ratings' => 'nullable|numeric|min:0|max:5',
                'sold' => 'nullable|integer|min:0',
                'views' => 'nullable|integer|min:0',
                'specification_ids' => 'required|array',
            ]);

            $product_request = ProductRequest::create($validatedData);
            $product_request->category()->associate($request->category_id)->save();

            //Attach specifications: adds new entries to the pivot table
            $product_request->specifications()->attach($request->specification_ids);

            return response()->json($product, 201);
        } catch (ValidationException $e) {
                return response()->json(['errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            Log::error('Error storing product request: ' . $e->getMessage());

	    return response()->json(['error' => $e->getMessage()], 500);
        }

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\int  $id
     * @return \Illuminate\Http\JsonResponse
     */

    public function show(string $id)
    {
        try {
            $product_request = ProductRequest::findOrFail($id);
            return response()->json($product_request);
        } catch (\Exception $e) {
            Log::error('Error fetching product request: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, string $id)
    {
        try {
            $validatedData = $request->validate([
                'name' => 'required|string',
                'category_id' => 'required|exists:categories,id',
                'price' => 'required|numeric',
                'address' => 'required|string',
                'phone_number' => 'required|string',
                'description' => 'required|string',
                'type' => 'required|string',
                'ratings' => 'nullable|numeric|min:0|max:5',
                'sold' => 'nullable|integer|min:0',
                'views' => 'nullable|integer|min:0',
                'specification_ids' => 'required|array',
            ]);

            $product_request->update($validatedData);

            // Update category for product
            $product_request->category()->associate($request->category_id)->save();

            //Sync specifications: update the pivot table for specifications
            $product_request->specifications()->sync($request->specification_ids);

            return response()->json($product);
        } catch (\Exception $e) {
            Log::error('Error updating product request: ' . $e->getMessage());

            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(string $id)
    {
        try {
	    $product_request = ProductRequest::findOrFail($id);
	    $product_request->delete();

            return response()->json(null, 204);
        } catch (\Exception $e) {
            Log::error('Error deleting product request: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }
}
