<template>
  <el-card  class="max-w-lg rounded-2xl shadow-sm"
  :body-style="{ backgroundColor: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(7px)' }"
>
        <div
          v-for="pokemon in paginatedPokemons"
          :key="pokemon.id"
          class="flex items-center justify-between border-b last:border-0 py-4 px-5"
        >

          <div class="flex items-center gap-4">
            <img
              :src="pokemon.image"
              alt="sprite"
              class="w-12 h-12 object-contain"
            />
            <span class="font-semibold text-gray-700">#{{ pokemon.id }}</span>
            <span class="font-bold text-gray-800 capitalize">{{ pokemon.name }}</span>
          </div>

          <div class="flex gap-2">
            <span
              v-for="type in pokemon.types"
              :key="type"
              :style="{ backgroundColor: getTypeColor(type), color: '#fff' }"
              class="px-2 py-0.5 rounded-md capitalize text-sm font-semibold"
            >
              {{ type }}
            </span>
          </div>
        </div>
      </el-card>
</template>

<script setup lang="ts">
import type { Pokemon } from '~/types/pokemon';
import { getTypeColor } from '#imports';

defineProps<{
  paginatedPokemons: Pokemon[]
}>()
</script>

<style scoped>
  .el-card {
  margin: 0 auto;
}
</style>