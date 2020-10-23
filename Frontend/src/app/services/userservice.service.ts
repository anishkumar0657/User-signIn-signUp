import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserModel } from '../models/user-model.model';
import { WebserviceService } from './webservice.service';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
  private userSubject: BehaviorSubject<UserModel>;
  public user: Observable<UserModel>;
  constructor(private webService: WebserviceService, private router: Router) {
    this.userSubject = new BehaviorSubject<UserModel>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }


  registerNewUser(payload: UserModel) {
    return this.webService.post('user/addNewUser', payload);
  }

  authenticateUser(email, password) {
    return this.webService.post('user/authenticateUser', { email, password })
      .pipe(map((user: UserModel) => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));
  }
}
