import { useRuntimeConfig } from "#app"
import type { PokemonDetail, PokemonListResponse } from "~/types/pokemon"
import { usePokemonDetails } from "#imports"

export function usePokemons() {
  const pokemons = ref<PokemonDetail[]>([])
  const totalPokemons = ref(0)
  const currentPage = ref(1)

  const config = useRuntimeConfig()
  const { fetchPokemonDetail } = usePokemonDetails()

  const fetchPokemons = async (page = 1) => {
  try{
    const limit = 20
    const offset = (page - 1) * limit

    const { results, count } = await $fetch<PokemonListResponse>(`${config.public.baseURL}/api/v2/pokemon?limit=${limit}&offset=${offset}`)

      const detailedPokemons = await Promise.all(
        results.map((p) => fetchPokemonDetail(p))
      )

    pokemons.value = detailedPokemons.filter(Boolean) as PokemonDetail[]
    totalPokemons.value = count
  } catch (err) {
    console.error("Gagal fetch pokemons:", err)
  }
}

return {
  pokemons,
  totalPokemons,
  currentPage,
  fetchPokemons
}
}