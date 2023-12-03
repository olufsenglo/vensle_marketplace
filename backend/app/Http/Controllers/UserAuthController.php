<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;

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
		//TODO: try catch
		$validated_data = $request->validate([
		    'name' => 'required|max:255',
		    'email' => 'required|email|unique:users',
		    'password' => 'required|confirmed'
		]);

		$validated_data['password'] = bcrypt($request->password);

		$user = User::create($validated_data);

		$token = $user->createToken('API Auth Token')->accessToken;

		return response()->json(['user' => $user, 'token' => $token], 200);
		//return response([ 'user' => $user, 'token' => $token]);
	}

        /**
        * Login user
        *
        * @param  \Illuminate\Http\Request  $request
        * @return \Illuminate\Http\JsonResponse
        */
	public function login(Request $request)
	{
		//TODO: try catch
		$validated_data = $request->validate([
		    'email' => 'email|required',
		    'password' => 'required'
		]);

		if (!auth()->attempt($validated_data)) {
		    return response()->json(['error_message' => 'Incorrect Details. 
		    Please try again'], 401);
		}

		$token = auth()->user()->createToken('API Auth Token')->accessToken;

		return response()->json(['user' => auth()->user(), 'token' => $token], 200);

	}
}
