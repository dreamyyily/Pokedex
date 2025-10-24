<template>
  <el-dialog
    :model-value="isOpen"
    @update:model-value="val => emit('update:isOpen', val)" 
    width="800px"
    center
    :show-close="true"
  >
  <div v-if="pokemon" class="flex flex-col md:flex-row gap-6 p-6">
    
    <div class="flex-1 flex justify-center items-center bg-gray-300 aspect-square">
      <img 
        v-if="pokemon.image" 
        :src="pokemon.image" 
        class="w-full max-w-[250px] object-contain"
        alt="Pokemon image"
      />
      <span v-else class="text-center text-gray-600">Pokemon Picture<br>Placeholder</span>
    </div>

    <div class="flex-1">
      <h2 class="text-2xl font-bold text-gray-800 mb-4 capitalize">
        {{ pokemon.name }}
      </h2>

      <div class="mb-3 flex gap-6">
        <p><strong>Weight:</strong><span class="ml-1">{{ pokemon.weight }}</span></p>
        <p><strong>Height:</strong><span class="ml-1">{{ pokemon.height }}</span></p>
      </div>

      <div class="mb-3">
        <p class="font-semibold">Abilities :</p>
        <ul class="list-disc list-inside text-gray-700">
          <li v-for="ability in pokemon.abilityObjects" :key="ability.name">
            {{ ability.name }} <span v-if="ability.is_hidden" class="text-sm text-gray-500">(hidden)</span>
          </li>
        </ul>
      </div>

      <div class="mb-4 flex items-center gap-2">
        <p class="font-semibold whitespace-nowrap">Type :</p>
        <div class="flex flex-wrap gap-2">
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

      <el-button type="warning" class="mt-4 font-bold text-white">More Detail</el-button>
      
    </div>
  </div>
</el-dialog>
</template>

<script setup lang="ts">
  import { getTypeColor } from '#imports';

  defineProps<{
    isOpen: boolean
    pokemon: any
  }>()

  const emit = defineEmits(["update:isOpen"])
</script>