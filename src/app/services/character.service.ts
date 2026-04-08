import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Character } from '../models/character.model';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private http = inject(HttpClient);
  private baseUrl = 'https://hp-api.onrender.com/api';

  // Get all characters
  getCharacters(): Observable<Character[]> {
    return this.http.get<Character[]>(`${this.baseUrl}/characters`);
  }

  // Get one character by id
  // API returns an array with one item, so map it to the first item
  getCharacterById(id: string): Observable<Character | undefined> {
    return this.http
      .get<Character[]>(`${this.baseUrl}/character/${id}`)
      .pipe(map((characters) => characters[0]));
  }

  // Get characters from one house
  getCharactersByHouse(house: string): Observable<Character[]> {
    return this.http.get<Character[]>(
      `${this.baseUrl}/characters/house/${house.toLowerCase()}`
    );
  }

  // Build dropdown options from all characters
  getHouseOptions(characters: Character[]): string[] {
    const houses = characters
      .map((character) => character.house?.trim() || 'Unknown');

    const uniqueHouses = [...new Set(houses)].filter((house) => house !== 'Unknown');

    return ['All', ...uniqueHouses.sort(), 'Unknown'];
  }
}