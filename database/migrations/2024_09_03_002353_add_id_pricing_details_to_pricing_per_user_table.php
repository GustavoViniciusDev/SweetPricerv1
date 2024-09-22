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
        Schema::table('pricing_per_user', function (Blueprint $table) {
            $table->unsignedBigInteger('id_pricing_details')->nullable()->after('user_id');

            $table->foreign('id_pricing_details')->references('id')->on('pricing_details')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::table('pricing_per_user', function (Blueprint $table) {
            $table->dropForeign(['id_pricing_details']);
            $table->dropColumn('id_pricing_details');
        });
    }
};
