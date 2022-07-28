<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('squad_members', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('squadId');
            $table->foreign('squadId')->references('id')->on('squads')->onUpdate('cascade')->onDelete('cascade');

            $table->string('name');
            $table->string('role');
            $table->string('email');
            $table->date('dob');
            $table->string('phone');
            $table->string('photoProfileUrl');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('squad_members');
    }
};
