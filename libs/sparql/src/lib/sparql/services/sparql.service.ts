import { Injectable } from "@nestjs/common";
import axios from 'axios';
import { FILTER_ON_NAME, GET_ALL_NOTARIES } from "../constants";
import { INotary } from "../interfaces";

@Injectable()
export class SparqlService {
    public async getNotaries(params):Promise<INotary[]>{
        const limit = !!params.limit ? params.limit : 100;
        const offset = !!params.offset ? params.offset : 0;
        let filters = '';
        if(!!params.name){
            filters = filters.concat(FILTER_ON_NAME.replace('%name', params.name.toLowerCase()));
        }
        const query = GET_ALL_NOTARIES.replace('%filters', filters).replace('%limit', limit).replace('%offset', offset);
        return await this.callSparqlEndpoint<INotary[]>(query);
    }

    public async getClosestNotaries(params): Promise<INotary[]>{
        return null;
    }

    public async getTranslators(){

    }

    public async getServices(){

    }

    public async getRatings(){

    }

    protected async callSparqlEndpoint<T>(query: string): Promise<T>{

        const response = await axios.post(process.env.ENV_SPARQL_ENDPOINT, query, {
            headers: {
              "Content-Type": "application/sparql-query"
            }
        }) as any;

        return response.data.results.bindings.map(result => {
            let formatted = {};
            for(const key of Object.keys(result)){
                formatted[key] = result[key].value; 
            }
            return formatted;
        }) as T;
    }

}