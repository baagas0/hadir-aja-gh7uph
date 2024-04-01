import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Toast } from '@capacitor/toast';
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
  // URL: string = 'http://hadir-aja.test/api';
  // URL: string = 'http://192.168.100.150:8000/api'
  URL: string = 'https://hadir-aja.web-ditya.my.id/api'
  token: any = localStorage.getItem('token');

  httpHeader = {
    headers: {}
  };

  constructor(
    private http: HttpClient,
    public storage: StorageService,
    public router: Router,
    private toastController: ToastController,
  ) {
    this.initHeader()
  }

  initHeader() {
    console.log('init header', this.token)
    this.httpHeader.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    })
  }

  get(uri: any, param: any, setHeaders: any = null): Observable<any[]> {

    const headers = {
      'Authorization': `Bearer `+localStorage.getItem('token')
    }

    const req: object = {
      params: param,
      headers: setHeaders ? setHeaders : headers
    }

    console.log('req', req)
    let url = ''
    if (uri.includes('http')) url = uri
    else url = `${this.URL}/` + uri

    console.log(url)
    return this.http.get<any[]>(url, req).pipe(
      tap((_) => console.log(`any fetched: ${uri}`)),
      catchError(this.handleError<any[]>(`Get student uri=${uri}`))
    );
  }
  post(uri: any, body: any, params: any): Observable<any> {
    const headers = {
      'Authorization': `Bearer `+localStorage.getItem('token')
    }

    return this.http.post(`${this.URL}/${uri}`, body, { ...{ headers: headers }, ...params }).pipe(
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
      console.log('jancok1')
      if (error.status == 401) {
        console.log('jancok')
        localStorage.setItem('token', '');
        this.router.navigateByUrl('/auth/login');
      }

      // (async () => {
      //   console.log('toas')
      //   const toast = await this.toastController.create({
      //     header: 'Pemberitahuan',
      //     message: error.error.message,
      //     duration: 1500,
      //     position: 'top',
      //     icon: 'alert-circle-outline',
      //     swipeGesture: 'vertical',
      //   });

      //   await toast.present();
      // })

      alert(error.error.message)


      console.error(error.error.message)
      // console.error(JSON.stringify(error))
      console.error(error.status);
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
