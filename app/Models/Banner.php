<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Passport\HasApiTokens;

class Banner extends Model
{
    use HasApiTokens, HasFactory;

    protected $fillable = [
        'title',
        'imageUrl',
        'status'
    ];
}
