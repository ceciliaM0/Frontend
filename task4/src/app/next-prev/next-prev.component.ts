import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-controls',
  standalone: true,
  templateUrl: './next-prev.component.html',
  styleUrls: ['./next-prev.component.css']
})
export class ControlsComponent {
  @Output() prev = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();

  constructor() {
    console.log('ControlsComponent initialized');
  }

  onPrevClick() {
    console.log('Prev button clicked');
    this.prev.emit();
  }

  onNextClick() {
    console.log('Next button clicked');
    this.next.emit();
  }
}
