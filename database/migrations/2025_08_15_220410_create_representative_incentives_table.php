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
        Schema::create('representative_incentives', function (Blueprint $table) {
            $table->id();
            $table->foreignId('representative_id')->constrained()->onDelete('cascade');
            $table->enum('type', ['bonus', 'penalty', 'commission', 'achievement_bonus']);
            $table->decimal('amount', 10, 2);
            $table->text('reason');
            $table->date('effective_date');
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('representative_incentives');
    }
};
