import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonDetailComponentComponent } from './pokemon-detail-component.component';

describe('PokemonDetailComponentComponent', () => {
  let component: PokemonDetailComponentComponent;
  let fixture: ComponentFixture<PokemonDetailComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonDetailComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonDetailComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
