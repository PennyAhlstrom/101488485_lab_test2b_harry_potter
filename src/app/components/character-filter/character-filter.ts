import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-character-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './character-filter.html',
  styleUrl: './character-filter.css'
})
export class CharacterFilter implements OnChanges {
  @Input() houses: string[] = [];
  @Input() selectedHouse = 'All';

  @Output() houseChanged = new EventEmitter<string>();

  // Reactive form control for the dropdown
  houseControl = new FormControl('All', { nonNullable: true });

  constructor() {
    this.houseControl.valueChanges.subscribe((value) => {
      this.houseChanged.emit(value);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Keep control value in sync with parent input
    if (changes['selectedHouse']) {
      this.houseControl.setValue(this.selectedHouse, { emitEvent: false });
    }
  }
}