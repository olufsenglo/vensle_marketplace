<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;
    protected $fillable = ['sender_id', 'receiver_id', 'product_id', 'content'];

    public function replies()
    {
        return $this->hasMany(Reply::class);
    }    

	public function latestReply()
	{
	    return $this->hasOne(Reply::class)->latest();
	}    

    public function product()
    {
        return $this->belongsTo(Product::class);
    }    
}
