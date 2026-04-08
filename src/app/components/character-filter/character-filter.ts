import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-character-filter',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './character-filter.html',
  styleUrl: './character-filter.css'
})
export class CharacterFilter {
  // House options received from parent
  @Input() houses: string[] = [];

  // Currently selected house
  @Input() selectedHouse = 'All';

  // Send selected house back to parent
  @Output() houseChanged = new EventEmitter<string>();

  onSelectionChange(value: string): void {
    this.houseChanged.emit(value);
  }
}