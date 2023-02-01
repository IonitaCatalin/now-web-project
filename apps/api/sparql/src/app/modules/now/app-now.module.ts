import { Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { JwtStrategy, JWT_EXPIRES_IN, JWT_SECRET } from "@now/auth";
import {SparqlModule, SparqlService} from "@now/sparql";
import { NowController } from "./controllers";
 
@Module({
    imports: [
        SparqlModule,
        JwtModule.register({ secret: JWT_SECRET, signOptions: { expiresIn: JWT_EXPIRES_IN } }),
        JwtService, JwtStrategy
    ],
    exports: [],
    providers: [SparqlService],
    controllers: [NowController]
  })
export class AppNowModule {}