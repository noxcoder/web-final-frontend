import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'environments/environment.prod';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private _http: HttpClient) { }

  send(data): Observable<any> {
    const env = { environment };
    return this._http.post(`${env.environment.api}/contact`, data).pipe(map(res => {
      return res;
    }));
  }
}
