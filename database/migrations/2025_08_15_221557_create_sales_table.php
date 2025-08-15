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
        Schema::create('sales', function (Blueprint $table) {
            $table->id();
            $table->string('invoice_number')->unique();
            $table->foreignId('representative_id')->constrained()->onDelete('cascade');
            $table->foreignId('product_id')->constrained()->onDelete('cascade');
            $table->foreignId('supplier_id')->constrained()->onDelete('cascade');
            $table->integer('quantity'); // الكمية المباعة
            $table->integer('cartons_sold'); // عدد الكراتين
            $table->decimal('unit_price', 10, 2); // سعر الوحدة
            $table->decimal('total_amount', 12, 2); // إجمالي المبلغ
            $table->decimal('profit_amount', 10, 2); // مبلغ الربح
            $table->decimal('commission_earned', 10, 2)->default(0); // العمولة المكتسبة
            $table->string('customer_name');
            $table->text('customer_address')->nullable();
            $table->string('customer_phone')->nullable();
            $table->decimal('amount_received', 12, 2)->default(0); // المبلغ المحصل
            $table->decimal('debt_amount', 12, 2)->default(0); // المبلغ المتبقي (دين)
            $table->enum('payment_status', ['paid', 'partial', 'unpaid'])->default('unpaid');
            $table->date('sale_date');
            $table->boolean('is_returned')->default(false); // مرجع أم لا
            $table->decimal('returned_amount', 10, 2)->default(0); // قيمة المرجعات
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sales');
    }
};
