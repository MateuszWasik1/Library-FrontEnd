import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/account-page.component/register-page.component/register-page.component';
import { LoginComponent } from './components/account-page.component/login-page.component/login-page.component';
import { UserPageComponent } from './components/user-page.component/user-page.component';
import { UsersPageComponent } from './components/users-page.component/users-page.component';
import { BooksPageComponent } from './components/books-page.component/books-page.component';
import { BookPageComponent } from './components/books-page.component/book-page.component/book-page.component';
import { AuthorsPageComponent } from './components/authors-page.component/authors-page.component';
import { AuthorPageComponent } from './components/authors-page.component/author-page.component/author-page.component';
import { PublishersPageComponent } from './components/publisher-page.component/publishers-page.component';
import { PublisherPageComponent } from './components/publisher-page.component/publisher-page.component/publisher-page.component';
import { ReportsPageComponent } from './components/reports-page.component/reports-page.component';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
    title: "Rejestracja"
  },
  {
    path: 'login',
    component: LoginComponent,
    title: "Logowanie"
  },
  {
    path: 'user',
    component: UserPageComponent,
    title: "Użytkownik"
  },
  {
    path: 'user/:ugid',
    component: UserPageComponent,
    title: "Użytkownik"
  },
  {
    path: 'users',
    component: UsersPageComponent,
    title: "Użytkownicy"
  },
  {
    path: 'books',
    component: BooksPageComponent,
    title: "Książki"
  },
  {
    path: 'books/:bgid',
    component: BookPageComponent,
    title: "Książka"
  },
  {
    path: 'authors',
    component: AuthorsPageComponent,
    title: "Autorzy"
  },
  {
    path: 'authors/:agid',
    component: AuthorPageComponent,
    title: "Autor"
  },
  {
    path: 'publishers',
    component: PublishersPageComponent,
    title: "Wydawnictwa"
  },
  {
    path: 'publishers/:pgid',
    component: PublisherPageComponent,
    title: "Wydawnictwo"
  },
  {
    path: 'reports',
    component: ReportsPageComponent,
    title: "Raporty"
  },
  {
    path: '**',
    component: UsersPageComponent,
    title: "Użytkownicy"
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule] 
})
export class AppRoutingModule { }
