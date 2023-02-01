import { Body, Controller, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { GetUserId, JwtAuthGuard } from "@now/auth";
import { INotary, SparqlService } from "@now/sparql";

@Controller('now')
export class NowController {
    constructor(private readonly sparqlService: SparqlService) {}

    @Get('/notary')
    async getNotaries(@Query() query): Promise<INotary[]> {
        return await this.sparqlService.getNotaries(query);
    }

    @Get('/notary/:id')
    async getNotaryById(@Param('id') id): Promise<INotary> {
        return await this.sparqlService.getNotaryById(id);
    }

    @Get('/translator')
    async getTranslators(@Query() query) {
        return await this.sparqlService.getTranslators(query);
    }

    @Get('/translator/:id')
    async getTranslatorById(@Param('id') id){
        return await this.sparqlService.getTranslatorById(id);
    }

    @Get('/providers')
    async getProviders(@Query() query) {
        const notaries = await this.sparqlService.getNotaries(query);
        const translators = await this.sparqlService.getTranslators(query);
        return {
            notaries,
            translators
        }
    }

    @Get('/languages')
    async getLanguages() {
        return await this.sparqlService.getLanguages();
    }

    @Get('/services')
    async getServices() {
        return await this.sparqlService.getServices();
    }

    @Get('/counties')
    async getCounties() {
        return await this.sparqlService.getCounties();
    }

    @Get('/schema')
    async getSchema(){
        return await this.sparqlService.getSchema();
    }

    @Post('/review')
    @UseGuards(JwtAuthGuard)
    async postReview(@Body() body){
        return await this.sparqlService.postReview(body)
    }

    @Get('/review/:id')
    async getReview(@Param('id') id){
        return await this.sparqlService.getReviews(id);
    }
}
