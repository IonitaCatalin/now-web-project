import { Controller, Delete, Patch, UseGuards, Body } from "@nestjs/common";
import { UserEmailAlreadyExistsException, UserNameAlreadyExistsException, UserNotFoundException } from "@now/users";
import { GetUserId, JwtAuthGuard } from "@now/auth";
import { UsersService } from "../services";
import { IResponse } from "@now/common";
import { Operations } from "@now/common";
import { ResponseUtil } from "@now/common";
import { IUserPatchInput } from "@now/users";

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    @Delete('/me')
    @UseGuards(JwtAuthGuard)
    async deleteUser(@GetUserId() id: string): Promise<IResponse> {
        const user = this.usersService.findById(id);

        if(!user) {
            throw new UserNotFoundException();
        }

        await this.usersService.deleteUser(id);

        return ResponseUtil.prepareAsyncResponse(Operations.DELETE_USER);       
    }

    @Patch('/me')
    @UseGuards(JwtAuthGuard) 
    async patchUSer(@Body() patchUser: IUserPatchInput, @GetUserId() id: string): Promise<IResponse> {
        if(patchUser.email && await this.usersService.findByEmail(patchUser.email)) {
            throw new UserEmailAlreadyExistsException();
        }

        if(patchUser.username && await this.usersService.findByUsername(patchUser.username)) {
            throw new UserNameAlreadyExistsException();
        }

        await this.usersService.updateUser(id, patchUser); 

        return ResponseUtil.prepareAsyncResponse(Operations.PATCH_USER);
    }

}