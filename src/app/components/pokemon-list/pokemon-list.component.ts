
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonService } from '../../interfaz/pokemon/pokemon.service';
import { Pokemon } from '../../models/pokemon.model';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { PipeiPipe } from "../../pipes/pipei.pipe";

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [MatTableModule, CommonModule, PipeiPipe],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
  pokemons: Pokemon[] = []; 
  loading: boolean = true;
  displayedColumns: string[] = ['name', 'types', 'abilities', 'image', 'favorites'];
  favoritePokemons: Set<number> = new Set();

  constructor(private pokemonService: PokemonService, private router: Router) {}

  ngOnInit(): void {
    this.pokemonService.getPokemons().pipe(
      tap((pokemons) => {
        this.pokemons = pokemons;  
        this.loading = false;  
      }),
      catchError((error) => {
        console.error('Error al cargar los Pokémon:', error);
        this.loading = false;
        return of([]);
      })
    ).subscribe();
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
