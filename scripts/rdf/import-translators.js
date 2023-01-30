const rdfParser = require("rdf-parse").default;
const n3 = require("n3");
const fs = require("fs");

const { DataFactory } = n3;
const { namedNode, literal } = DataFactory;
let store = new n3.Store();
const writer = new n3.Writer({ 
    prefixes: { 
        translator: 'http://example.org/translator#',
        now: 'http://example.org/now#',
        service: 'http://example.org/service#',
        rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
        rdfs: 'http://www.w3.org/2000/01/rdf-schema#',
        xsd: 'http://www.w3.org/2001/XMLSchema#',
        geo: 'http://www.opengis.net/ont/geosparql#'},
    });


const translatorData = require('../../Scrapper/scrapped/translators_list.json');

let index = 1;
for(const translator of translatorData){
    writer.addQuad(
        namedNode(`http://example.org/translator#T${index}`),
        namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
        namedNode(`http://example.org/now#Translator`)
    );
    for(key of Object.keys(translator)){
        if(key == 'coordinates'){
            const asWTK = literal(`POINT(${translator[key].lat} ${translator[key].lng})`, namedNode('http://www.opengis.net/ont/geosparql#wktLiteral'));
            writer.addQuad(
                namedNode(`http://example.org/translator#T${index}`),
                namedNode(`http://example.org/now#${key}`),
                asWTK
            );
        }
        else if(Array.isArray(translator[key])){
            for(value of translator[key]){
                writer.addQuad(
                    namedNode(`http://example.org/translator#T${index}`),
                    namedNode(`http://example.org/now#${key}`),
                    literal(`${value}`)
                );
            }
        }else{
            writer.addQuad(
                namedNode(`http://example.org/translator#T${index}`),
                namedNode(`http://example.org/now#${key}`),
                literal(`${translator[key]}`)
            );
        }
    }

    for(let i = 0; i<10; i++){
        let chance = i<2 ? true : Math.random() > 0.5;
        if(chance){ // give each service a chance of 50% to be provided by said notary except the first 2 which are pretty standard
            writer.addQuad(
                namedNode(`http://example.org/translator#T${index}`),
                namedNode(`http://example.org/now#services`),
                literal(`ST${i+1}`, namedNode('http://example.org/now#Service'))
            );
        }
    }



    index++;
}

writer.end((err,res) => {fs.writeFileSync('translator.ttl', res);});