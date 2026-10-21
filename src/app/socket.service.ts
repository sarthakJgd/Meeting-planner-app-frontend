import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import io from "socket.io-client";
import { Observable, observable } from "rxjs";

import { catchError, tap } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { HttpErrorResponse, HttpParams } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: "root"
})
export class SocketService {
  private baseUrl = environment.apiBaseUrl;
  private socket;
  constructor(private http: HttpClient, private Cookie: CookieService) {
    this.socket = io(this.baseUrl);
    this.socket.on("connect", () => {
      this.socket.emit("set-user", this.Cookie.get("authtoken"));
    });
    this.socket.on("auth-error", () => this.socket.disconnect());
  }

  // events to be listened

  public alertUser = userId => {
    return Observable.create(observer => {
      this.socket.on(userId, data => {
        observer.next(data);
      }); // end Socket
    }); // end Observable
  };

  public alertUserForUpcommingMeeting = () => {
    return Observable.create(observer => {
      this.socket.on("alert-user-for-upcomming-meeting", data => {
        observer.next(data);
      }); // end Socket
    }); // end Observable
  };

  public eventOccured = data => {
    this.socket.emit("event-occured", data);
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
