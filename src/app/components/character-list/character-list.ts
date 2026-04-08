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
    // Load all characters once
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

  getHouseName(house: string): string {
    return house?.trim() ? house : 'Unknown';
  }

  getImage(image: string): string {
    return image?.trim()
      ? image
      : 'https://via.placeholder.com/200x260?text=No+Image';
  }
}