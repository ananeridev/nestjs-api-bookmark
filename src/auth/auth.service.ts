import { Injectable } from "@nestjs/common";
import { AuthDto } from "src/dto";
import { PrismaService } from "src/prisma/prisma.service";


@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {}
    
    signup(dto: AuthDto) {

        return { mgs: 'I have sign up' }
    }

    signin() {        console.log({
        dto,
    })

        return { mgs: 'I have sign in' }

    }
}

