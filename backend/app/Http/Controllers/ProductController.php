<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\Product;
use App\Models\User;
use App\Models\Category;
use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Pagination\LengthAwarePaginator;


/**
 * Class ProductController
 * @package App\Http\Controllers
 */
class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function index(Request $request)
    {
        try {
            $userLat = $request->input('lat');
            $userLng = $request->input('lng');
            $distance = $request->input('distance');
            $userCountry = $request->input('country');

            $query = Product::with(['images', 'displayImage', 'category'])
                ->orderBy('created_at', 'desc');

            if ($userCountry) {
                $query->where('country', $userCountry);
            }

            $products = $query->paginate(config('constants.PAGINATION_LIMIT'));

        if ($userLat && $userLng && $distance) {
            $filteredProducts = $products->filter(function ($product) use ($userLat, $userLng, $distance, $userCountry) {
                return $product->country === $userCountry &&
                    $this->calculateDistance($userLat, $userLng, $product->latitude, $product->longitude) <= $distance;
            });

            $filteredProducts = $filteredProducts->values(); // Reindex the array after filtering

            // Create a new Paginator instance with the filtered products
            $products = new LengthAwarePaginator(
                $filteredProducts,
                $products->total(),
                $products->perPage(),
                $products->currentPage(),
                ['path' => $request->url(), 'query' => $request->query()]
            );
        }


            return response()->json($products);
        } catch (\Exception $e) {
            Log::error('Error fetching products: ' . $e->getMessage());
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    // Helper function to calculate distance using Haversine formula
    private function calculateDistance($lat1, $lng1, $lat2, $lng2)
    {
        $earthRadius = 6371; // in kilometers

        $dLat = deg2rad($lat2 - $lat1);
        $dLng = deg2rad($lng2 - $lng1);

        $a = sin($dLat / 2) * sin($dLat / 2) + cos(deg2rad($lat1)) * cos(deg2rad($lat2)) * sin($dLng / 2) * sin($dLng / 2);
        $c = 2 * atan2(sqrt($a), sqrt(1 - $a));

        $distance = $earthRadius * $c;

        return $distance;
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
	$response = [];

	//TODO change condition in seeder
        try {
            $validatedData = $request->validate([
                'name' => 'required|string',
                'condition' => 'required|in:new,used,na',
                'price' => 'required|numeric',
                'address' => 'required|string',
                'phone_number' => 'required|string',
                'description' => 'required|string',
                'type' => 'required|string',
		'key_specifications' => 'nullable|string',
                'status' => 'required|in:Active,Inactive',
		'ratings' => 'nullable|numeric|min:0|max:5',
                'quantity' => 'nullable|integer|min:0',
                'sold' => 'nullable|integer|min:0',
                'views' => 'nullable|integer|min:0',
                'category_id' => 'required|exists:categories,id',
		'latitude' => 'required|numeric',
		'longitude' => 'required|numeric',
                'currency' => 'required|string',
                'city' => 'required|string',
                'country' => 'required|string',
		//'specification_ids' => 'required|array',
		'images' => 'required',
		'images.*' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
	    ]);


	$user = Auth::user();
        if (!$user) {
            return response()->json(['error' => 'User not authenticated'], 401);
        }	 
//dd($user);
        $product = $user->products()->create($validatedData);

$foundProfileImage = false;
foreach ($request->images as $imageFile) {
	$extension = $imageFile->getClientOriginalExtension();
	$imageName =  Str::random(32).".".$extension;

	$image = new Image([
	    'name' => $imageName,
	    'extension' => $extension,
	]);

	// Upload the image to the "uploads" folder
	$imageFile->move('uploads/', $imageName);

	// Set the product_id for the image
	$image->product_id = $product->id;

	$product->images()->save($image);

	if (!$foundProfileImage)
	{
	    $product->update(['display_image_id' => $image->id]);
	    $foundProfileImage = true;
	}
}


return response()->json($product, 201);

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

    public function upload(Request $request)
    {

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
	    $product = Product::with(['images', 'displayImage', 'category'])->findOrFail($id);
        } catch (\Exception $e) {
            Log::error('Error fetching product: ' . $e->getMessage());
            return response()->json(['error' => $e->getMessage()], 500);
	}
        //} catch (ModelNotFoundException $e) {
            //return response()->json(['error' => 'Product not found.'], 404);
	//}
	
	$similarProducts = $this->getSimilarProducts($product);	
	return response()->json([
		'product' => $product,
		'similarProducts' => $similarProducts
	]);
    }

    private function getSimilarProducts($product)
    {
	    //$products = Product::with(['images', 'displayImage', 'category'])


        $similarProducts = Product::where('category_id', $product->category_id)
         //   ->where('name', 'like', '%' . $product->name . '%')
	    ->where('id', '<>', $product->id)
    	    ->with(['images', 'displayImage', 'category'])
            ->take(4)
            ->get();

        return $similarProducts;
    }

public function getUserProducts($userId)
{
    try {
        $user = User::findOrFail($userId);
        
        $products = Product::where('user_id', $user->id)
            ->with(['images', 'category', 'displayImage'])
            ->paginate(10);

        return response()->json(['user' => $user, 'products' => $products]);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
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
     * @param  int  $productId
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, int $productId)
    {
	    try {
		$validatedData = $request->validate([
		    'name' => 'sometimes|required|string',
		    'condition' => 'sometimes|required|in:new,used,na',
		    'price' => 'sometimes|required|numeric',
		    'address' => 'sometimes|required|string',
		    'phone_number' => 'sometimes|required|string',
		    'description' => 'sometimes|required|string',
		    'type' => 'sometimes|required|string',
		    'key_specifications' => 'sometimes|required|string',
		    'status' => 'sometimes|required|in:Active,Inactive',
		    'ratings' => 'sometimes|nullable|numeric|min:0|max:5',
		    'quantity' => 'sometimes|nullable|integer|min:0',
		    'sold' => 'sometimes|nullable|integer|min:0',
		    'views' => 'sometimes|nullable|integer|min:0',
		    'category_id' => 'required|exists:categories,id',
		    'display_image_id' => 'sometimes',
		    'latitude' => 'sometimes|nullable',
		    'longitude' => 'sometimes|nullable',
		    'removedImages' => 'sometimes|array',
		    'mainImageIndex' => 'sometimes',
		'images' => 'sometimes',
		'images.*' => 'sometimes|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
		]);



		$product = Product::findOrFail($productId);



    // Check if removedImages is not empty
    if (!empty($validatedData['removedImages'])) {
        foreach ($validatedData['removedImages'] as $removedImage) {
            // Remove record from the images database
            $imageToDelete = Image::where('name', $removedImage)->first();

            if ($imageToDelete) {
                $imageToDelete->delete();
            }


            // Delete from disk
            $path = public_path('uploads/' . $removedImage);
            if (file_exists($path)) {
                unlink($path);
            }

        }
    }


    if ($request->hasFile('images')) {

	$index = 0;
	foreach ($request->images as $imageFile) {
		$extension = $imageFile->getClientOriginalExtension();
		$imageName =  Str::random(32).".".$extension;

		$image = new Image([
		    'name' => $imageName,
		    'extension' => $extension,
		]);

		$imageFile->move('uploads/', $imageName);

		// Set the product_id for the image
		$image->product_id = $product->id;

		$product->images()->save($image);

		if (!isset($validatedData['display_image_id']) && isset($validatedData['mainImageIndex']) && $index == ($validatedData['mainImageIndex'])) {
			$validatedData['display_image_id'] = $image->id;
		}
		$index++;

	}

     }


		// Update other product details
		$product->update($validatedData);

		// Update category for product
		$product->category()->associate($request->category_id)->save();

		return response()->json($product);
	    } catch (\Exception $e) {
		Log::error('Error updating product: ' . $e->getMessage());

		return response()->json(['error' => $e->getMessage()], 500);
	    }	    
    }

    /** TODO: move to its controller, try catch */

public function filter(Request $request)
{
    try {
        $userLat = $request->input('lat');
        $userLng = $request->input('lng');
        $distance = $request->input('distance');
        $userCountry = $request->input('country');
        $searchTerm = $request->input('searchTerm');
        $category_id = $request->input('category_id');
        $minPrice = $request->input('minPrice');
        $maxPrice = $request->input('maxPrice');
        $type = $request->input('type');
        $sortBy = $request->input('sortby', 'created_at');

        $query = Product::with(['images', 'displayImage', 'category']);

        if ($userCountry) {
            $query->where('country', $userCountry);
        }

        if ($searchTerm) {
            $query->where('name', 'like', '%' . $searchTerm . '%');
        }

        if ($category_id) {
            $query->where('category_id', $category_id);
        }

        if ($minPrice) {
            $query->where('price', '>=', $minPrice);
        }

        if ($maxPrice) {
            $query->where('price', '<=', $maxPrice);
        }

        if ($type) {
            $query->where('type', $type);
        }

        // Sorting logic
        if ($request->input('sort')) {
            $value = $request->input('sort');
            if ($value == 'price_lowest') {
                $query->orderBy('price', 'asc');
            } elseif ($value == 'price_highest') {
                $query->orderBy('price', 'desc');
            } elseif ($value == 'ratings' || $value == 'views' || $value == 'created_at') {
                $query->orderBy($value, 'desc');
            }
        } else {
            $query->orderBy($sortBy, 'desc'); // Default sorting if not provided in the request
        }

	$products = $query->paginate(config('constants.PAGINATION_LIMIT'));

        if ($userLat && $userLng && $distance) {
            $filteredProducts = $products->filter(function ($product) use ($userLat, $userLng, $distance, $userCountry) {
                return $product->country === $userCountry &&
                    $this->calculateDistance($userLat, $userLng, $product->latitude, $product->longitude) <= $distance;
            });

            $filteredProducts = $filteredProducts->values(); // Reindex the array after filtering

            // Create a new Paginator instance with the filtered products
            $products = new LengthAwarePaginator(
                $filteredProducts,
                $products->total(),
                $products->perPage(),
                $products->currentPage(),
                ['path' => $request->url(), 'query' => $request->query()]
            );
        }

/*
        if ($userLat && $userLng && $distance) {
            $filteredProducts = $products->filter(function ($product) use ($userLat, $userLng, $distance, $userCountry) {
                return $product->country === $userCountry &&
                    $this->calculateDistance($userLat, $userLng, $product->latitude, $product->longitude) <= $distance;
            });

            $products = $filteredProducts->values(); // Reindex the array after filtering
        }
 */

        return response()->json($products);
    } catch (\Exception $e) {
        Log::error('Error fetching products: ' . $e->getMessage());
        return response()->json(['error' => $e->getMessage()], 500);
    }
}



private function calculateHaversine($latColumn, $lngColumn, $userLat, $userLng)
{
    $earthRadius = 6371; // in kilometers

    $latDiff = deg2rad($latColumn - $userLat);
    $lngDiff = deg2rad($lngColumn - $userLng);

    $a = sin($latDiff / 2) * sin($latDiff / 2) +
         cos(deg2rad($userLat)) * cos(deg2rad($latColumn)) *
         sin($lngDiff / 2) * sin($lngDiff / 2);

    $c = 2 * atan2(sqrt($a), sqrt(1 - $a));

    $distance = $earthRadius * $c;

    return $distance;
}


public function getProductsByUser()
{
    try {
        $user = Auth::user();
        $products = $user->products()->get();

        return response()->json($products, 200);
    } catch (\Exception $e) {
        // Handle exceptions
        return response()->json(['error' => $e->getMessage()], 500);
    }
}    

    /**
     * Get the top products based on a specific type.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getTopProductsByType(Request $request)
    {
        try {
            $request->validate([
                'per_page' => 'sometimes|required|integer',
                'type' => 'sometimes|string|nullable',
                //'column' => 'sometimes|string|nullable',
            ]);

	    $perPage = $request->input('per_page');
            $type = $request->input('type');
            //$type = $request->input('column');

        $query = Product::query();

    if ($type !== null && $type !== '') {
        $query->where('type', $type);
    }
    //if ($column !== null && $column !== '') {
    //    $query->orderByDesc($column)
    //}
	    
	    $filteredProducts = $query
    	    	    ->with(['images', 'displayImage', 'category'])
		    ->orderByDesc('sold')
		    ->paginate($perPage);

            return response()->json($filteredProducts);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            // Log the exception and return an error response
            Log::error("Error fetching top products: " . $e->getMessage());
	    return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Get the top products based on a request type and column.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Illuminate\Http\Request  $column
     * @return \Illuminate\Http\JsonResponse
     */
    public function getTopProductsbyColumn(Request $request)
    {
        try {
            $request->validate([
                'per_page' => 'required|integer',
                'column' => 'sometimes|string|nullable',
            ]);

            $perPage = $request->input('per_page');
            $column = $request->input('column');

	    $products = Product::orderByDesc($column)
        	        ->with(['images', 'displayImage', 'category'])
		        ->paginate($perPage);

            return response()->json($products);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            // Log the exception and return an error response
            Log::error("Error fetching top products" . $e->getMessage());
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Get the top products based on a request per_page.
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

	    $products = Product::orderByDesc($column)
        	        ->with(['images', 'displayImage', 'category'])
		        ->paginate($perPage);

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
     * Get the top products sorted by date.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getTopProductsByDate(Request $request)
    {
        return $this->getTopProducts($request, 'created_at');
    }

    public function getAllCategories()
    {
        try {
            $categories = Category::all();

            return response()->json(['categories' => $categories], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error fetching categories'], 500);
        }    
    }

    public function getTotalUploadedProducts()
    {
        $user = Auth::user();
        $totalUploadedProducts = Product::where('user_id', $user->id)->count();
        return response()->json(['totalUploadedProducts' => $totalUploadedProducts]);
    }

    public function getTotalRequests()
    {
        $user = Auth::user();
        $totalRequests = Product::where('user_id', $user->id)->where('type', 'request')->count();
        return response()->json(['totalRequests' => $totalRequests]);
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
	    //TODO: Check owner
            $product->delete();
            return response()->json(null, 204);
        } catch (\Exception $e) {
            Log::error('Error deleting product: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }
}
