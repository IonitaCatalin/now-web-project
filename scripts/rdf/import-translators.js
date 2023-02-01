const rdfParser = require("rdf-parse").default;
const n3 = require("n3");
const fs = require("fs");

const { DataFactory } = n3;
const { namedNode, literal, blankNode, quad } = DataFactory;
let store = new n3.Store();
const writer = new n3.Writer({ 
    prefixes: {
        schema: 'https://schema.org#',
        rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
        rdfs: 'http://www.w3.org/2000/01/rdf-schema#',
        xsd: 'http://www.w3.org/2001/XMLSchema#',
        geo: 'http://www.opengis.net/ont/geosparql#'},
    });


const translatorData = require('../../Scrapper/scrapped/translators_list.json');
const servicesData = require('./translator-services.json');

let index = 1;
for(const translator of translatorData){
    const transl = blankNode();

    //base
    writer.addQuad(
        transl,
        namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
        namedNode(`schema:LegalService`)
    );

    writer.addQuad(
        transl,
        namedNode('schema:identifier'),
        literal(`T${index}`)
    );

    //name
    writer.addQuad(
        transl,
        namedNode('schema:name'),
        literal(translator.name)
    );

    //address
    const postalAddr = blankNode();
    quad(postalAddr, namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'), 'schema:PostalAddress')
    
    writer.addQuad(
        transl,
        namedNode('schema:address'),
        postalAddr
    )

    writer.addQuad(
        postalAddr,
        namedNode('schema:addressLocality'),
        literal(`${translator.appeal_court}`)
    )

    writer.addQuad(
        postalAddr, 
        namedNode('schema:addressRegion'), 
        literal(`${translator.county}`));

    writer.addQuad(
        postalAddr, 
        namedNode('schema:streetAddress'), 
        literal(`${translator.address}`));

    //leiCode
    writer.addQuad(
        transl, 
        namedNode('schema:leiCode'), 
        literal(`${translator.autorization_number}`));

    //telephone
    writer.addQuad(
        transl,
        namedNode('schema:telephone'),
        literal(`${translator.phone_numbers}`)
    );

    //knowsLanguage
    if(translator.languages.length > 0){
        for(lang of translator.languages){
            writer.addQuad(
                transl,
                namedNode('schema:knowsLanguage'),
                literal(`${lang}`)
            );
        }
    }else{
        writer.addQuad(
            transl,
            namedNode('schema:knowsLanguage'),
            literal(``)
        );
    }

    writer.addQuad(
        transl,
        namedNode('schema:knowsLanguage'),
        literal(`Rom\u00e2na`)
    );


    //location
    const asWTK = literal(`POINT(${translator.coordinates.lat} ${translator.coordinates.lng})`, namedNode('http://www.opengis.net/ont/geosparql#wktLiteral'));
    writer.addQuad(
        transl,
        namedNode('schema:location'),
        asWTK
    );


        //makesOffer
        for(let i=0; i<10; i++){
            if (Math.random() < 0.5 && i > 1){
                continue;
            }
            const service = blankNode();
            quad(service, namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'), 'schema:Offer')
            
            writer.addQuad(
                transl,
                namedNode('schema:makesOffer'),
                service
            )
        
            writer.addQuad(
                service,
                namedNode('schema:identifier'),
                literal(`${servicesData[i].identifier}`)
            )
    
            writer.addQuad(
                service,
                namedNode('schema:name'),
                literal(`${servicesData[i].name}`)
            )
    
            writer.addQuad(
                service,
                namedNode('schema:description'),
                literal(`${servicesData[i].description}`)
            )
        }

    index++;
}

writer.end((err,res) => {fs.writeFileSync('translator.ttl', res);});