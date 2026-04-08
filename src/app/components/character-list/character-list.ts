import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { Character } from '../../models/character.model';
import { CharacterService } from '../../services/character.service';
import { CharacterFilter } from '../character-filter/character-filter';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatProgressSpinnerModule,
    CharacterFilter
  ],
  templateUrl: './character-list.html',
  styleUrl: './character-list.css'
})
export class CharacterList implements OnInit {
  private characterService = inject(CharacterService);

  allCharacters: Character[] = [];
  filteredCharacters: Character[] = [];
  houseOptions: string[] = [];
  selectedHouse = 'All';

  loading = true;
  error = '';

  ngOnInit(): void {
    // Initial page load: get all characters and build dropdown options
    this.characterService.getCharacters().subscribe({
      next: (characters) => {
        this.allCharacters = characters;
        this.filteredCharacters = characters;
        this.houseOptions = this.characterService.getHouseOptions(characters);
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
    this.loading = true;
    this.error = '';

    // Show all characters
    if (house === 'All') {
      this.filteredCharacters = this.allCharacters;
      this.loading = false;
      return;
    }

    // Unknown is not a real API house route, so filter locally
    if (house === 'Unknown') {
      this.filteredCharacters = this.allCharacters.filter(
        (character) => !character.house?.trim()
      );
      this.loading = false;
      return;
    }

    // Real houses use the house-specific endpoint
    this.characterService.getCharactersByHouse(house).subscribe({
      next: (characters) => {
        this.filteredCharacters = characters;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load filtered characters.';
        this.loading = false;
      }
    });
  }

  getHouseName(house: string): string {
    return house?.trim() ? house : 'Unknown';
  }

  getImage(image: string): string {
    return image?.trim()
      ? image
      : 'https://via.placeholder.com/200x260?text=No+Image';
  }

scrollToTop(): void {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

}