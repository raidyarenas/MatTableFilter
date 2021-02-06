import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {Directory} from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class DirectoryService {

  constructor(private http: HttpClient) { }

  getAllDirectories({
    per_page = 1, current_page = 1, filter = ''
  }): Observable<{ total: number; directories: Directory[] }> {
    return this.http.get(`${environment.urlAPI}/directories`, {
      params: new HttpParams()
        .set('code', filter)
        .set('address', filter)
        .set('email', filter)
        .set('per_page', per_page.toString())
        .set('page', current_page.toString())
    })
      .pipe(
        map((value: any, index: number) => ({
          directories: value['data'],
          total: value['total']
        }))
      );
  }

  createDirectory(data: Directory): Observable<any> {
    return this.http.post(`${environment.urlAPI}/directory`, JSON.stringify(data));
  }

  putDirectory(data: Directory): Observable<any> {
    return this.http.put(`${environment.urlAPI}/directory/${data.id}`, JSON.stringify(data));
  }

  deleteDirectory(data: Directory): Observable<any>{
    return this.http.post(`${environment.urlAPI}/delete/directory/${data.id}`, {});
  }
}
