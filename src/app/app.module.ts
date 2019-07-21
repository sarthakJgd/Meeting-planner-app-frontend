import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CookieService } from "ngx-cookie-service";
import { RouterModule, Router } from '@angular/router';
import { AppComponent } from "./app.component";/* 
import { UserModule } from "./user3/user.module"; */
import { MeetingModule } from "./meeting/meeting.module";
import { EventService } from "./event.service";
import { UserModule } from './user/user.module';
import { LoginComponent } from './user/login/login.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    UserModule,
    HttpClientModule,
    MeetingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      { path: "login", component: LoginComponent, pathMatch: "full" },
      { path: "", redirectTo: "login", pathMatch: "full" }
    ])
  ],
  providers: [CookieService, EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }
