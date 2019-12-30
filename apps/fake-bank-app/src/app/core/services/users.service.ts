import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UsersService {

  constructor(httpClient: HttpClient) { }

  getUsers(): Observable<Users> {

  }
}
