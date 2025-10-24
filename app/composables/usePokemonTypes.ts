import { useRuntimeConfig } from "#app"
import type { PokemonDetail } from "~/types/pokemon"
import { usePokemonDetails } from "#imports"

export function usePokemonTypes() {
  const config = useRuntimeConfig()
  const { fetchPokemonDetail } = usePokemonDetails()

  const types = ref<{ name: string; url: string }[]>([])
  const pokemonsByType = ref<PokemonDetail[]>([])
  const totalPokemons = ref(0)

  const fetchTypes = async () => {
    try {
      const data = await $fetch<any>(`${config.public.baseURL}/api/v2/type`)
      types.value = data.results
    } catch (err) {
      console.error("Gagal fetch types:", err)
    }
  }


  const fetchPokemonsByType = async (type: string, limit = 50) => {
    try {
      const data = await $fetch<any>(`${config.public.baseURL}/api/v2/type/${type}`)
      const pokemonList = data.pokemon.slice(0, limit) 

      const detailedPokemons = await Promise.all(
        pokemonList.map((p: any) => fetchPokemonDetail(p.pokemon))
      )

      pokemonsByType.value = detailedPokemons.filter(Boolean) as PokemonDetail[]
      totalPokemons.value = pokemonsByType.value.length
    } catch (err) {
      console.error(`Gagal fetch Pokemon by type ${type}:`, err)
      pokemonsByType.value = []
      totalPokemons.value = 0
    }
  }

  return {
    pokemonsByType,
    totalPokemons,
    fetchPokemonsByType,
    types,
    fetchTypes
  }
}
