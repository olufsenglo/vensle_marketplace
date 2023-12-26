<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BusinessDetailsController extends Controller
{
    
    public function store(Request $request)
    {
        try {
            $request->validate([
                'user_id' => 'required|exists:users,id',
                'email' => 'unique:business_details,email|nullable|email',
                'business_name' => 'required|string',
                'address' => 'required|string',
                'phone_number' => 'required|string',
                'bank_name' => 'required|string',
                'account_number' => 'required|string',
                'documentation' => 'nullable|string',
                'profile_picture' => 'nullable|string',
            ]);

            $businessDetails = BusinessDetails::create($request->all());

            return response()->json(['message' => 'Business details created successfully', 'data' => $businessDetails]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function show($id)
    {
        try {
            $businessDetails = BusinessDetails::where('user_id', $id)->first();

            if (!$businessDetails) {
                return response()->json(['message' => 'Business details not found'], 404);
            }

            return response()->json(['data' => $businessDetails]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    public function update(Request $request, $id)
    {
        try {
            $businessDetails = BusinessDetails::findOrFail($id);

            $request->validate([
                'email' => 'unique:business_details,email,' . $businessDetails->id . '|nullable|email',
                'business_name' => 'required|string',
                'address' => 'required|string',
                'phone_number' => 'required|string',
                'bank_name' => 'required|string',
                'account_number' => 'required|string',
                'documentation' => 'nullable|string',
                'profile_picture' => 'nullable|string',
            ]);

            $businessDetails->update($request->all());

            return response()->json(['message' => 'Business details updated successfully', 'data' => $businessDetails]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $businessDetails = BusinessDetails::findOrFail($id);

            $businessDetails->delete();

            return response()->json(['message' => 'Business details deleted successfully']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

}
