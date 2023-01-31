import { Controller, Get, Query } from "@nestjs/common";
import { INotary, SparqlService } from "@now/sparql";

@Controller('now')
export class NowController {
    constructor(private readonly sparqlService: SparqlService) {}

    @Get('/notary')
    async createUser(@Query() query): Promise<INotary[]> {
        return await this.sparqlService.getNotaries(query);
    }

    
}
