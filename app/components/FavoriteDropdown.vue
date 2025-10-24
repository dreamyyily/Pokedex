<template>
  <el-sub-menu index="favorites">
    <template #title>
      <span>Favorites ({{ favorites.length }})</span>
    </template>

    <template v-if="favorites.length > 0">
      <el-menu-item
        v-for="poke in favorites"
        :key="poke.id"
        class="flex items-center gap-2"
      >
        <img :src="poke.image" alt="poke" class="w-6 h-6 object-contain" />
        <span class="capitalize">{{ poke.name }}</span>
      </el-menu-item>
    </template>
    <template v-else>
      <el-menu-item disabled>No favorites yet</el-menu-item>
    </template>
  </el-sub-menu>
</template>

<script setup lang="ts">
import { useFavorites } from "@/composables/useFavorites";
const { favorites } = useFavorites();
</script>
