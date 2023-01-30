import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JWT_EXPIRES_IN, JWT_SECRET } from "@now/auth";
import { AppUserModule } from "./modules";
 
@Module({
    imports: [
      MongooseModule.forRoot(process.env.MONGO_URI, { minPoolSize: 1 , maxPoolSize: 10 }),
      JwtModule.register({ secret: JWT_SECRET, signOptions: { expiresIn: JWT_EXPIRES_IN } }),
      PassportModule,
      AppUserModule,
    ],
    exports: []
  })
export class ApiClientModule {}