import { Controller, Delete, Patch, UseGuards } from "@nestjs/common";
import { IUser } from "@now/users";
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {

    @Delete('/me')
    @UseGuards(AuthGuard('jwt'))
    async deleteUser(): Promise<void> {

    }

    @Patch('/me')
    @UseGuards(AuthGuard('jwt'))
    async patchUSer(): Promise<IUser> {
        return null;
    }

}