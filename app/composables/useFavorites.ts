import { ref, watch, onMounted } from "vue";

const favorites = ref<any[]>([]);

export function useFavorites() {
  const loadFavorites = () => {
    if (typeof localStorage !== "undefined") {
      const saved = localStorage.getItem("favoritePokemons");
      try {
        favorites.value = saved ? JSON.parse(saved) : [];
      } catch (e) {
        console.error("Failed to parse favorites:", e);
        favorites.value = [];
      }
    }
  };

  const toggleFavorite = (pokemon: any) => {
    const index = favorites.value.findIndex(p => p.id === pokemon.id);
    if (index === -1) {
      favorites.value.push(pokemon);
    } else {
      favorites.value.splice(index, 1);
    }
  };

  const isFavorite = (id: number) => favorites.value.some(p => p.id === id);

  watch(
    favorites,
    (val) => {
      if (typeof localStorage !== "undefined") {
        localStorage.setItem("favoritePokemons", JSON.stringify(val));
      }
    },
    { deep: true }
  );

  onMounted(() => {
    loadFavorites();
  });

  return { favorites, toggleFavorite, isFavorite, loadFavorites };
}
