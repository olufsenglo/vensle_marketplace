<?php

namespace Tests\Feature;

use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Artisan;
use Tests\TestCase;

class ProductControllerTest extends TestCase
{
    use RefreshDatabase;
    use WithFaker;

    public function setUp(): void
    {
        parent::setUp();

        // Migrate the database
        Artisan::call('migrate');
    }

    /** @test */
    public function it_can_create_a_product()
    {
        $response = $this->json('POST', '/api/products', $this->productData());
dump($response->getContent());
        $response->assertStatus(201)
            ->assertJsonStructure([
                'id',
                'name',
                'condition',
                'price',
                'address',
                'phone_number',
                'description',
                'type',
                'status',
                'created_at',
                'updated_at',
            ]);
    }

    /** @test */
    public function it_can_update_a_product()
    {
        $product = Product::factory()->create();
        $response = $this->json('PUT', "/api/products/{$product->id}", $this->productData());

        $response->assertStatus(200)
            ->assertJsonStructure([
                'id',
                'name',
                'condition',
                'price',
                'address',
                'phone_number',
                'description',
                'type',
                'status',
                'created_at',
                'updated_at',
            ]);
    }

    /** @test */
    public function it_can_show_a_product()
    {
        $product = Product::factory()->create();

        $response = $this->json('GET', "/api/products/{$product->id}");

        $response->assertStatus(200)
            ->assertJson([
                'id' => $product->id,
                'name' => $product->name,
                // TODO: add more fields
            ]);
    }

    /** @test */
    public function it_can_delete_a_product()
    {
        $product = Product::factory()->create();

        $response = $this->json('DELETE', "/api/products/{$product->id}");

        $response->assertStatus(204);

        $this->assertDatabaseMissing('products', ['id' => $product->id]);
    }

    // Add more test methods as needed

    /**
     * Generate fake product data for testing.
     *
     * @return array
     */
    private function productData()
    {
        return [
            'name' => $this->faker->word,
            'condition' => 'New',
            'price' => $this->faker->randomFloat(2, 10, 100),
            'address' => $this->faker->address,
            'phone_number' => $this->faker->phoneNumber,
            'description' => $this->faker->paragraph,
            'type' => 'Some Type',
            'status' => 'Active',
            'category_ids' => [1, 2],
            'specification_ids' => [2, 3],
        ];
    }
}

