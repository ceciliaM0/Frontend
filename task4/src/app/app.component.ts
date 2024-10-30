import { Component, DestroyRef, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PhotosAreaComponent } from "./photos-area/photos-area.component";
import { EntirePhotoComponent } from "./entire-photo/entire-photo.component";
import { PhotoService } from './photo.service';
import { Photo } from './photo/photo.model';
import { DropbuttonComponent } from './dropbutton/dropbutton.component';
import { ControlsComponent } from './next-prev/next-prev.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PhotosAreaComponent, EntirePhotoComponent, DropbuttonComponent, ControlsComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PhotoGallery';
  photoService = inject(PhotoService);
  private destroyRef = inject(DestroyRef);

  isFetching = signal(false);
  error = signal('');
  authors: string[] = [];
  photos = signal<Photo[]>([]);
  selectedAuthor = "";
  currentPhotoIndex = 0;
  photosPerPage = 6;

  ngOnInit() {
    this.fetchPhotos();
  }

  fetchPhotos() {
    this.isFetching.set(true);
    const subscription = this.photoService.getAllPhotos().subscribe({
      next: (photos) => {
        this.photoService.setPhotos(photos);
        this.photos.set(photos.slice(0, this.photosPerPage));
        this.authors = Array.from(new Set(photos.map(photo => photo.author)));
        this.isFetching.set(false);
      },
      error: (error: Error) => {
        console.log(error.message);
        this.error.set('Something went wrong');
        this.isFetching.set(false);
      }
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  photosByAuthor(author: string) {
    this.selectedAuthor = author;
    const filteredPhotos = this.photoService.getPhotosByAuthor(this.selectedAuthor);
    this.photos.set(filteredPhotos.slice(0, this.photosPerPage));
    this.currentPhotoIndex = 0;
  }

  handleNext() {
    console.log('handleNext called');
    const allPhotos = this.photoService.getPhotosByAuthor(this.selectedAuthor || "");
    const nextIndex = this.currentPhotoIndex + this.photosPerPage;
    if (nextIndex < allPhotos.length) {
      this.photos.set(allPhotos.slice(nextIndex, nextIndex + this.photosPerPage));
      this.currentPhotoIndex = nextIndex;
      console.log('Updated photos:', this.photos());
    }
  }
  
  handlePrev() {
    console.log('handlePrev called');
    const allPhotos = this.photoService.getPhotosByAuthor(this.selectedAuthor || "");
    if (this.currentPhotoIndex > 0) {
      const prevIndex = Math.max(this.currentPhotoIndex - this.photosPerPage, 0);
      this.photos.set(allPhotos.slice(prevIndex, prevIndex + this.photosPerPage));
      this.currentPhotoIndex = prevIndex;
      console.log('Updated photos:', this.photos());
    }
  }
  
}
