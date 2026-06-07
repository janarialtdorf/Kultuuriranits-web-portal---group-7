import { Role } from "./Role";

export interface Person {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    personalCode: string;
    role?: Role; 
}