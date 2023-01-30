import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { IUserSignupInput, UserWrongCredentialsException } from "@now/users";
import { UsersService } from "./users.service";

import * as bcrypt from 'bcrypt';
import { JWT_SECRET, JWTPayload, JWT_EXPIRES_IN  } from "@now/auth";

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService, private readonly jwtTokenService: JwtService) {}

    protected async validateUser(user: IUserSignupInput): Promise<any> {
        const result = await this.usersService.findByUsername(user.username),
            match = await bcrypt.compare(user.password, result.password);

        if(!match) {
            throw new UserWrongCredentialsException();
        }

        return result;

    }

    async generateAccessToken(input: IUserSignupInput): Promise<any> {

        const result = await this.validateUser(input),
            payload: JWTPayload = {userId: `${result._id}`};
        
        return {
            access_token: this.jwtTokenService.sign(payload, { secret: JWT_SECRET, expiresIn: JWT_EXPIRES_IN }),
        } 
    }
} 