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
        Schema::create('representative_targets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('representative_id')->constrained()->onDelete('cascade');
            $table->string('period_type'); // monthly, quarterly, yearly
            $table->integer('period_year');
            $table->integer('period_month')->nullable();
            $table->integer('period_quarter')->nullable();
            $table->decimal('target_amount', 12, 2);
            $table->decimal('achieved_amount', 12, 2)->default(0);
            $table->decimal('achievement_percentage', 5, 2)->default(0);
            $table->text('description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('representative_targets');
    }
};
