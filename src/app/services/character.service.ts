import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Character } from '../models/character.model';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private http = inject(HttpClient);
  private apiUrl = 'https://hp-api.onrender.com/api/characters';

  // Fetch all characters from the API
  getCharacters(): Observable<Character[]> {
    return this.http.get<Character[]>(this.apiUrl);
  }

  // Build distinct house options for the filter dropdown
  getHouseOptions(characters: Character[]): string[] {
    const houses = characters
      .map((character) => character.house?.trim() || 'Unknown');

    return ['All', ...new Set(houses)].sort();
  }

  // Find one character by id
  getCharacterById(id: string): Observable<Character | undefined> {
    return this.getCharacters().pipe(
      map((characters) => characters.find((character) => character.id === id))
    );
  }
}