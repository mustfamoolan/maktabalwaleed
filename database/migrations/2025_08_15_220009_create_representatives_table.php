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
        Schema::create('representatives', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('phone')->unique();
            $table->string('identity_number')->unique();
            $table->text('address');
            $table->decimal('commission_percentage', 5, 2)->default(0);
            $table->decimal('fixed_commission', 10, 2)->default(0);
            $table->enum('commission_type', ['percentage', 'fixed', 'hybrid']);
            $table->enum('status', ['active', 'inactive', 'suspended'])->default('active');
            $table->json('areas')->nullable(); // المناطق المسؤول عنها
            $table->json('product_categories')->nullable(); // أنواع المنتجات
            $table->decimal('monthly_target', 12, 2)->default(0);
            $table->decimal('current_sales', 12, 2)->default(0);
            $table->date('hire_date');
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('representatives');
    }
};
