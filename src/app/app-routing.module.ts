import { ChangePasswordComponent } from './change-password/change-password.component';
import { CheckEmailComponent } from './check-email/check-email.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ChangeEmailComponent } from './change-email/change-email.component';
import { ProfileTestComponent } from './profile-test/profile-test.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/register', pathMatch: 'full' },
  {
    path: 'home',
    component: HeaderComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'profile', component: ProfileComponent },
      // { path: 'new', component: RecipeEditComponent }
    ],
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgetPassword', component: CheckEmailComponent },
  { path: 'changePassword', component: ChangePasswordComponent },
  { path: 'changeEmail', component: ChangeEmailComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'profileTest', component: ProfileTestComponent },

  { path: '**', redirectTo: '/register', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
