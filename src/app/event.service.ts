import { Inject, Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { Observable, of } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

@Injectable()
export class EventService {
  private baseURL = `${environment.apiBaseUrl}/api/v1/meeting`;
  constructor(private http: HttpClient) {}

  //get events passing userId as param
  public getEvents(data): Observable<any> {
    const params = new HttpParams().set("userId", data.userId);

    return this.http.post(
      `${this.baseURL}/getEvent`,
      params,
      this.authOptions(data.authToken)
    );
  }

  public createEvents(data): Observable<any> {
    const params = new HttpParams()
      .set("title", data.title)
      .set("startDate", data.startDate)
      .set("endDate", data.endDate)
      .set("location", data.location)
      .set("userId", data.userId)
      .set("creatorId", data.creatorId)
      .set("creatorName", data.creatorName);

    return this.http.post(
      `${this.baseURL}/createEvent`,
      params,
      this.authOptions(data.authToken)
    );
  }

  getAllUserDetails(authToken) {
    return this.http.get(`${this.baseURL}/allUsers`, this.authOptions(authToken));
  }

  editEvent(data) {
    const params = new HttpParams()
      .set("title", data.title)
      .set("start", data.start)
      .set("end", data.end)
      .set("location", data.location);

    return this.http.post(
      `${this.baseURL}/${data.id}/editEvent`,
      params,
      this.authOptions(data.authToken)
    );
  }

  deleteEvent(eventId, authToken) {
    return this.http.get(
      `${this.baseURL}/${eventId}/deleteEvent`,
      this.authOptions(authToken)
    );
  }

  private authOptions(authToken) {
    return { headers: new HttpHeaders().set("Authorization", `Bearer ${authToken}`) };
  }
}
