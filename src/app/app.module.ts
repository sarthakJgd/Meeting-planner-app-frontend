import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { provideHttpClient, withInterceptorsFromDi, withXhr } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CookieService } from "ngx-cookie-service";
import { RouterModule, Router } from '@angular/router';
import { AppComponent } from "./app.component";/* 
import { UserModule } from "./user3/user.module"; */
import { MeetingModule } from "./meeting/meeting.module";
import { EventService } from "./event.service";
import { UserModule } from './user/user.module';
import { LoginComponent } from './user/login/login.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

@NgModule({ declarations: [AppComponent],
    bootstrap: [AppComponent], imports: [BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        UserModule,
        MeetingModule,
        BrowserAnimationsModule,
        MatSnackBarModule,
        RouterModule.forRoot([
            { path: "login", component: LoginComponent, pathMatch: "full" },
            { path: "", redirectTo: "login", pathMatch: "full" }
        ])], providers: [CookieService, EventService, provideHttpClient(withXhr(), withInterceptorsFromDi()), providePrimeNG({ theme: { preset: Aura } })] })
export class AppModule { }
