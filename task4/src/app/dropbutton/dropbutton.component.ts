import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoService } from '../photo.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dropbutton',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dropbutton.component.html',
  styleUrls: ['./dropbutton.component.css']
})
export class DropbuttonComponent {
  @Input() authors: string[] = [];
  @Output() author = new EventEmitter<string>();

  selectedAuthor = "all";
  service = inject(PhotoService);

  toggleDropdown() {
    const dropdown = document.getElementById("myDropdown");
    dropdown?.classList.toggle("show");
  }

  selectAuthor(author: string) {
    this.selectedAuthor = author;
    this.author.emit(this.selectedAuthor);
    const dropdown = document.getElementById("myDropdown");
    dropdown?.classList.remove("show");
  }

  filterAuthors() {
    const input = (document.getElementById("myInput") as HTMLInputElement).value.toUpperCase();
    const options = document.querySelectorAll(".dropdown-option");
  }
}
