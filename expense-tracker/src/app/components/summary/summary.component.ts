import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-summary',
  standalone: true,
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
  imports: [CommonModule]
})
export class SummaryComponent {
  @Input() weeklyExpenses: any[] = []; // Toate cheltuielile săptămânale
}
