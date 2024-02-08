<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Message;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class MessageController extends Controller
{
    //TODO: Authorization, only admin can retrieve all messages
    public function index()
    {
	    // Retrieve all messages for the authenticated user
	    // $user = Auth::user();
	    //$messages = Message::where('sender_id', $user->id)
		    //->orWhere('receiver_id', $user->id)->get();

        $messages = Message::all();
        return response()->json($messages);
    }


    public function getInboxMessages()
    {
        $user = Auth::user();

        $inboxMessages = Message::with(['latestReply'])
            ->where('receiver_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->get();	

        return response()->json($inboxMessages);
    }    

    public function getSentMessages()
    {
        $user = Auth::user();

        $sentMessages = Message::with(['latestReply'])
            ->where('sender_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($sentMessages);
    }    

    public function show($id)
    {
	$user = Auth::user();

        $message = Message::with(['replies' => function ($query) {
            $query->orderBy('created_at', 'desc');
        }])
        ->find($id);	
        /**$message = Message::with('replies')
            ->where(function ($query) use ($user) {
                $query->where('sender_id', $user->id)
                    ->orWhere('receiver_id', $user->id);
            })
	    ->find($id);
	if (!$message) {
            return response()->json(['error' => 'Message not found'], 404);
        }
	*/
	
	// Check if the message belongs to the user
        if (!$message || ($message->sender_id !== $user->id && $message->receiver_id !== $user->id)) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }


        return response()->json($message);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'receiver_id' => 'required|exists:users,id',
            'content' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $user = Auth::user();
        $message = Message::create([
            'sender_id' => $user->id,
            'receiver_id' => $request->input('receiver_id'),
            'content' => $request->input('content'),
        ]);

        return response()->json($message, 201);	    
    }
    
    public function destroy($id)
    {
        $message = Message::find($id);

        if (!$message) {
            return response()->json(['error' => 'Message not found'], 404);
        }

        // Check if the authenticated user is the sender of the message
        $user = Auth::user();
        if ($user->id !== $message->sender_id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $message->delete();
        return response()->json(['message' => 'Message deleted successfully']);
    }    
}
