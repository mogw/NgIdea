import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IdeaService } from '../idea.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {
  @Input() image: string;
  @Output() updateImage = new EventEmitter<string>();

  public imageSrc: string;

  constructor(private service: IdeaService) { }

  ngOnInit() {
    this.imageSrc = `${environment.apiUrl}/image/${this.image || environment.defaultImg}`
  }
  
  onImageClick() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }

  onFileChange(event) {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    this.service.uploadImage(file).then((imageUrl: string) => {
      this.imageSrc = `${environment.apiUrl}/image/${imageUrl}`
      this.updateImage.emit(imageUrl)
    });
  }

}
