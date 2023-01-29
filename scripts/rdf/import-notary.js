const rdfParser = require("rdf-parse").default;
const n3 = require("n3");
const fs = require("fs");

const { DataFactory } = n3;
const { namedNode, literal } = DataFactory;
let store = new n3.Store();
const writer = new n3.Writer({ 
    prefixes: { 
        notary: 'http://example.org/notary#',
        rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
        rdfs: 'http://www.w3.org/2000/01/rdf-schema#',
        xsd: 'http://www.w3.org/2001/XMLSchema#',
        geo: 'http://www.opengis.net/ont/geosparql#'},
        nservice: 'http://example.org/nservice#'
    });


const notaryData = require('../../Scrapper/scrapped/notaries_list.json');

let index = 1;
for(const notary of notaryData){
    writer.addQuad(
        namedNode(`http://example.org/notary#N${index}`),
        namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
        namedNode(`http://example.org/notary#Notary`)
    );
    for(key of Object.keys(notary)){
        if(key == 'coordinates'){
            const asWTK = literal(`POINT(${notary[key].lat} ${notary[key].lng})`, namedNode('http://www.opengis.net/ont/geosparql#wktLiteral'));
            writer.addQuad(
                namedNode(`http://example.org/notary#N${index}`),
                namedNode(`http://example.org/notary#${key}`),
                asWTK
            );
        }
        else if(Array.isArray(notary[key])){
            for(value of notary[key]){
                writer.addQuad(
                    namedNode(`http://example.org/notary#N${index}`),
                    namedNode(`http://example.org/notary#${key}`),
                    literal(value)
                );
            }
        }else{
            writer.addQuad(
                namedNode(`http://example.org/notary#N${index}`),
                namedNode(`http://example.org/notary#${key}`),
                literal(notary[key])
            );
        }
    }

    for(let i = 0; i<24; i++){
        if(Math.random()> 0.05){ // give each service a chance of 95% to be provided by said notary
            writer.addQuad(
                namedNode(`http://example.org/notary#N${index}`),
                namedNode(`http://example.org/notary#services`),
                literal(`SN${i+1}`, namedNode('http://example.org/notary#Service'))
            );
        }
    }



    index++;
}

writer.end((err,res) => {fs.writeFileSync('notary.ttl', res);});