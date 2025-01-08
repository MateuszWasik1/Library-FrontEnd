import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/account-page.component/register-page.component/register-page.component';
import { LoginComponent } from './components/account-page.component/login-page.component/login-page.component';
import { UserPageComponent } from './components/user-page.component/user-page.component';
import { UsersPageComponent } from './components/users-page.component/users-page.component';
import { TestPageComponent } from './components/test-page.component/test-page.component';
import { BooksPageComponent } from './components/books-page.component/books-page.component';
import { BookPageComponent } from './components/books-page.component/book-page.component/book-page.component';

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
    path: 'test',
    component: TestPageComponent,
    title: "Test"
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
