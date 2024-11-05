import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Pokemon } from '../../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  getPokemons(): Observable<Pokemon[]> {
    return this.http.get<{ results: { name: string; url: string; }[] }>(`${this.apiUrl}?limit=100`).pipe(
      switchMap(response =>
        forkJoin(response.results.map(pokemon => this.getPokemonDetails(pokemon.url))).pipe(
          map(pokemons => pokemons.filter((pokemon): pokemon is Pokemon => pokemon !== null)),
          catchError(err => {
            console.error('Error al obtener los detalles de los Pokémon:', err);
            return of([]); 
          })
        )
      )
    );
  }

  private getPokemonDetails(url: string): Observable<Pokemon | null> {
    return this.http.get<Pokemon>(url).pipe(
      catchError(err => {
        console.error('Error al obtener los detalles del Pokémon:', err);
        return of(null); 
      })
    );
  }

  getPokemonById(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.apiUrl}/${id}`);
  }
}
