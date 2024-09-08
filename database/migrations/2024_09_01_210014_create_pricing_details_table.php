<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        if (!Schema::hasTable('pricing_details')) {
            Schema::create('pricing_details', function (Blueprint $table) {
                $table->id();
                $table->integer('pricing_id');
                $table->integer('user_id');
                $table->decimal('total_ingredients_cost', 10, 2);
                $table->decimal('additional_costs', 10, 2);
                $table->decimal('profit_and_labor_cost', 10, 2);
                $table->integer('units_yield');
                $table->decimal('price_per_unit', 10, 2);
                $table->decimal('packaging_cost', 10, 2);
                $table->decimal('final_price_per_unit', 10, 2);
                $table->timestamps();
            });
        }
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pricing_details');
    }
};
