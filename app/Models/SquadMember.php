<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Passport\HasApiTokens;

class SquadMember extends Model
{
    use HasApiTokens, HasFactory;

    public function squad()
    {
        return $this->belongsTo(Squad::class);
    }


    protected $fillable = [
        'squadId',
        'photoProfileUrl',
        'name',
        'email',
        'role',
        'phone',
        'dob'
    ];
}
