<template>
  <section class="flex items-center justify-between px-20 py-20">
    <div class="max-w-lg">
      <h1 class="text-5xl font-extrabold text-gray-600 leading-tight">
        All the Pokémon data you'll ever need in one place!
      </h1>
      <p class="mt-4 text-gray-500">
        Thousands of data compiled into one place
      </p>
      <el-button type="warning" class="mt-8 font-bold px-6 py-3 rounded-lg" @click="scrollToPokedex">
        Check PokèDex
      </el-button>
    </div>
    <div>
      <img src="/pokmon.png" alt="Pokémon Starters" class="w-[450px]"/>
    </div>
  </section>
  <PokeDex />
</template>

<script setup lang="ts">
  const scrollToPokedex = () => {
    const pokedex = document.getElementById("pokedex")
    if (pokedex) {
      pokedex.scrollIntoView({ behavior: "smooth"})
    }
  }
</script>