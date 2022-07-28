<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Passport\HasApiTokens;

class Board extends Model
{
    use HasApiTokens, HasFactory;

    public function user()
    {
        return $this->belongsTo(User::class, 'userId', 'id');
    }

    protected $fillable = [
        'score',
        'userId',
        'lifetime'
    ];
}
