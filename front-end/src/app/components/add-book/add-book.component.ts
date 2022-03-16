import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

// import { Profile } from "../../models/Profile";
// import { ProfileService } from "src/app/services/profile.service";

import { Book } from '../../models/Book';
import { BookService } from 'src/app/services/book.service';
@Component({
  selector: 'app-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss'],
})
export class AddBookComponent implements OnInit {
  @Input('editBook') editBook;
  form: FormGroup;
  book: Book;
  imageData: string;
  strTitle: string;
  strDescription: string;
  bookId: string;

  constructor(
    // private profileService: ProfileService,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null),
      description: new FormControl(null),
      image: new FormControl(null),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    debugger;
    if (this.editBook) {
      this.strTitle = this.editBook.title;
      this.strDescription = this.editBook.description;
      // this.form.value.title = this.editBook.title;
      // this.form.value.description = this.editBook.description;
      this.imageData = this.editBook.imagePath;
    }
  }

  onFileSelect(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (file && allowedMimeTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    debugger;
    let validation = this.checkValidation();
    if (validation) {
      if (this.editBook) {
        this.bookService.updateBook(
          this.editBook._id,
          this.form.value.title,
          this.form.value.description,
          this.editBook.imagePath,
          this.form.value.image
        );
        this.editBook = null;
      } else {
        this.bookService.addBook(
          this.form.value.title,
          this.form.value.description,
          this.form.value.image
        );
      }
      this.form.reset();
      this.imageData = null;
    }
  }

  checkValidation(): boolean {
    let valid = false;
    if (!this.form.value.image) {
      alert('Please select new image');
      valid = false;
    } else {
      valid = true;
    }
    return valid;
  }
}
