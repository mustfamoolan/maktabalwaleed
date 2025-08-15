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
        Schema::create('representative_commission_plans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('representative_id')->constrained()->onDelete('cascade');
            $table->enum('plan_type', ['target_based', 'box_based', 'profit_based']); // الخطط الثلاث
            $table->decimal('fixed_salary', 10, 2)->default(1000000); // الراتب الثابت
            $table->boolean('is_active')->default(true);

            // للخطة الأولى: أهداف محددة حسب نوع المنتج والشركة
            $table->json('target_settings')->nullable(); // {supplier_id: target_amount}

            // للخطة الثانية: هدف كلي للكراتين
            $table->integer('box_target')->nullable(); // عدد الكراتين المستهدف
            $table->decimal('box_commission', 8, 2)->nullable(); // عمولة كل كرتون

            // للخطة الثالثة: نظام العمولة على الربح
            $table->decimal('profit_percentage', 5, 2)->nullable(); // نسبة من الربح

            // إعدادات عامة
            $table->decimal('minimum_performance_rate', 5, 2)->default(80); // النسبة المطلوبة للراتب كاملاً
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('representative_commission_plans');
    }
};
