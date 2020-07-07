import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {User,UserUpdate} from '../Model/User-create';
import {Country} from '../Model/Country-create';
import {TeacherGroup,Group} from '../Model/Teacher-Group';
import {environment} from '../environment'



@Injectable({
    providedIn: 'root',
})

export class IdentityService {

    constructor(private http: HttpClient){}

    /*
        USER(http request)
    */
    studentUserCreate(data: any){
        return this.http.post<User>(environment.studentUserCreateUrl,data);
    }

    teacherUserCreate(data: any){
        return this.http.post<User>(environment.teacherUserCreateUrl,data);
    }

    userUpdate(id,data: any){
        return this.http.put<UserUpdate>(environment.usersUrl + id,data);
    }
    userDelete(id){
        return this.http.delete<UserUpdate>(environment.usersUrl + id);
    }

    userGet(){
        return this.http.get<User>(environment.usersUrl)
    }

    userGetById(id){
        return this.http.get<UserUpdate>(environment.usersUrl + id);
    }

    /*
        COUNTRIES(http request)
    */
    countryCreate(data: any){
        return this.http.post<Country>(environment.countryUrl,data);
    }

    countryGetAll(){
        return this.http.get<Country>(environment.countryUrl)
    }

    geCountries(){
        return this.http.get(environment.allCountries);
    }

    /*
        GROUP(http request)
    */
    teacherGroupGet(){
        return this.http.get<TeacherGroup>(environment.teacherGroupUrl);
    }

    UserGroupGet(){
        return this.http.get<Group>(environment.groupUrl);
    }

    createGroup(data){
        return this.http.post<Group>(environment.groupUrl,data)
    }

    updateGroup(data){
        return this.http.put<Group>(environment.groupUrl,data)
    }
    deleteGroup(id){
        return this.http.delete<Group>(environment.groupUrl + id)
    }
    
    
    createTeacherGroup(data){
        return this.http.post<TeacherGroup>(environment.teacherGroupUrl,data)
    }

    updateTeacherGroup(data){
        return this.http.put<TeacherGroup>(environment.teacherGroupUrl,data)
    }

    deleteTeacherGroup(id){
        return this.http.delete<TeacherGroup>(environment.teacherGroupUrl + id)
    }

    
}
