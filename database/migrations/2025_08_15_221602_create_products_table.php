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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('code')->unique();
            $table->foreignId('supplier_id')->constrained()->onDelete('cascade');
            $table->enum('category', ['مواد غذائية', 'منظفات']);
            $table->decimal('purchase_price', 10, 2); // سعر الشراء
            $table->decimal('selling_price', 10, 2); // سعر البيع
            $table->decimal('profit_margin', 10, 2)->virtualAs('selling_price - purchase_price'); // هامش الربح
            $table->integer('stock_quantity')->default(0); // الكمية المتوفرة
            $table->integer('boxes_per_carton')->default(1); // عدد القطع في الكرتون
            $table->date('expiry_date')->nullable();
            $table->text('description')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
