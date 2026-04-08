import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CharacterService } from '../../services/character.service';
import { Character } from '../../models/character.model';

@Component({
  selector: 'app-character-details',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule],
  templateUrl: './character-details.html',
  styleUrl: './character-details.css'
})
export class CharacterDetails implements OnInit {
  private route = inject(ActivatedRoute);
  private characterService = inject(CharacterService);

  character?: Character;
  notFound = false;

  ngOnInit(): void {
    // Read the id from the route and load that character
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.notFound = true;
      return;
    }

    this.characterService.getCharacterById(id).subscribe((character) => {
      this.character = character;
      this.notFound = !character;
    });
  }

  getValue(value: string | number | null | undefined): string {
    return value === null || value === undefined || value === ''
      ? 'Unknown'
      : String(value);
  }

  getHouseName(house: string): string {
    return house?.trim() ? house : 'Unknown';
  }

  getImage(image: string): string {
    return image?.trim() ? image : 'https://via.placeholder.com/300x380?text=No+Image';
  }
}