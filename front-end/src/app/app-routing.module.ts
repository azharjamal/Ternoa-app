import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BookListComponent } from './components/book-list/book-list.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'books-list' },
  { path: 'books-list', component: BookListComponent },
  { path: 'add-book', component: AddBookComponent },
  { path: 'edit-book/:id', component: BookDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
