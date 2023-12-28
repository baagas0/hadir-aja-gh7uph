import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from './storage.service';
// export class any {
//   id: string;
//   username: string;
//   email: string;
//   phone: number;
// }
@Injectable({
  providedIn: 'root',
})
export class RestService {
  URL: string = 'https://jsonplaceholder.typicode.com/users';
  token: any = localStorage.getItem('token');

  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    Authorization: `Bearer ${this.token}`
  };

  constructor(private http: HttpClient) {}

  get(uri: any, param: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.URL}/` + uri, { params: param }).pipe(
      tap((_) => console.log(`any fetched: ${uri}`)),
      catchError(this.handleError<any[]>(`Get student uri=${uri}`))
    );
  }
  post(uri: any, body: any, params: any): Observable<any> {
    // console.log('anjing', this.URL)
    return this.http.post(`${this.URL}/${uri}`, body, { ...this.httpHeader, ...params }).pipe(
      tap((_) => console.log(`any post`)),
      catchError(this.handleError<any[]>('Update student'))
    );
  }

  add(student: any): Observable<any> {
    return this.http
      .post<any>(`${this.URL}/`, student, this.httpHeader)
      .pipe(catchError(this.handleError<any>('Add any')));
  }
  getList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.URL}/`).pipe(
      tap((any) => console.log('any fetched!')),
      catchError(this.handleError<any[]>('Get student', []))
    );
  }
  update(id: any, student: any): Observable<any> {
    return this.http.put(`${this.URL}/` + id, student, this.httpHeader).pipe(
      tap((_) => console.log(`any updated: ${id}`)),
      catchError(this.handleError<any[]>('Update student'))
    );
  }
  delete(id: any): Observable<any[]> {
    return this.http.delete<any[]>(`${this.URL}/` + id, this.httpHeader).pipe(
      tap((_) => console.log(`any deleted: ${id}`)),
      catchError(this.handleError<any[]>('Delete student'))
    );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}