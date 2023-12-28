<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Exception;

class FacebookController extends Controller
{
	public function facebookpage()
	{
		return Socialite::driver('facebook')->stateless()->redirect();
	}
	public function facebookredirect()
	{
		try {
			$user = Socialite::driver('facebook')->stateless()->user();

			$finduser = User::where('provider_id', $user->id)->first();

			if($finduser) {
                    		$token = $finduser->createToken('API Auth Token')->accessToken;
                    		return response()->json(['user' => $finduser, 'token' => $token], 200);
			}else {
				$newUser = User::updateOrCreate(['email' => $user->email], [
					'name' => $user->name,
					'provider_id' => $user->id,
					'profile_picture' => $user->avatar,
					'password' => encrypt('123456dummy')
				]);
                    		$token = $newUser->createToken('API Auth Token')->accessToken;

                    		return response()->json(['user' => $newUser, 'token' => $token], 200);
		        }
		} catch (Exception $e) {
		    return response()->json(['error' => $e->getMessage()], 500);
		}
	}
}
