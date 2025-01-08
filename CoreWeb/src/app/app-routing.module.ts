import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/account-page.component/register-page.component/register-page.component';
import { LoginComponent } from './components/account-page.component/login-page.component/login-page.component';
import { UserPageComponent } from './components/user-page.component/user-page.component';
import { UsersPageComponent } from './components/users-page.component/users-page.component';
import { TestPageComponent } from './components/test-page.component/test-page.component';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'user',
    component: UserPageComponent
  },
  {
    path: 'user/:ugid',
    component: UserPageComponent
  },
  {
    path: 'users',
    component: UsersPageComponent
  },
  {
    path: 'test',
    component: TestPageComponent
  },
  {
    path: '**',
    component: UsersPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule] 
})
export class AppRoutingModule { }
