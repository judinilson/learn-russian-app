import {Role} from '../Model/role'


export interface User{
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    password: string;
    role: Role;
    token?: string;
}