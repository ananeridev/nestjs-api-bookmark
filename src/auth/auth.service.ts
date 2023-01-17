import { Injectable } from "@nestjs/common";


@Injectable({})
export class AuthService {
    
    signup() {

        return {mgs: 'I have sign up'}
    }

    signin() {

        return {mgs: 'I have sign in'}

    }
}

