<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Passport\HasApiTokens;

class Achievement extends Model
{
    use HasApiTokens, HasFactory;

    public function squad()
    {
        return $this->belongsTo(Squad::class);
    }


    protected $fillable = [
        'name',
        'squadId'
    ];
}
