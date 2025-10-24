<template>
  <section id="pokedex" class="bg-yellow-400 px-10 py-16">
    <div class="text-center mb-10">
      <h2 class="text-3xl font-bold text-gray-500">PokèDex</h2>
      <p class="text-gray-700">All generation totaling {{totalPokemons}} Pokèmon</p>
    </div>

    <div class="grid grid-cols-3 gap-6 justify-items-center">
      <el-card 
        v-for="pokemon in pokemons" 
        :key="pokemon.id" 
        class=" relative p-4 hover:shadow-lg cursor-pointer bg-white rounded max-w-xs"
        @click="openModal(pokemon.id)"
      >

      <!-- Heart -->
      <button
        class="absolute top-3 right-3 transition-transform duration-150 hover:scale-110"
        @click.stop="toggleFavorite(pokemon)"
      >
        <component 
          :is="isFavorite(pokemon.id) ? HeartSolid : HeartOutline"
          class="w-6 h-6 transition-colors"
          :class="isFavorite(pokemon.id) ? 'text-red-500' : 'text-gray-400 hover:text-red-400'"
        />
      </button>

      <div class="bg-gray-300 h-40 flex items-center justify-center">
        <img :src="pokemon.image" class="w-full h-40 object-contain" />
      </div>
      
      <p class="text-sm font-bold text-gray-400">#{{ pokemon.id.toString().padStart(3, '0') }}</p>
      <h3 class=" text-2xl font-bold text-gray-60 mb-2 capitalize">{{ pokemon.name }}</h3>
      <div class="flex flex-wrap justify-center gap-2">
      <span 
        v-for="type in pokemon.types"   
        :key="type" 
        :style="{ backgroundColor: getTypeColor(type), color: '#fff' }"
        class="px-2 py-0.5 rounded-xl capitalize text-sm font-semibold"
      >
        {{ type }}
      </span>
    </div>
      </el-card>
    </div>

    <div  class="flex justify-center mt-6 bg-white p-2 rounded-xl">
      <el-pagination 
      background 
      layout="prev, pager, next"
      :total="totalPokemons"
      :page-size="20"
      :pager-count="5"
      v-model:current-page="currentPage"
      @current-change="changePage"
      />
    </div>

    <PokemonDetail 
      v-model:is-open="isModalOpen"
      :pokemon="selectedPokemon"
    />

  </section>
</template>

<script setup lang="ts">
import {ref} from "vue"
import {usePokemons} from "@/composables/usePokemons"
import { getTypeColor } from "@/utils/typeColors" 
import PokemonDetail from "./PokemonDetail.vue"
import { HeartIcon as HeartOutline } from "@heroicons/vue/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/vue/24/solid";
import { useFavorites } from "@/composables/useFavorites";


const {pokemons, totalPokemons, currentPage, fetchPokemons} = usePokemons()
  
const isModalOpen = ref(false)
const selectedPokemon = ref<any>(null)

const { favorites, toggleFavorite, isFavorite } = useFavorites();

const openModal = async (id: number) => {
  const pokemon = pokemons.value.find((p) => p.id === id)
  if (pokemon) {
    selectedPokemon.value = pokemon
    isModalOpen.value = true
  }
}

onMounted(async () => {
  fetchPokemons()
  const saved = localStorage.getItem("favoritePokemons");
  if (saved) favorites.value = JSON.parse(saved);
})

const changePage = (page: number) => {
  currentPage.value = page
  fetchPokemons(page)
}
  
</script> 