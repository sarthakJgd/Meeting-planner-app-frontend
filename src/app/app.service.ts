import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpClientModule,
  HttpParams
} from "@angular/common/http";
import { Observable, observable, ObservableLike } from "rxjs";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: "root"
})
export class AppService {
  baseURL = "http://meetingplannerbackend-env.vxiuy6pa6v.us-east-2.elasticbeanstalk.com/api/v1";
   //baseURL = "http://localhost:8081/api/v1"; 
  constructor(private http: HttpClient, private Cookie: CookieService) {}

  public getUserInfoFromLocalstorage = () => {
    return JSON.parse(localStorage.getItem("userInfo"));
  }; // end getUserInfoFromLocalstorage

  public setUserInfoInLocalStorage = data => {
    localStorage.setItem("userInfo", JSON.stringify(data));
  };

  /* SignupFunctionality */
  public signUpFunction(userData): Observable<any> {
    const params = new HttpParams()
      .set("firstName", userData.firstName)
      .set("lastName", userData.lastName)
      .set("emailId", userData.emailId)
      .set("phoneNumber", userData.phoneNumber)
      .set("userPassword", userData.userPassword);
    return this.http.post(`${this.baseURL}/users/signup`, params);
  }

  public signInFunction(data): Observable<any> {
    const params = new HttpParams()
      .set("emailId", data.emailId)
      .set("userPassword", data.userPassword);
    return this.http.post(`${this.baseURL}/users/login`, params);
  }

  public logout(): Observable<any> {
    const params = new HttpParams().set(
      "authToken",
      this.Cookie.get("authtoken")
    );
    return this.http.post(`${this.baseURL}/users/logout`, params);
  }

  public forgotPasswordSendMail(emailId): Observable<any> {
    const param = new HttpParams().set("emailId", emailId);
    return this.http.post(`${this.baseURL}/users/resetPassword`, param);
  }

  public resetPasswords(data): Observable<any> {
    let params = new HttpParams()
      .set("userId", data.userId)
      .set("authToken", data.authToken)
      .set("userPassword", data.userPassword);
    return this.http.post(`${this.baseURL}/users/resetNewPassword`, params);
  }
}
