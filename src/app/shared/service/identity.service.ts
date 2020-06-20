import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {User,UserUpdate} from '../Model/User-create';
import {Country} from '../Model/Country-create';
import {TeacherGroup,UserGroup} from '../Model/Teacher-Group';
import {environment} from '../environment'



@Injectable({
    providedIn: 'root',
})

export class IdentityService {

    constructor(private http: HttpClient){}

    userCreate(data: any){
        return this.http.post<User>(environment.userCreateUrl,data);
    }

    userUpdate(id,data: any){
        return this.http.put<UserUpdate>(environment.usersUrl + id,data);
    }

    userGet(){
        return this.http.get<User>(environment.usersUrl)
    }

    userGetById(id){
        return this.http.get<UserUpdate>(environment.usersUrl + id);
    }

    countryCreate(data: any){
        return this.http.post<Country>(environment.countryUrl,data);
    }

    countryGetAll(){
        return this.http.get<Country>(environment.countryUrl)
    }

    teacherGroupGet(){
        return this.http.get<TeacherGroup>(environment.teacherGroupGetUrl);
    }

    UserGroupGet(){
        return this.http.get<UserGroup>(environment.userGroupGetUrl);
    }

    geCountries(){
        return this.http.get(environment.allCountries);
    }
}
