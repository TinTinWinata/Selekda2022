<?php

namespace Database\Seeders;

use App\Models\Banner;
use App\Models\Board;
use App\Models\Captcha;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */

    public function run()
    {
        \App\Models\User::factory(10)->create();

        \App\Models\User::factory()->create([
            'username' => 'member',
            'email' => 'member@gmail.com',
            'password' => bcrypt('member'),
            'role' => 'member',
        ]);

        \App\Models\User::factory()->create([
            'name' => 'admin',
            'username' => 'admin',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('admin'),
            'role' => 'admin',
        ]);

        // Board::factory(10)->create();

        Banner::factory()->create([
            'imageUrl' => '/assets/landing/bg.png',
            'status' => 'active',
            'title' => 'I'
        ]);

        Banner::factory()->create([
            'imageUrl' => '/assets/landing/bg_2.jpg',
            'status' => 'active',
            'title' => 'Love'
        ]);
        Banner::factory()->create([
            'imageUrl' => '/assets/landing/bg_3.jpg',
            'status' => 'active',
            'title' => 'You'
        ]);
        Banner::factory()->create([
            'imageUrl' => '/assets/landing/bg_4.jpg',
            'status' => 'active',
            'title' => '<3'
        ]);


        Captcha::factory()->create([
            'imageUrl' => '/captcha/captcha_1.png',
            'value' => '263S2V',
        ]);
        Captcha::factory()->create([
            'imageUrl' => '/captcha/captcha_2.png',
            'value' => 'RUNAJ1X',
        ]);
        Captcha::factory()->create([
            'imageUrl' => '/captcha/captcha_3.png',
            'value' => 'mwxe2',
        ]);
        Captcha::factory()->create([
            'imageUrl' => '/captcha/captcha_4.png',
            'value' => 'AAXUE',
        ]);
    }
}
