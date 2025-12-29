import { defineStore } from "pinia";

export const useFavoritesStore = defineStore("favorites", {
  state: () => ({
    favorites: [] as any[],
  }),

  getters: {
    isFavorite: (state) => {
      return (id: number) => state.favorites.some((p) => p.id === id);
    },
  },

  actions: {
    loadFavorites() {
      if (typeof localStorage !== "undefined") {
        const saved = localStorage.getItem("favoritePokemons");
        try {
          this.favorites = saved ? JSON.parse(saved) : [];
        } catch (e) {
          console.error("Failed to parse favorites:", e);
          this.favorites = [];
        }
      }
    },

    toggleFavorite(pokemon: any) {
      const index = this.favorites.findIndex((p) => p.id === pokemon.id);
      if (index === -1) {
        this.favorites.push(pokemon);
      } else {
        this.favorites.splice(index, 1);
      }
      localStorage.setItem("favoritePokemons", JSON.stringify(this.favorites));
    },
  },
});
