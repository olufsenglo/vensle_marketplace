<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Category;
use App\Models\Specification;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
	$categoryElectronics = Category::where('name', 'Electronics')->first();
	$categoryHome = Category::where('name', 'Home & Appliances')->first();
	$specificationTouchscreen = Specification::where('name', 'Touchscreen')->first();
	$specificationWireless = Specification::where('name', 'Wireless')->first();

        Product::create([
            'name' => 'Sample Laptop',
            'condition' => 'New',
            'price' => 999.99,
            'address' => '123 Main St',
            'phone_number' => '+1234567890',
            'description' => 'A high-end laptop with amazing features.',
            'type' => 'Laptop',
            'status' => 'Active',
        ])->categories()->attach($categoryElectronics->id);

        Product::create([
            'name' => 'Sample Smart Fridge',
            'condition' => 'New',
            'price' => 1499.99,
            'address' => '456 Oak St',
            'phone_number' => '+9876543210',
            'description' => 'A smart fridge that makes your life easier.',
            'type' => 'Appliance',
            'status' => 'Active',
        ])->categories()->attach($categoryHome->id);

        //Attach specifications to products
        Product::find(1)->specifications()->attach($specificationTouchscreen->id);
        Product::find(2)->specifications()->attach($specificationWireless->id);
    }
}
