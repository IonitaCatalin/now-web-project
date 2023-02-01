import { Injectable } from "@nestjs/common";
import axios from 'axios';
import { FILTER_ON_COUNTY, FILTER_ON_LANGUAGES, FILTER_ON_NAME, GET_ALL_COUNTIES, GET_ALL_LANGUAGES, GET_ALL_NOTARIES, GET_ALL_NOTARIES_SORTED_BY_DISTANCE_FROM_A_POINT, GET_ALL_SERVICES, GET_ALL_TRANSLATORS, GET_ALL_TRANSLATORS_SORTED_BY_DISTANCE_FROM_A_POINT, GET_NOTARY_BY_ID, GET_REVIEWS_FOR_PROVIDER, GET_SCHEMA_NOTARIES, GET_SCHEMA_TRANSLATORS, GET_TRANSLATOR_BY_ID, POST_REVIEW } from "../constants";
import { INotary } from "../interfaces";
var FormData = require('form-data');




@Injectable()
export class SparqlService {
    public async getNotaries(params):Promise<INotary[]>{
        const limit = !!params.limit ? params.limit : 100;
        const offset = !!params.offset ? params.offset : 0;
        let filters = '';
        if(!!params.name){
            filters = filters.concat(FILTER_ON_NAME.replace('%name', params.name.toLowerCase()));
        }
        if(!!params.language){
            filters = filters.concat(FILTER_ON_LANGUAGES.replace('%language', params.language.toLowerCase()));
        }
        if(!!params.county){
            filters = filters.concat(FILTER_ON_COUNTY.replace('%county', params.county.toLowerCase()));
        }

        let query = '';
        if(!!params.coordinates){
            const coords = params.coordinates.split(',');
            query = GET_ALL_NOTARIES_SORTED_BY_DISTANCE_FROM_A_POINT.replace('%lat', coords[0]).replace('%lng', coords[1]);
        }else{
            query = GET_ALL_NOTARIES;
        }

        query = query.replace('%filters', filters).replace('%limit', limit).replace('%offset', offset);
        return await this.callSparqlEndpoint(query);
    }

    public async getNotaryById(id):Promise<INotary>{
        return (await this.callSparqlEndpoint(GET_NOTARY_BY_ID.replace('%id', id)))[0];
    }

    public async getTranslators(params){
        const limit = !!params.limit ? params.limit : 100;
        const offset = !!params.offset ? params.offset : 0;
        let filters = '';
        if(!!params.name){
            filters = filters.concat(FILTER_ON_NAME.replace('%name', params.name.toLowerCase()));
        }
        if(!!params.language){
            filters = filters.concat(FILTER_ON_LANGUAGES.replace('%language', params.language.toLowerCase()));
        }
        if(!!params.county){
            filters = filters.concat(FILTER_ON_COUNTY.replace('%county', params.county.toLowerCase()));
        }

        let query = '';
        if(!!params.coordinates){
            const coords = params.coordinates.split(',');
            query = GET_ALL_TRANSLATORS_SORTED_BY_DISTANCE_FROM_A_POINT.replace('%lat', coords[0]).replace('%lng', coords[1]);
        }else{
            query = GET_ALL_TRANSLATORS;
        }

        query = query.replace('%filters', filters).replace('%limit', limit).replace('%offset', offset);
        return await this.callSparqlEndpoint(query);
    }

    public async getTranslatorById(id){
        return (await this.callSparqlEndpoint(GET_TRANSLATOR_BY_ID.replace('%id', id)))[0];
    }

    public async getServices(){
        return await this.callSparqlEndpoint(GET_ALL_SERVICES);
    }

    public async getLanguages(){
        return await this.callSparqlEndpoint(GET_ALL_LANGUAGES);
    }

    public async getCounties(){
        return await this.callSparqlEndpoint(GET_ALL_COUNTIES);
    }

    public async getReviews(id: string){
        let query = GET_REVIEWS_FOR_PROVIDER;
        query = query.replace("%type", id.startsWith("T") ? 'LegalService' : 'Notary').replace('%id', id);

        return await this.callSparqlEndpoint(query);
    }

    public async postReview(body){
        let query = POST_REVIEW;
        query = query.replace("%type", body.id.startsWith("T") ? 'LegalService' : 'Notary')
            .replace('%id', body.id)
            .replace('%ratingComment', body.ratingComment)
            .replace('%ratingValue', body.ratingValue)
            .replace('%username', body.username);

        return await this.updateSparqlEndpoint(query);
    }

    public async getSchema(){
        const schema = [];
        const notarySchema = await this.callSparqlEndpoint(GET_SCHEMA_NOTARIES, true);
        const translatorSchema = await this.callSparqlEndpoint(GET_SCHEMA_TRANSLATORS, true);
        schema.push(notarySchema, translatorSchema);

        return schema;
    }

    protected async callSparqlEndpoint(query: string, schema=false, post=false){
        const headers = schema ? {
            "Content-Type": "application/sparql-query",
            "Accept": "application/ld+json"
          } : {
            "Content-Type": "application/sparql-query",
          }

        const response = await axios.post(process.env.ENV_SPARQL_ENDPOINT, query, {
            headers
        }) as any;

        if(schema){
            return response.data;
        }if(!post){
            return response.data.results.bindings.map(result => {
                let formatted = {};
                for(const key of Object.keys(result)){
                    formatted[key] = result[key].value; 
                }
                return formatted;
            });
        }

        return {succes: 'true'};
    }

    protected async updateSparqlEndpoint(query: string){
        const endpoint = process.env.ENV_SPARQL_ENDPOINT + "/statements";
        const update = query;


        await axios.post(endpoint, update, 
            {headers: {
                "Content-Type": "application/sparql-update",
            }}
        ) as any;


        return {succes: 'true'};
    }

}