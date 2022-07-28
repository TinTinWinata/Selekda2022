<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'username' => fake()->name(),
            'email' => fake()->safeEmail(),
            'name' => fake()->name(),
            'dob' => $this->faker->dateTimeBetween('1990-01-01', '2012-12-31'),
            'phone' => $this->faker->numerify('############'),
            'email_verified_at' => now(),
            'password' => bcrypt('asd'),
            'remember_token' => Str::random(10),
            'role' => "member",
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     *
     * @return static
     */
    public function unverified()
    {
        return $this->state(function (array $attributes) {
            return [
                'email_verified_at' => null,
            ];
        });
    }
}
