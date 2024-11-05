import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../interfaz/pokemon/pokemon.service';
import { Pokemon } from '../../models/pokemon.model';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-detail-component.component.html',
  styleUrls: ['./pokemon-detail-component.component.scss']
})
export class PokemonDetailComponent implements OnInit {
  pokemon: Pokemon | null = null;
  errorMessage: string = '';

  constructor(private route: ActivatedRoute, private pokemonService: PokemonService) {}

  ngOnInit(): void {
    const idString = this.route.snapshot.paramMap.get('id');
    if (idString) {
      const id = Number(idString);
      this.pokemonService.getPokemonById(id).subscribe(
        (data) => {
          this.pokemon = data;
          this.errorMessage = '';
        },
        (error) => {
          console.error('Error al cargar el Pokémon', error);
          this.errorMessage = 'No se pudo cargar el Pokémon. Intenta de nuevo más tarde.';
        }
      );
    } else {
      this.errorMessage = 'ID de Pokémon no válido.';
    }
  }
}
