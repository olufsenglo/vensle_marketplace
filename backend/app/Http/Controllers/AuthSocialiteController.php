<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Exception;

class AuthSocialiteController extends Controller
{
     /**
     * Redirect the user to the Google authentication page.
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function redirectToGoogle()
    {
        //return Socialite::driver('google')->redirect();
        return Socialite::driver('google')->stateless()->redirect();
    }   

    /**
     * Obtain the user information from Google.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function handleGoogleCallback()
    {
        try {
            $socialiteUser = Socialite::driver('google')->stateless()->user();
            //$socialiteUser = Socialite::driver('google')->user();
            // Check if the user already exists in your database
            $user = User::where('email', $socialiteUser->email)->first();
	    
	    //$user = User::where('email', $socialiteUser->getEmail())->first();
            //$user = User::where('provider_id', $socialiteUser->id))->first();

            if ($user) {
                $token = $user->createToken('API Auth Token')->accessToken;
            } else {
                // If the user doesn't exist, create a new user
                $newUser = new User();
                $newUser->name = $socialiteUser->name;
                $newUser->email = $socialiteUser->email;
                $newUser->provider_id = $socialiteUser->id;
                $newUser->profile_picture = $socialiteUser->avatar;
                $newUser->password = bcrypt(Str::random(123654));
                $newUser->save();

                // Create a token for the new user
                $token = $newUser->createToken('AppName')->accessToken;
            }

            return response()->json(['token' => $token]);
        } catch (\Exception $e) {
	    return response()->json(['error' => $e->getMessage()], 500);
            //return response()->json(['error' => 'Unable to login with Google. Please try again.'], 500);
        }
    }
}
