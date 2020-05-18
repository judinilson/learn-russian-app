import {Role} from '../Model/role'


export interface UserCreate{
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    countryId: Number;
    teacherGroupId: Number;
    password: string;
    role: Role;
  
}

export interface UserUpdate{
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
}