import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

//import { ProfileService } from "src/app/services/profile.service";
//import { Profile } from "src/app/models/Profile";

import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/models/Book';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit, OnDestroy {
  books: Book[] = [];
  book!: Book;
  private bookSubscription!: Subscription;

  constructor(
    //private profilesService: ProfileService,
    private bookService: BookService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //this.profilesService.getProfiles();
    this.bookService.getBooks();
    this.bookSubscription = this.bookService
      .getBookStream()
      .subscribe((books: Book[]) => {
        this.books = books;
      });
    //this.book = null;
  }

  ngOnDestroy() {
    this.bookSubscription.unsubscribe();
  }

  delete(book: Book) {
    this.bookService.deleteBook(book);
  }

  edit(book: Book) {
    this.book = book;
    //this.router.navigateByUrl("edit-book/:id")
  }
}
