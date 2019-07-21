import { Injectable } from "@angular/core";
import * as io from "socket.io-client";
import { Observable, observable } from "rxjs";

import { catchError, tap } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { HttpErrorResponse, HttpParams } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: "root"
})
export class SocketService {
  private baseUrl = "http://meetingplannerbackend-env.vxiuy6pa6v.us-east-2.elasticbeanstalk.com";
  //private baseUrl = "http://localhost:8081"; 
  private socket;
  constructor(private http: HttpClient, private Cookie: CookieService) {
    this.socket = io(this.baseUrl);
  }

  // events to be listened

  public alertUser = userId => {
    return Observable.create(observer => {
      this.socket.on(userId, data => {
        console.log("alertUser is called");
        observer.next(data);
      }); // end Socket
    }); // end Observable
  };

  public alertUserForUpcommingMeeting = () => {
    return Observable.create(observer => {
      this.socket.on("alert-user-for-upcomming-meeting", data => {
        console.log("alertUser is called");
        observer.next(data);
      }); // end Socket
    }); // end Observable
  };

  public eventOccured = data => {
    this.socket.emit("event-occured", data);
    console.log("in event occured " + data.actionPerformed);
  }; //end of eventCreated

  public disconnectedSocket = () => {
    return Observable.create(observer => {
      this.socket.on("disconnect", () => {
        observer.next();
      }); // end Socket
    }); // end Observable
  }; // end disconnectSocket

  // end events to be listened
  public exitSocket = () => {
    this.socket.disconnect();
  }; // end exit socket
}
