<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;


/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    protected $model = Product::class;
    
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->word,
	    'category_id' => function () {
                return \App\Models\Category::factory()->create()->id;
            },
            'condition' => $this->faker->randomElement(['New', 'Fairly Used', 'N/A']),
            'price' => $this->faker->randomFloat(2, 10, 1000),
            'address' => $this->faker->address,
            'phone_number' => $this->faker->phoneNumber,
            'description' => $this->faker->sentence,
            'type' => $this->faker->word,
            'status' => $this->faker->randomElement(['Active', 'Inactive']),
            //'specifications' => function () {
            //    return \App\Models\Specification::factory()->create()->id;
            //},
	];
    }

    /**
     * Indicate that the product has specifications.
     *
     * @return ProductFactory
     */
    public function withSpecifications(): self
    {
        return $this->afterCreating(function (Product $product) {
            $product->specifications()->attach(
                \App\Models\Specification::factory()->create()->id
            );
        });
    }
}
