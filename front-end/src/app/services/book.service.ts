import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { map } from "rxjs/operators";

import { Book } from "../models/Book";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class BookService {
  private books: Book[] = [];
  private books$ = new Subject<Book[]>();

  readonly url = "http://localhost:3000/api/books";

  constructor(private http: HttpClient) {}

  getBooks() {
    this.http
      .get<{ books: Book[] }>(this.url)
      .pipe(
        map((bookData) => {
          return bookData.books;
        })
      )
      .subscribe((books) => {
        this.books = books;
        this.books$.next(this.books);
      });
  }

  getBookStream() {
    return this.books$.asObservable();
  }

  addBook(title: string, description: string, image: File): void {
    const bookData = new FormData();
    bookData.append("title", title);
    bookData.append("description", description);
    bookData.append("image", image, title);
    this.http.post<{ book: Book }>(this.url, bookData).subscribe((bookData) => {
      const book: Book = {
        _id: bookData.book._id,
        title: title,
        description: description,
        imagePath: bookData.book.imagePath,
      };
      this.books.push(book);
      this.books$.next(this.books);
    });
  }

  deleteBook(book: Book) {
    this.http.delete(`${this.url}/${book._id}`).subscribe(() => {
      this.getBooks();
    });
  }

  updateBook(
    id: string,
    title: string,
    description: string,
    imagePath: string,
    image: File
  ) {
    debugger;
    const bookData = new FormData();
    bookData.append("title", title);
    bookData.append("description", description);
    bookData.append("imagePath", imagePath);
    if (image) {
      bookData.append("image", image, title);
    }
    this.http.put(`${this.url}/${id}`, bookData).subscribe(() => {
      this.getBooks();
    });
  }
}
