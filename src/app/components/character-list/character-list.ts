import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { Character } from '../../models/character.model';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule],
  templateUrl: './character-list.html',
  styleUrl: './character-list.css'
})
export class CharacterList {
  // Characters to display in the list
  @Input() characters: Character[] = [];

  // Return house or fallback text
  getHouseName(house: string): string {
    return house?.trim() ? house : 'Unknown';
  }

  // Return image or placeholder
  getImage(image: string): string {
    return image?.trim() ? image : 'https://via.placeholder.com/200x260?text=No+Image';
  }
}