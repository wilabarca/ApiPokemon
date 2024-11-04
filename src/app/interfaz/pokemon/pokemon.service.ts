
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Pokemon } from '../../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}


  getPokemons(): Observable<Pokemon[]> {
    return this.http.get<{ results: { name: string; url: string; }[] }>(`${this.apiUrl}?limit=100`).pipe(
      map(response => {

        return response.results.map((pokemon, index) => ({
          id: index + 1, // Asignar un ID
          name: pokemon.name,
          url: pokemon.url
        }));
      }),

      switchMap((pokemons: { id: number; name: string; url: string }[]) =>
        forkJoin(pokemons.map((pokemon) => this.getPokemonDetails(pokemon.url)))
      )
    );
  }


  private getPokemonDetails(url: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(url);
  }


  getPokemonById(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.apiUrl}/${id}`);
  }
}
