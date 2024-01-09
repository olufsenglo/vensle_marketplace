<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BusinessDetails extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'email',
        'business_name',
        'address',
        'phone_number',
	'bank_name',
	'account_number',
	'documentation',
	'profile_picture',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }    
}
