import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

import { environment } from "../environment";
import { User } from "../Model/userAuth";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http
      .post<any>(`${environment.apiUrl}/User/authenticate`, {
        username,
        password,
      })
      .pipe(
        map((user) => {
          // login successful if there's a jwt token in the response
          if (user && user.token) {
            //check if is the user already in or is a new user log
            var olduser = JSON.parse(localStorage.getItem("OldUser"));
            if (user.id !== olduser.id) {
              localStorage.clear();
            }

            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem("currentUser", JSON.stringify(user));
            localStorage.removeItem("OldUser"); // removing old user
            this.currentUserSubject.next(user);
          }

          return user;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    var currentUser = localStorage.getItem("currentUser"); //geting curent user
    localStorage.removeItem("currentUser"); // delete it from the storage
    localStorage.setItem("OldUser", currentUser); // store it as old user now
    //localStorage.clear();
    this.currentUserSubject.next(null);
    window.location.reload();
  }
}
