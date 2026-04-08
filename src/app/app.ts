import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { CharacterService } from './services/character.service';
import { Character } from './models/character.model';
import { CharacterFilter } from './components/character-filter/character-filter';
import { CharacterList } from './components/character-list/character-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    CharacterFilter,
    CharacterList
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private characterService = inject(CharacterService);

  allCharacters: Character[] = [];
  filteredCharacters: Character[] = [];
  houseOptions: string[] = [];
  selectedHouse = 'All';

  loading = true;
  error = '';

  ngOnInit(): void {
    // Load all data when the app starts
    this.characterService.getCharacters().subscribe({
      next: (characters) => {
        this.allCharacters = characters;
        this.houseOptions = this.characterService.getHouseOptions(characters);
        this.applyFilter();
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load characters.';
        this.loading = false;
      }
    });
  }

  onHouseChanged(house: string): void {
    this.selectedHouse = house;
    this.applyFilter();
  }

  applyFilter(): void {
    if (this.selectedHouse === 'All') {
      this.filteredCharacters = this.allCharacters;
      return;
    }

    this.filteredCharacters = this.allCharacters.filter((character) => {
      const house = character.house?.trim() || 'Unknown';
      return house === this.selectedHouse;
    });
  }
}