<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Passport\HasApiTokens;

class Squad extends Model
{
    use HasApiTokens,  HasFactory;

    public function achievements()
    {
        return $this->hasMany(Achievement::class, 'squadId', 'id');
    }

    public function squadMembers()
    {
        return $this->hasMany(SquadMember::class, 'squadId', 'id');
    }



    protected $fillable = [
        'name',
        'description'
    ];
}
