<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create(
            'messages', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('sender_id');
                $table->unsignedBigInteger('receiver_id');
                $table->unsignedBigInteger('product_id')->nullable();
                $table->text('content');
                $table->timestamps();

                $table->foreign('sender_id')->references('id')->on('users');
                $table->foreign('receiver_id')->references('id')->on('users');
                $table->foreign('product_id')->references('id')->on('products')->nullable();
            }
        );
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};
