import { useRuntimeConfig } from "#app";
import type { PokemonDetailResponse } from "~/types/pokemon";

export function usePokemonDetails() {
  const config = useRuntimeConfig()

  const fetchPokemonDetail = async (pokemon: {name: string; url: string}) => {
  try {
    const data = await $fetch<PokemonDetailResponse>(`${pokemon.url}`)

    const species = await $fetch<{flavor_text_entries: any[]}>(`${config.public.baseURL}/api/v2/pokemon-species/${data.id}`)
    const flavorEntry = species.flavor_text_entries.find((entry: any) => entry.language.name === "en")

    return {
      id: data.id,
      name: data.name,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`,
      types: data.types.map((t: any) => t.type.name),
      stats: data.stats.map((s: any) => ({ name: s.stat.name, base_stat: s.base_stat })),
      abilities: data.abilities.map((a: any) => a.ability.name),
      abilityObjects: data.abilities.map((a: any) => ({
        name: a.ability.name,
        is_hidden: a.is_hidden,
      })),
      weight: data.weight,
      height: data.height,
      description: flavorEntry?.flavor_text.replace(/\n|\f/g, " ") || ""
    }
  } catch(err) {
    console.error(`Gagal fetch detail ${pokemon.name}:`, err)
    return null
  }
  }
  return {fetchPokemonDetail}
}