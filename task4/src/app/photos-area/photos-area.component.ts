import { Component, inject, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { PhotoService } from '../photo.service';
import { Photo } from '../photo/photo.model';
import { PhotoComponent } from '../photo/photo.component';
import { EntirePhotoComponent } from '../entire-photo/entire-photo.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-photos-area',
  standalone: true,
  imports: [CommonModule, PhotoComponent, EntirePhotoComponent],
  templateUrl: './photos-area.component.html',
  styleUrls: ['./photos-area.component.css']
})
export class PhotosAreaComponent implements OnChanges {
  photoService = inject(PhotoService);

  @Input() photos: Photo[] = [];
  @Output() showFullPhotoEvent = new EventEmitter<string>();

  photosArray: Photo[] = [];
  currentIndex = 0;
  photosPerPage = 12;
  link = '';

  ngOnChanges() {
    this.updateDisplayedPhotos();
  }

  updateDisplayedPhotos() {
    if (this.photos) {
      this.photosArray = this.photos.slice(this.currentIndex, this.currentIndex + this.photosPerPage);
    }
  }

  next() {
    if (this.currentIndex + this.photosPerPage < (this.photos?.length || 0)) {
      this.currentIndex += this.photosPerPage;
      this.updateDisplayedPhotos();
    }
  }

  prev() {
    if (this.currentIndex - this.photosPerPage >= 0) {
      this.currentIndex -= this.photosPerPage;
      this.updateDisplayedPhotos();
    }
  }
}
