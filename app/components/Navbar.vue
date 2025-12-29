<template>
  <el-menu mode="horizontal" class="flex items-center">
    <img src="/font.png" class="h-12 w-auto mr-4 pl-20" alt="Logo"/>
    <el-menu-item index="/">
      <NuxtLink to="/" active-class="text-yellow-500 font-bold">Home</NuxtLink>
    </el-menu-item>
    <el-menu-item index="/posts" class="ml-6">
      <NuxtLink to="/pokemonType/normal" active-class="text-yellow-500 font-bold">Pokemon Type</NuxtLink>
    </el-menu-item>
    <el-badge :value="1" class="item" type="primary">
      <FavoriteDropdown />
    </el-badge>
    
  </el-menu>
</template>

<style scoped>
.item {
  margin-right: 30px;
}
</style>