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
        Schema::create('suppliers', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // اسم المورد
            $table->text('description')->nullable(); // وصف المورد
            $table->json('product_categories'); // فئات المنتجات التي يوفرها
            $table->string('contact_person')->nullable(); // الشخص المسؤول للتواصل
            $table->string('phone')->nullable(); // رقم الهاتف
            $table->string('email')->nullable(); // البريد الإلكتروني
            $table->text('address')->nullable(); // عنوان المورد/مقر الشركة
            $table->string('city')->nullable(); // المدينة
            $table->string('status')->default('active'); // الحالة: active, inactive
            $table->decimal('credit_limit', 15, 2)->default(0); // حد الائتمان
            $table->decimal('current_balance', 15, 2)->default(0); // الرصيد الحالي
            $table->text('notes')->nullable(); // ملاحظات
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('suppliers');
    }
};
