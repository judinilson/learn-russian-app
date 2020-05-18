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
        return this.http.post<UserCreate>(environment.userCreate,data);
    }

    userUpdate(id,data: any){
        return this.http.put<UserUpdate>(environment.userUpdate + id,data);
    }

    userGetById(id){
        return this.http.get<UserUpdate>(environment.getUserById + id);
    }

    countryCreate(data: any){
        return this.http.post<Country>(environment.countryCreate,data);
    }

    teacherGroupGet(){
        return this.http.get<TeacherGroup>(environment.teacherGroupGet);
    }

    UserGroupGet(){
        return this.http.get<UserGroup>(environment.userGroupGet);
    }

    geCountries(){
        return this.http.get(environment.allCountries);
    }
}
