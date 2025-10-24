export interface Pokemon {
  id: number
  name: string
  image: string
  types: string[]
}

export interface PokemonDetail extends Pokemon {
  stats: { name: string; base_stat: number }[]
  abilities: string[]
  abilityObjects: { name: string; is_hidden: boolean }[]
  weight: number
  height: number
  description: string
}

export interface PokemonListResponse {
  count: number
  next: string | null
  previous: string | null
  results: {
    name: string
    url: string
  }[]
}

export interface PokemonDetailResponse {
  id: number
  name: string
  weight: number        
  height: number
  types: {
    slot: number
    type: { name: string; url: string }
  }[]
  stats: {
    base_stat: number
    effort: number
    stat: { name: string; url: string }
  }[]
  abilities: {
    ability: { name: string; url: string }
    is_hidden: boolean
    slot: number
  }[]
}
