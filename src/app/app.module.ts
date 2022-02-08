import { AuthService } from './services/auth.service';
import { Routes, RouterModule } from '@angular/router';
import { RegisterService } from './services/register.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SpinnerComponent } from './spinner/spinner/spinner.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { MeetupToolsComponent } from './components/meetup-tools/meetup-tools.component';
import { ToolCardsComponent } from './components/meetup-tools/tool-cards/tool-cards.component';
import { SpecialSectionComponent } from './components/special-section/special-section.component';
import { SpecialCardsComponent } from './components/special-section/special-cards/special-cards.component';
import { MeetupVideoComponent } from './components/special-section/meetup-video/meetup-video.component';
import { BottomSectionComponent } from './components/bottom-section/bottom-section.component';
import { InterceptorService } from './interceptor.service';
import { CheckEmailComponent } from './check-email/check-email.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileComponent } from './components/profile/profile.component';
import { ChangeEmailComponent } from './change-email/change-email.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ProfileTestComponent } from './profile-test/profile-test.component';
// import { AuthGuard } from './auth.guard';

// import { AuthInterceptorService } from './auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    SpinnerComponent,
    LandingPageComponent,
    MeetupToolsComponent,
    ToolCardsComponent,
    SpecialSectionComponent,
    SpecialCardsComponent,
    MeetupVideoComponent,
    BottomSectionComponent,
    CheckEmailComponent,
    ChangePasswordComponent,
    ProfileComponent,
    ChangeEmailComponent,
    ProfileTestComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    // RouterModule.forRoot(appRoutes),
    HttpClientModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
  ],
  exports: [RouterModule],
  providers: [
    RegisterService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
