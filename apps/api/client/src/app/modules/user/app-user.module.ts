import { Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { JwtStrategy, JWT_EXPIRES_IN, JWT_SECRET } from "@now/auth";
import { RabbitMQService } from "@now/common";
import { UserSchemaFactory} from "@now/users";
import { AuthController, UsersController } from "./controllers";
import { AuthService, UsersService } from "./services";

@Module({
    controllers: [AuthController, UsersController],
    providers: [UsersService, UserSchemaFactory, AuthService, JwtService, JwtStrategy, RabbitMQService],
})
export class AppUserModule {}