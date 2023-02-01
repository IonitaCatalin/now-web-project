import { Module } from "@nestjs/common";
import {SparqlModule, SparqlService} from "@now/sparql";
import { NowController } from "./controllers";
 
@Module({
    imports: [
        SparqlModule
    ],
    exports: [],
    providers: [SparqlService],
    controllers: [NowController]
  })
export class AppNowModule {}