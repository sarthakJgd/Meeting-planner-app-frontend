import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BrowserModule } from "@angular/platform-browser";
import { FullCalendarModule } from "@fullcalendar/angular";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { RouterModule } from "@angular/router";
import { UserDashboardComponent } from "./user-dashboard/user-dashboard.component";
import { DialogModule } from "primeng/dialog";
import { DrawerModule } from "primeng/drawer";
import { ButtonModule } from "primeng/button";
import { FormsModule } from "@angular/forms";
import { MatIconModule } from '@angular/material/icon';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [AdminDashboardComponent, UserDashboardComponent, AboutComponent],
  imports: [
    CommonModule,
    BrowserModule,
    FullCalendarModule,
    DialogModule,
    DrawerModule,
    ButtonModule,
    FormsModule,
    MatIconModule,
    RouterModule.forChild([
      {
        path: "meetingPlan/admin/:userId",
        component: AdminDashboardComponent
      },
      {
        path: "meetingView/:userId",
        component: UserDashboardComponent
      },
      {
        path: "about",
        component: AboutComponent
      }
    ])
  ]
})
export class MeetingModule {}
