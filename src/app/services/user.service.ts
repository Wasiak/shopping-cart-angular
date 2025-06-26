import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { loggedUser } from '../../assets/mocks';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getLoggedUser(): Observable<User> {
    return of(loggedUser);
  }
}
