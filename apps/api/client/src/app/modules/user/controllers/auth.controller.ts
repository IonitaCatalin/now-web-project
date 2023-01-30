import { Body, Controller, Post } from "@nestjs/common";
import { IUser, UserNameAlreadyExistsException, UserEmailAlreadyExistsException, IUserSignupInput, IUserSinginInput, UserNotFoundException } from '@now/users';
import { UsersService, AuthService } from "../services";


@Controller('auth')
export class AuthController {
    constructor(private readonly usersService: UsersService, private readonly authService: AuthService) {}

    @Post('/signup')
    async createUser(@Body() user: IUserSignupInput): Promise<IUser> {
        const existingUser = await this.usersService.findByUsername(user.username);
        const existingUserWithEmail = await this.usersService.findByEmail(user.email);

        if(existingUser) {
            throw new UserNameAlreadyExistsException();
        }
        
        if(existingUserWithEmail) {
            throw new UserEmailAlreadyExistsException();
        }

        return this.usersService.createUser(user);
    }

    @Post('/signin')
    async signinUser(@Body() user: IUserSinginInput): Promise<IUser> {
        const existingUser = await this.usersService.findByUsername(user.username);

        if(!existingUser) {
            throw new UserNotFoundException();
        }

        return this.authService.generateAccessToken(user);
    }
}