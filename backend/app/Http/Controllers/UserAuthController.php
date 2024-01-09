<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\UserAlert;
//use App\Notifications\PasswordChanged;

class UserAuthController extends Controller
{
	/**
	* Register user
	*
	* @param  \Illuminate\Http\Request  $request
	* @return \Illuminate\Http\JsonResponse
	*/
	public function register(Request $request)
	{
		try {
		    $validated_data = $request->validate([
			'name' => 'required|max:255',
			'email' => 'required|email|unique:users',
			'password' => 'required|confirmed'
		    ]);

		    $validated_data['password'] = bcrypt($request->password);

		    $user = User::create($validated_data);

		    $token = $user->createToken('API Auth Token')->accessToken;

		    return response()->json(['user' => $user, 'token' => $token], 200);
		} catch (\Illuminate\Validation\ValidationException $e) {
		    return response()->json(['errors' => $e->errors()], 422);
		} catch (\Exception $e) {
		    return response()->json(['error' => $e->getMessage()], 500);
		}
	}

        /**
        * Login user
        *
        * @param  \Illuminate\Http\Request  $request
        * @return \Illuminate\Http\JsonResponse
        */
	public function login(Request $request)
	{
		try {
		    $validated_data = $request->validate([
			'email' => 'email|required',
			'password' => 'required'
		    ]);

		    if (!auth()->attempt($validated_data)) {
			return response()->json(['message' => 'Incorrect Details. Please try again'], 401);
		    }

		    $token = auth()->user()->createToken('API Auth Token')->accessToken;

		    return response()->json(['user' => auth()->user(), 'token' => $token], 200);
		} catch (\Illuminate\Validation\ValidationException $e) {
		    return response()->json(['errors' => $e->errors()], 422);
		} catch (\Exception $e) {
		    return response()->json(['error' => $e->getMessage()], 500);
		}
	}

	//TODO try catch
        /**
        * Update user details
        *
        * @param  \Illuminate\Http\Request  $request
        * @return \Illuminate\Http\JsonResponse
	*/

public function updateProfile(Request $request)
{
    $request->validate([
        'name' => 'sometimes|string',
        'email' => 'sometimes|email|unique:users,email,' . auth()->id(),
        'phone_number' => 'sometimes|string',
        'address' => 'sometimes|string',
        'profile_picture' => 'sometimes|image|mimes:jpeg,png,jpg,gif|max:2048',
    ]);

    $user = auth()->user();

    // Update user details
    $user->update($request->only(['name', 'email', 'phone_number', 'address']));

    // Handle profile picture update
    if ($request->hasFile('profile_picture')) {
        // Check if the user already has a profile picture
        if ($user->profile_picture) {
            // If a profile picture exists, delete the old image
            if (file_exists(public_path('uploads/' . $user->profile_picture))) {
                unlink(public_path('uploads/' . $user->profile_picture));
            }
        }

        // Handle file upload
        $extension = $request->file('profile_picture')->getClientOriginalExtension();
        $imageName = Str::random(32) . "." . $extension;
        $request->file('profile_picture')->move('uploads/', $imageName);

        // Update user's profile picture
        $user->update(['profile_picture' => $imageName]);
    }

    return response(['user' => $user, 'message' => 'Profile updated successfully'], 200);
}


	/*public function updateProfile(Request $request)
	{
		$request->validate([
		    'name' => 'sometimes|string',
		    'email' => 'sometimes|email|unique:users,email,' . auth()->id(),
		]);

		$user = auth()->user();

		$user->update($request->only(['name', 'email']));

		// Return a success response
		return response(['user' => $user, 'message' => 'Profile updated successfully'], 200);
	}*/


        //TODO try catch
        /**
        * Change reset password
        *
        * @param  \Illuminate\Http\Request  $request
        * @return \Illuminate\Http\JsonResponse
        */
	public function resetPassword(Request $request)
	{
		$request->validate([
		    'email' => 'required|email',
		    'new_password' => 'required',
		    'new_password_confirmation' => 'required|same:new_password',
		]);

		$user = auth()->user();

		//Check email
		/*if (!Hash::check($request->old_password, $user->password)) {
		    return response(['error' => 'Old password is incorrect'], 401);
		}*/

		$user->update(['password' => bcrypt($request->new_password)]);
		UserAlert::create([
		    'user_id' => $user->id,
		    'title' => 'Password Changed',
		    'message' => 'Your password was successfully changed.',
		]);	

		return response(['message' => 'Password reset successfully'], 200);
	}	


        //TODO try catch
        /**
        * Change user password
        *
        * @param  \Illuminate\Http\Request  $request
        * @return \Illuminate\Http\JsonResponse
        */
	public function updatePassword(Request $request)
	{
		$request->validate([
		    'old_password' => 'required',
		    'new_password' => 'required',
		    'new_password_confirmation' => 'required|same:new_password',
		]);

		$user = auth()->user();

		if (!Hash::check($request->old_password, $user->password)) {
		    return response(['error' => 'Old password is incorrect'], 401);
		}

		$user->update(['password' => bcrypt($request->new_password)]);
	/*
	 * TODO ?
       // Revoke the current user's access token
        $user->tokens()->where('id', $user->currentAccessToken()->id)->delete();

        // Create a new access token for the user
        $newToken = $user->createToken('token-name')->plainTextToken;
	*/
		
		// Send a notification about the password change
		//$user->notify(new PasswordChanged(), ['database']);

	        // Create a UserAlert for the password change
		UserAlert::create([
		    'user_id' => $user->id,
		    'title' => 'Password Changed',
		    'message' => 'Your password was successfully changed.',
		]);	

		return response(['message' => 'Password updated successfully'], 200);
	}	

        //TODO try catch
        /**
        * Change user password
        *
        * @param  \Illuminate\Http\Request  $request
        * @return \Illuminate\Http\JsonResponse
        */	
	public function updateProfilePicture(Request $request)
	{
	    $request->validate([
		'profile_picture' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
	    ]);

	    $user = auth()->user();

	    // Check if the user already has a profile picture
	    if ($user->profile_picture) {
		// If a profile picture exists, delete the old image
		if (file_exists(public_path('uploads/' . $user->profile_picture))) {
		    unlink(public_path('uploads/' . $user->profile_picture));
		}
	    }

	    // Handle file upload
	    $extension = $request->file('profile_picture')->getClientOriginalExtension();
	    $imageName = Str::random(32) . "." . $extension;
	    $request->file('profile_picture')->move('uploads/', $imageName);

	    // Update user's profile picture
	    $user->update(['profile_picture' => $imageName]);

	    return response(['user' => $user, 'message' => 'Profile picture updated successfully'], 200);
	}


	/**
	 * Get user by ID with business details
	 *
	 * @param  int  $userId
	 * @return JsonResponse
	 */
	public function getUserById($userId)
	{
	    try {
		$userWithBusinessDetails = User::with('businessDetails')->find($userId);

		if (!$userWithBusinessDetails) {
		    return response()->json(['message' => 'User not found'], 404);
		}

		return response()->json(['user' => $userWithBusinessDetails], 200);
	    } catch (\Exception $e) {
		return response()->json(['error' => $e->getMessage()], 500);
	    }
	}

	

}
