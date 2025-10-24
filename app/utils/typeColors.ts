export const getTypeColor = (type: string) => {
  const colors: Record<string, string> = {
    fire: '#EF4444',      
    water: '#3B82F6',     
    grass: '#10B981',     
    electric: '#FACC15', 
    ice: '#67E8F9',       
    fighting: '#B45309',  
    poison: '#9333EA',   
    ground: '#CA8A04',   
    flying: '#6366F1',   
    psychic: '#EC4899',  
    bug: '#84CC16',      
    rock: '#78350F',     
    ghost: '#4338CA',    
    dragon: '#4C1D95',   
    dark: '#1F2937',     
    steel: '#9CA3AF',    
    fairy: '#F9A8D4',    
    normal: '#D1D5DB', 
  }

  return colors[type.toLowerCase()] || '#9CA3AF'
}