import { Module } from "@nestjs/common";
import { AppNowModule } from "./modules/now/app-now.module";
 
@Module({
    imports: [
        AppNowModule
    ],
    exports: [],
    providers: []
  })
export class ApiNowModule {}