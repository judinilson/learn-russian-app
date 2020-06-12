import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {UserCreate,UserUpdate} from '../Model/User-create';
import {Country} from '../Model/Country-create';
import {TeacherGroup,UserGroup} from '../Model/Teacher-Group';
import {environment} from '../environment'



@Injectable({
    providedIn: 'root',
})

export class IdentityService {

    constructor(private http: HttpClient){}

    userCreate(data: any){
        return this.http.post<UserCreate>(environment.userCreateUrl,data);
    }

    userUpdate(id,data: any){
        return this.http.put<UserUpdate>(environment.userUpdateUrl + id,data);
    }

    userGetById(id){
        return this.http.get<UserUpdate>(environment.getUserByIdUrl + id);
    }

    countryCreate(data: any){
        return this.http.post<Country>(environment.countryCreateUrl,data);
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
