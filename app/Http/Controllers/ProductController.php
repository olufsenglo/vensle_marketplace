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
            //$products = Product::paginate(config('constants.PAGINATION_LIMIT'));
	    $products = Product::orderBy('created_at', 'desc')
		    ->paginate(config('constants.PAGINATION_LIMIT'));

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
		'ratings' => 'nullable|numeric|min:0|max:5',
                'quantity' => 'nullable|integer|min:0',
                'sold' => 'nullable|integer|min:0',
                'views' => 'nullable|integer|min:0',
                'category_id' => 'required|exists:categories,id',
		'specification_ids' => 'required|array',
	    ]);


	    $product = Product::create($validatedData);

/**	    
// Handle image uploads
foreach ($request->images as $imageFile) {
    $imageName = pathinfo($imageFile->getClientOriginalName(), PATHINFO_FILENAME);
    $extension = $imageFile->getClientOriginalExtension();
    
    $image = new Image([
	'name' => $imageName,
	'extension' => $extension,
    ]);

    // Upload the image to the "uploads" folder
    $imagePath = $imageFile->storeAs('uploads', $imageName . '.' . $extension, 'public');

    // Set the product_id for the image
    $image->product_id = $product->id;
    $image->path = $imagePath;

    $product->images()->save($image);

    // Check if this image is the designated display image
    if ($request->images[$key]['is_display_image']) {
	$product->update(['display_image_id' => $image->id]);
    }
}
*/
//TODO
//$product->category()->associate($request->category_id)->save();

	    //Attach specifications: adds new entries to the pivot table
            if (isset($validatedData['specifications'])) {
            	//$product->specifications()->attach($request->specification_ids);
                $product->specifications()->attach($validatedData['specifications']);
            }	    

	    return response()->json($product, 201);
	} catch (ValidationException $e) {
		return response()->json(['errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            Log::error('Error storing product: ' . $e->getMessage());
	    
	    /**
	     * return response()->json(['error' => 'Internal Server Error'], 500);
	     * TODO: create error handling middleware
	     * ($e instanceof \Illuminate\Database\QueryException) {
	     * return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
	     * }
	     */

	    return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Product $product)
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
    public function update(Request $request, Product $product)
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
		'ratings' => 'nullable|numeric|min:0|max:5',
                'quantity' => 'nullable|integer|min:0',
                'sold' => 'nullable|integer|min:0',
                'views' => 'nullable|integer|min:0',
                'category_id' => 'required|exists:categories,id',
                'specification_ids' => 'required|array',
	    ]);

            $product->update($validatedData);
	    
	    // Update category for product
            $product->category()->associate($request->category_id)->save();

    	    //Sync specifications: update the pivot table for specifications
            $product->specifications()->sync($request->specification_ids);

            return response()->json($product);
        } catch (\Exception $e) {
            Log::error('Error updating product: ' . $e->getMessage());

	    return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Get the top products based on a specific column.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $column
     * @return \Illuminate\Http\JsonResponse
     */
    private function getTopProducts(Request $request, $column)
    {
        try {
            $request->validate([
                'per_page' => 'required|integer',
            ]);

            $perPage = $request->input('per_page');

            $products = Product::orderByDesc($column)->paginate($perPage);

            return response()->json($products);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            // Log the exception and return an error response
            Log::error("Error fetching top products by $column: " . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }

    /**
     * Get the top products sorted by quantity.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getTopProductsByQuantity(Request $request)
    {
        return $this->getTopProducts($request, 'quantity');
    }

    /**
     * Get the top products sorted by sold quantity.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getTopProductsBySold(Request $request)
    {
        return $this->getTopProducts($request, 'sold');
    }

    /**
     * Get the top products sorted by ratings.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getTopProductsByRatings(Request $request)
    {
        return $this->getTopProducts($request, 'ratings');
    }

    /**
     * Get the top products sorted by views.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getTopProductsByViews(Request $request)
    {
        return $this->getTopProducts($request, 'views');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Product $product)
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
