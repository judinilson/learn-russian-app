import {Role} from '../Model/role'


export interface User{
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    countryId?: Number;
    teacherGroupId?: Number;
    subject?:string;
    password: string;
    role: Role;
    created:Date;
  
}

export interface UserUpdate{
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
}