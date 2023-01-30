import { Body, Controller, Post } from "@nestjs/common";
import { IResponse, Operations, ResponseUtil } from "@now/common";
import { UserNameAlreadyExistsException, UserEmailAlreadyExistsException, IUserSignupInput, IUserSinginInput, UserNotFoundException } from '@now/users';
import { UsersService, AuthService } from "../services";


@Controller('auth')
export class AuthController {
    constructor(private readonly usersService: UsersService, private readonly authService: AuthService) {}

    @Post('/signup')
    async createUser(@Body() user: IUserSignupInput): Promise<IResponse> {
        const existingUser = await this.usersService.findByUsername(user.username);
        const existingUserWithEmail = await this.usersService.findByEmail(user.email);

        if(existingUser) {
            throw new UserNameAlreadyExistsException();
        }
        
        if(existingUserWithEmail) {
            throw new UserEmailAlreadyExistsException();
        }

        await this.usersService.createUser(user);

        return ResponseUtil.prepareAsyncResponse(Operations.CREATE_USER);
    }

    @Post('/signin')
    async signinUser(@Body() user: IUserSinginInput): Promise<IResponse> {
        const existingUser = await this.usersService.findByUsername(user.username);

        if(!existingUser) {
            throw new UserNotFoundException();
        }

        const token = await this.authService.generateAccessToken(user);

        return ResponseUtil.prepareAsyncResponse(Operations.AUTHENTICATE_USER, token);
    }
}