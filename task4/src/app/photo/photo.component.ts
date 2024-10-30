import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Photo } from './photo.model';

@Component({
  selector: 'app-photo',
  standalone: true,
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent {
  @Input() photo!: Photo;
}
