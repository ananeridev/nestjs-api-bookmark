import { ForbiddenException, Injectable } from "@nestjs/common";
import { AuthDto } from "src/dto";
import { PrismaService } from "src/prisma/prisma.service";
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";


@Injectable()
export class AuthService {
    constructor(
      private prisma: PrismaService, 
      private jwt: JwtService,
      private config: ConfigService) {}
    
    async signup(dto: AuthDto) {
        const hash = await argon.hash(dto.password);
        try {
          const user = await this.prisma.user.create({
            data: {
              email: dto.email,
              hash,
            },
          });
    
          return this.signToken(user.id, user.email);
          
        } catch (error) {
          if ( error instanceof PrismaClientKnownRequestError ) {
            if (error.code === 'P2002') {
              throw new ForbiddenException('Credentials taken',);
            }
          }
          throw error;
        }
      }

      async signin(dto: AuthDto) {

        const user =
          await this.prisma.user.findUnique({
            where: {
              email: dto.email,
            },
          });

        if(!user) throw new ForbiddenException ('Credentials incorret', );

        return this.signToken(user.id, user.email);

    }


     signToken( userId: number, email: string): Promise<String> {
        const payload = {
          sub: userId,
          email
        };

        const secret  = this.config.get('JWT_SECRET')

        return this.jwt.signAsync(payload, {
          expiresIn: '15m',
          secret: secret,
        })
    }
        
}

