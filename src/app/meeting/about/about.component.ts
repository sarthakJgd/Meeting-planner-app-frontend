import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/event.service';
import { CookieService } from 'ngx-cookie-service';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SocketService } from 'src/app/socket.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  authToken: string;
  userInfo: any;
  userId: string;
  userName: string;
  
  constructor(
    private eventService: EventService,
    private Cookie: CookieService,
    private appService: AppService,
    private router: Router,
    private toastr: ToastrService,
    private socketService: SocketService) { }

  ngOnInit() {
    this.authToken = this.Cookie.get("authtoken");

    this.userInfo = this.appService.getUserInfoFromLocalstorage();

    this.userId = this.Cookie.get("userId");

    this.userName = `${this.userInfo.firstName} ${this.userInfo.lastName}`; 
  }

  back= () => {
    window.history.back();
  }

  public logout: any = () => {
    this.appService.logout().subscribe(
      apiResponse => {
        if (apiResponse.status === 200) {
          console.log("logout called");
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
  }
}
