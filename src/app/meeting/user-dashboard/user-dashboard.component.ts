import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from "@angular/core";
import { CalendarOptions, FullCalendarComponent } from "@fullcalendar/angular";
import dayGridPlugin from "@fullcalendar/angular/daygrid";
import interactionPlugin from "@fullcalendar/angular/interaction";
import timeGridPlugin from "@fullcalendar/angular/timegrid";
import { EventService } from "../../event.service";
import { AppService } from "src/app/app.service";
import { CookieService } from "ngx-cookie-service";
import { Router } from "@angular/router";
import { NotificationService } from "../../notification.service";
import { SocketService } from "src/app/socket.service";

@Component({
    selector: "app-user-dashboard",
    templateUrl: "./user-dashboard.component.html",
    styleUrls: ["./user-dashboard.component.css"],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class UserDashboardComponent implements OnInit {
  options: CalendarOptions;
  public allDay: any = false;
  @ViewChild("fullcalendar") fullcalendar?: FullCalendarComponent;
  public authToken: any;
  public userInfo: any;
  public userName: any;
  public userId: any;
  public displayDate = false;
  public location: string;
  public createdBy: string;
  public displayEvent = false;
  public startDate: string;
  public endDate: string;
  public startTime: string;
  public endTime: string;
  public eventTitle: string;
  public allUsers: any = [];
  public eventsModel: any;
  public disconnectedSocket = false;
  public displayRemainder = false;
  public interval: any;

  constructor(
    private eventService: EventService,
    private Cookie: CookieService,
    private appService: AppService,
    private router: Router,
    private toastr: NotificationService,
    private socketService: SocketService
  ) {}
  ngOnInit() {
    this.authToken = this.Cookie.get("authtoken");

    this.userInfo = this.appService.getUserInfoFromLocalstorage();

    this.userId = this.Cookie.get("userId");
    this.userName = this.userInfo.firstName + " " + this.userInfo.lastName;

    let data = {
      userId: this.userId,
      authToken: this.authToken
    };
    this.eventService.getEvents(data).subscribe(
      response => {
        this.eventsModel = response.data;
        this.options = {
          editable: false,
          dayMaxEvents: 2,
          fixedWeekCount: false,
          height: 800,
          headerToolbar: {
            left: "prev,next today myCustomButton",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay"
          },
          plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
          events: this.eventsModel,
          dateClick: this.dateClick.bind(this),
          eventClick: this.eventClick.bind(this)
        };
      },
      error => {
        console.error('Request failed');
      }
    );
    this.showAlertForEvent();
    this.notifyUserAboutMeeting();
  }

  goToAbout= () =>{
    this.router.navigate(["about"]);
  }

  eventClick(model) {
    this.allDay = false;
    this.startDate = model.event.start.toString().substring(0, 15);
    this.endDate = model.event.end.toString().substring(0, 15);
    this.eventTitle = model.event.title;
    this.displayEvent = true;
    this.eventsModel.forEach(event => {
      if (event.id === model.event.id) {
        this.location = event.location;
        this.createdBy = event.creatorName;
        this.startTime = event.start.substring(event.start.indexOf("T") + 1);
        this.endTime = event.end.substring(event.end.indexOf("T") + 1);
      }
    });
  }

  dateClick(model) {
    this.allDay = true;
    this.startDate = model.date.toString().substring(0, 15);
    this.displayDate = true;
  }

  public showAlertForEvent: any = () => {
    this.socketService.alertUser(this.userId).subscribe(data => {
      this.toastr.success(
        "An event was " +
          data.actionPerformed +
          ".Please refresh to see the event."
      );
      setTimeout(() => {
        window.location.reload();
      }, 4000);

    });
  };

  public notifyUserAboutMeeting: any = data => {
    this.socketService.alertUserForUpcommingMeeting().subscribe(
      data => {
        this.eventTitle = data.eventTitle;
        this.interval = setInterval(() => {
          this.displayRemainder = true;
        }, 1000000);
      },
      err => {
        console.error('Request failed');
      }
    );
  };
  stopDisplayRemainder() {
    this.displayRemainder = false;
    clearInterval(this.interval);
  }

  public logout: any = () => {
    this.appService.logout().subscribe(
      apiResponse => {
        if (apiResponse.status === 200) {
          this.Cookie.delete("authtoken");

          this.Cookie.delete("receiverId");

          this.Cookie.delete("receiverName");

          this.Cookie.delete("io");

          this.socketService.exitSocket();

          this.router.navigate(["thank-you"]);
        } else {
          this.toastr.error(apiResponse.message);
        } // end condition
      },
      err => {
        this.toastr.error("some error occured");
      }
    );
  };
}
