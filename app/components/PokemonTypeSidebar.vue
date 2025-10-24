<template>
  <aside class="w-1/4 bg-white p-6 shadow-md">
      <h2 class="text-lg font-bold mb-4">Pokemon Type</h2>
      <ul class="space-y-2">
        <li
          v-for="type in types"
          :key="type.name"
          class="cursor-pointer"
          @click="gotoType(type.name)"
        >
          <span
            :class="[
              'block px-2 py-1 rounded capitalize',
              selectedType === type.name
                ? 'text-blue-500 font-semibold'
                : 'text-gray-600 hover:text-blue-400'
            ]"
          >
            {{ type.name }}
          </span>
        </li>
      </ul>
    </aside>
</template>

<script setup lang="ts">
  defineProps<{
  types: { name: string; url: string }[]
  selectedType: string
}>()

  defineEmits<{
    (e: "select-type", type: string): void
  }>()
  const router = useRouter()
  const gotoType = (type: string) =>{
    navigateTo(`/pokemonType/${type}`)
  }
</script>