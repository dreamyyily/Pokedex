<template>
  <section class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex">
    <PokemonTypeSidebar 
      :types="types"
      :selected-type="selectedType"
      @select-type="selectType"
      class="w-64 fixed left-0 top-16 h-[calc(100vh-4rem)] overflow-y-auto shadow-xl z-10 mt-4"
    />

    <main class="flex-1 ml-64 p-8 relative min-h-screen pt-20">
      <div class="fixed inset-0 overflow-hidden pointer-events-none" style="top: 64px;">
        <!-- Right Ellipse -->
        <div 
          class="absolute top-10 -right-20 opacity-50"
          :style="{ color: getTypeColorElipse(selectedType) }"
        >
          <svg width="500" height="600" viewBox="0 0 390 780" fill="none">
            <path 
              d="M390 110C235.361 110 110 235.36 110 390C110 544.64 235.361 670 390 670" 
              stroke="currentColor" 
              stroke-width="220" 
              stroke-linecap="round"
            />
          </svg>
        </div>

        <!-- Left Ellipse -->
        <div 
          class="absolute left-56 bottom-10 opacity-50"
          :style="{ color: getTypeColorElipse(selectedType) }"
        >
          <svg width="300" height="400" viewBox="0 0 392 780" fill="none">
            <path 
              d="M2 670C156.64 670 282 544.64 282 390C282 235.36 156.64 110 2 110" 
              stroke="currentColor" 
              stroke-width="220" 
              stroke-linecap="round"
            />
          </svg>
        </div>
      </div>

      <!-- Atas -->
      <div class="relative z-10 max-w-6xl mx-auto">
        <div class="mb-8 text-center">
          <h1 class="text-4xl font-bold text-gray-800 mb-2">
            Pokémon <span class="normal-case">with</span> <span class="text-gradient capitalize">{{ selectedType }}</span> Type
          </h1>
        </div>

        <!-- Pokemon List -->
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-8">
          <PokemonList :paginated-pokemons="paginatedPokemons" />
        </div>

        <!-- Pagination -->
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6">
          <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div class="flex items-center space-x-2">
              <span class="text-gray-600 text-sm">Item per halaman:</span>
              <el-select 
                v-model="perPage" 
                size="small" 
                style="width: 80px;" 
                @change="handleSizeChange"
              >
                <el-option
                  v-for="item in [5, 10, 20, 50]"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </div>

            <div class="flex-1 flex justify-center">
              <el-pagination
                v-model:current-page="currentPage"
                :page-size="perPage"
                :total="totalPokemons"
                background
                layout="prev, pager, next"
                @current-change="handleCurrentChange"
              />
            </div>

            <div class="text-gray-600 text-sm bg-gray-100 px-3 py-1 rounded-lg">
              Total: <span class="font-semibold">{{ totalPokemons }}</span> Pokémon
            </div>
          </div>
        </div>
      </div>
    </main>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue"
import PokemonList from "~/components/PokemonList.vue"
import PokemonTypeSidebar from "~/components/PokemonTypeSidebar.vue"
import { usePokemonTypes } from "#imports"
import { getTypeColor } from "#imports"

const { types, pokemonsByType, totalPokemons, fetchTypes, fetchPokemonsByType } = usePokemonTypes()

const route = useRoute()

const selectedType = ref<string>(route.params.type as string || "normal")
const currentPage = ref(1)
const perPage = ref(10)

const handleSizeChange = (val: number) => {
  currentPage.value = 1
  console.log(`${val} per page`)
}

const handleCurrentChange = (val: number) => {
  console.log(`page changed: ${val}`)
}

const paginatedPokemons = computed(() => {
  const start = (currentPage.value - 1) * perPage.value
  return pokemonsByType.value.slice(start, start + perPage.value)
})

const selectType = (type: string) => {
  selectedType.value = type
  currentPage.value = 1
  fetchPokemonsByType(type)
}

const getTypeColorElipse = (type: string) => {
  return getTypeColor(type) 
}

onMounted(() => {
  fetchTypes()
  fetchPokemonsByType(selectedType.value)
})
</script>

<style scoped>
.text-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.bg-white\/80 {
  background-color: rgba(255, 255, 255, 0.8);
}

.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}
</style>