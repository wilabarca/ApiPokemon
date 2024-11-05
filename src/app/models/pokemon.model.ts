// src/models/pokemon.model.ts
export interface Pokemon {
  id: number;
  name: string;
  types: Array<{ type: { name: string } }>; 
  abilities: Array<{ ability: { name: string } }>; 
  sprites: { front_default: string }; 
}

