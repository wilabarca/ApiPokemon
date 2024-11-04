// src/app/components/pokemon-list/pokemon-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonService } from '../../interfaz/pokemon/pokemon.service';
import { Pokemon } from '../../models/pokemon.model';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [MatTableModule, CommonModule],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
  pokemons: Pokemon[] = [];
  displayedColumns: string[] = ['name', 'types', 'abilities', 'image', 'favorites'];
  favoritePokemons: Set<number> = new Set();

  constructor(private pokemonService: PokemonService, private router: Router) {}

  ngOnInit(): void {
    this.pokemonService.getPokemons().subscribe(data => {
      this.pokemons = data; 
    });
  }

  goToDetails(pokemon: Pokemon): void {
    this.router.navigate(['/pokemon', pokemon.id]);
  }

  toggleFavorite(pokemonId: number): void {
    if (this.favoritePokemons.has(pokemonId)) {
      this.favoritePokemons.delete(pokemonId);
    } else {
      this.favoritePokemons.add(pokemonId);
    }
  }

  isFavorite(pokemonId: number): boolean {
    return this.favoritePokemons.has(pokemonId);
  }
}
