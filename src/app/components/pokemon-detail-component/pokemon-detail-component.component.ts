import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService} from '../../interfaz/pokemon/pokemon.service';
import { Pokemon } from '../../models/pokemon.model';
@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail-component.component.html',
  styleUrls: ['./pokemon-detail-component.component.scss']
})
export class PokemonDetailComponent implements OnInit {
  pokemon: Pokemon | null = null; // Inicializa como null
  errorMessage: string = ''; // Inicializa la propiedad errorMessage

  constructor(private route: ActivatedRoute, private pokemonService: PokemonService) {}

  ngOnInit(): void {
    const idString = this.route.snapshot.paramMap.get('id'); // Obtiene el id como string
    if (idString) {
      const id = Number(idString); // Convierte a número
      this.pokemonService.getPokemonById(id).subscribe(
        (data) => {
          this.pokemon = data; // Asigna los datos a pokemon
          this.errorMessage = ''; // Limpia el mensaje de error si la carga es exitosa
        },
        (error) => {
          console.error('Error al cargar el Pokémon', error);
          this.errorMessage = 'No se pudo cargar el Pokémon. Intenta de nuevo más tarde.'; // Asigna un mensaje de error
        }
      );
    } else {
      this.errorMessage = 'ID de Pokémon no válido.'; // Manejo de ID no válido
    }
  }
}
