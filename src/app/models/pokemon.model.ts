// src/models/pokemon.model.ts
export interface Pokemon {
  id: number;
  name: string;
  types: Array<{ type: { name: string } }>; // Array de tipos
  abilities: Array<{ ability: { name: string } }>; // Array de habilidades
  sprites: { front_default: string }; // Imagen
}

