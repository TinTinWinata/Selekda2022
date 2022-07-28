<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Board>
 */
class BoardFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'score' => $this->faker->numberBetween(0, 1000),
            'userId' => $this->faker->numerify(3),
            'lifetime' => $this->faker->numberBetween(0, 30),
        ];
    }
}
