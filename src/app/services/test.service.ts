import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  // data = new Subject<any>();

  // constructor() {}

  // set(value) {
  //   this.data.next(value);
  // }

  private data: Subject<any> = new Subject<any>();

  constructor() {}

  public get(): Observable<any> {
    return this.data.asObservable();
  }

  public set(books: any): void {
    this.data.next(books);
  }
}
