import { Body, Controller, Post } from "@nestjs/common";
import { AuthDto } from "src/dto";
import { AuthService } from "./auth.service";


@Controller('auth')
export class AuthController {
    // depedency injection
    constructor(private authService: AuthService) {}

    @Post('signup')
    signup(@Body() dto: AuthDto) {

        return this.authService.signup(dto);
    }

    @Post('signin')
    signin(@Body() dto: AuthDto) {
        return this.authService.signin(dto);

    }
}