export const GET_ALL_NOTARIES = `PREFIX notary: <http://example.org/notary#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX schema: <https://schema.org#>

SELECT ?identifier ?name ?addressLocality ?addressRegion ?areaServed ?description ?location ?streetAddress ?email ?offerId
(GROUP_CONCAT(DISTINCT ?telephone; separator = ",") AS ?telephone) 
(GROUP_CONCAT(DISTINCT ?knowsLanguage; separator = ",") AS ?knowsLanguage)
(GROUP_CONCAT(DISTINCT ?offerId; separator = ",") AS ?offerId) 
WHERE {
    ?notary a schema:Notary ;
        schema:identifier ?identifier ;
        schema:name ?name ;
        schema:address [
        	schema:addressLocality ?addressLocality ;
        	schema:addressRegion ?addressRegion ;
         	schema:streetAddress ?streetAddress ;
        ] ;
    	schema:location ?location ;
     	schema:description ?description ;
        schema:areaServed ?areaServed ;
		schema:telephone ?telephone ;
    	schema:email ?email ;
     	schema:knowsLanguage ?knowsLanguage ;
      	schema:makesOffer [
        	schema:identifier ?offerId
    	] ;
        %filter
}
GROUP BY ?identifier ?name ?addressLocality ?addressRegion ?address ?areaServed ?description ?location ?streetAddress ?email
LIMIT = %limit
OFFSET = %offset`;


export const GET_NOTARY_BY_ID = `PREFIX notary: <http://example.org/notary#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX now: <http://example.org/now#>

SELECT ?notary ?name ?room ?address ?city ?county ?description ?coordinates
(GROUP_CONCAT(DISTINCT ?phone_numbers; separator = ",") AS ?phone_numbers) 
(GROUP_CONCAT(DISTINCT ?email_addr; separator = ",") AS ?email_addr) 
(GROUP_CONCAT(DISTINCT ?languages; separator = ",") AS ?languages)
(GROUP_CONCAT(DISTINCT ?services; separator = ",") AS ?services)
WHERE {
    %id a now:Notary ;
        now:name ?name ;
        now:room ?room ;
        now:address ?address ;
        now:city ?city ;
        now:county ?county ;
        now:description ?description ;
        now:phone_numbers ?phone_numbers ;
        now:email_addr ?email_addr ;
        now:languages ?languages ;
        now:coordinates ?coordinates ;
        now:services ?services ;
} GROUP BY ?name ?room ?address ?city ?county ?description ?coordinates`;