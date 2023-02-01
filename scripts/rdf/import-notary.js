const rdfParser = require("rdf-parse").default;
const n3 = require("n3");
const fs = require("fs");
const {removeDiacritics} = require ('./clean-data');


const { DataFactory } = n3;
const { namedNode, literal, quad, blankNode } = DataFactory;
const writer = new n3.Writer({ 
    prefixes: { 
        schema: 'https://schema.org#',
        rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
        rdfs: 'http://www.w3.org/2000/01/rdf-schema#',
        xsd: 'http://www.w3.org/2001/XMLSchema#',
        geo: 'http://www.opengis.net/ont/geosparql#'},
    });




const notaryData = require('../../Scrapper/scrapped/notaries_list.json');
const servicesData = require('./notary-services.json');

let index = 1;
for(const notary of notaryData){

    const not = blankNode();

    //Type
    writer.addQuad(
        not,
        namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
        namedNode(`schema:Notary`)
    );

    //identifier
    writer.addQuad(
        not,
        namedNode('schema:identifier'),
        literal(`N${index}`)
    );

    //name
    writer.addQuad(
        not,
        namedNode('schema:name'),
        literal(`${notary.name}`)
    );

    //areaServed
    writer.addQuad(
        not,
        namedNode('schema:areaServed'),
        literal(`${notary.room}`)
    );

    //address
    const postalAddr = blankNode();
    quad(postalAddr, namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'), 'schema:PostalAddress')
    
    writer.addQuad(
        not,
        namedNode('schema:address'),
        postalAddr
    )

    writer.addQuad(
        postalAddr,
        namedNode('schema:addressLocality'),
        literal(`${notary.city}`)
    )

    writer.addQuad(
        postalAddr, 
        namedNode('schema:addressRegion'), 
        literal(`${removeDiacritics(notary.county)}`));


    writer.addQuad(
        postalAddr, 
        namedNode('schema:streetAddress'), 
        literal(`${notary.address}`));
    
    //description
    writer.addQuad(
        not,
        namedNode('schema:description'),
        literal(`${notary.description}`)
    );

    //telephone
    if(notary.phone_numbers.length > 0){
        for(phoneNr of notary.phone_numbers){
            writer.addQuad(
                not,
                namedNode('schema:telephone'),
                literal(`${phoneNr}`)
            );
        }
    }else{
        writer.addQuad(
            not,
            namedNode('schema:telephone'),
            literal(``)
        );
    }

    //email
    writer.addQuad(
        not,
        namedNode('schema:email'),
        literal(`${notary.email_addr}`)
    );

    //knowsLanguage
    if(notary.languages.length > 0){
        for(lang of notary.languages){
            writer.addQuad(
                not,
                namedNode('schema:knowsLanguage'),
                literal(`${removeDiacritics(lang)}`)
            );
        }
    }else{
        writer.addQuad(
            not,
            namedNode('schema:knowsLanguage'),
            literal(``)
        );
    }

    //location
    const asWTK = literal(`POINT(${notary.coordinates.lat} ${notary.coordinates.lng})`, namedNode('http://www.opengis.net/ont/geosparql#wktLiteral'));
    writer.addQuad(
        not,
        namedNode('schema:location'),
        asWTK
    );

    //makesOffer
    for(let i=0; i<22; i++){
        if (Math.random() < 0.05){
            continue;
        }
        const service = blankNode();
        quad(service, namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'), 'schema:Offer')
        
        writer.addQuad(
            not,
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

writer.end((err,res) => {fs.writeFileSync('notary.ttl', res);});