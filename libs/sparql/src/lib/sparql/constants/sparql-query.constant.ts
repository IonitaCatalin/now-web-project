export const GET_ALL_NOTARIES = `PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX schema: <https://schema.org/>

SELECT ?identifier ?name ?addressLocality ?addressRegion ?areaServed ?description ?location ?streetAddress ?email ?offerId ?rating
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
        schema:aggregatedReview [
        	schema:ratingValue ?rating
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
        %filters
}
GROUP BY ?identifier ?name ?addressLocality ?addressRegion ?address ?areaServed ?description ?location ?streetAddress ?email ?rating
LIMIT %limit
OFFSET %offset`;


export const GET_NOTARY_BY_ID = `PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX schema: <https://schema.org/>

SELECT ?identifier ?name ?addressLocality ?addressRegion ?areaServed ?description ?location ?streetAddress ?email ?offerId ?rating
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
        schema:aggregatedReview [
        	schema:ratingValue ?rating
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
        FILTER(?identifier="%id")
}
GROUP BY ?identifier ?name ?addressLocality ?addressRegion ?address ?areaServed ?description ?location ?streetAddress ?email ?rating`;

export const GET_ALL_NOTARIES_SORTED_BY_DISTANCE_FROM_A_POINT=`PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX schema: <https://schema.org/>
PREFIX geo: <http://www.opengis.net/ont/geosparql#>
PREFIX geof: <http://www.opengis.net/def/function/geosparql/>

SELECT ?identifier ?name ?addressLocality ?addressRegion ?areaServed ?description ?location ?streetAddress ?email ?offerId ?distance ?rating
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
        schema:aggregatedReview [
        	schema:ratingValue ?rating
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
        BIND(geof:distance(?location, "POINT(%lat %lng)"^^geo:wktLiteral) AS ?distance)
        %filters
}
GROUP BY ?identifier ?name ?addressLocality ?addressRegion ?address ?areaServed ?description ?location ?streetAddress ?email ?distance ?rating
ORDER BY ?distance
LIMIT %limit
OFFSET %offset`

export const GET_ALL_TRANSLATORS = `PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX schema: <https://schema.org/>
PREFIX geo: <http://www.opengis.net/ont/geosparql#>
PREFIX geof: <http://www.opengis.net/def/function/geosparql/>

SELECT ?identifier ?name ?addressLocality ?addressRegion ?leiCode ?location ?streetAddress ?offerId ?telephone ?rating
(GROUP_CONCAT(DISTINCT ?knowsLanguage; separator = ",") AS ?knowsLanguage)
(GROUP_CONCAT(DISTINCT ?offerId; separator = ",") AS ?offerId) 
WHERE {
    ?translator a schema:LegalService ;
        schema:identifier ?identifier ;
        schema:name ?name ;
        schema:address [
        	schema:addressLocality ?addressLocality ;
        	schema:addressRegion ?addressRegion ;
         	schema:streetAddress ?streetAddress ;
        ] ;
        schema:aggregatedReview [
        	schema:ratingValue ?rating
   	 	] ;
    	schema:location ?location ;
        schema:leiCode ?leiCode ;
		schema:telephone ?telephone ;
     	schema:knowsLanguage ?knowsLanguage ;
      	schema:makesOffer [
        	schema:identifier ?offerId
    	] ;
        %filters
}
GROUP BY ?identifier ?name ?addressLocality ?addressRegion ?address ?leiCode ?location ?streetAddress ?email ?telephone ?rating
LIMIT %limit
OFFSET %offset
`

export const GET_TRANSLATOR_BY_ID = `PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX schema: <https://schema.org/>
PREFIX geo: <http://www.opengis.net/ont/geosparql#>
PREFIX geof: <http://www.opengis.net/def/function/geosparql/>

SELECT ?identifier ?name ?addressLocality ?addressRegion ?leiCode ?location ?streetAddress ?offerId ?telephone ?rating
(GROUP_CONCAT(DISTINCT ?knowsLanguage; separator = ",") AS ?knowsLanguage)
(GROUP_CONCAT(DISTINCT ?offerId; separator = ",") AS ?offerId) 
WHERE {
    ?translator a schema:LegalService ;
        schema:identifier ?identifier ;
        schema:name ?name ;
        schema:address [
        	schema:addressLocality ?addressLocality ;
        	schema:addressRegion ?addressRegion ;
         	schema:streetAddress ?streetAddress ;
        ] ;
        schema:aggregatedReview [
        	schema:ratingValue ?rating
   	 	] ;
    	schema:location ?location ;
        schema:leiCode ?leiCode ;
		schema:telephone ?telephone ;
     	schema:knowsLanguage ?knowsLanguage ;
      	schema:makesOffer [
        	schema:identifier ?offerId
    	] ;
        FILTER(?identifier="%id")
}
GROUP BY ?identifier ?name ?addressLocality ?addressRegion ?address ?leiCode ?location ?streetAddress ?email ?telephone ?rating`;

export const GET_ALL_TRANSLATORS_SORTED_BY_DISTANCE_FROM_A_POINT = `
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX schema: <https://schema.org/>
PREFIX geo: <http://www.opengis.net/ont/geosparql#>
PREFIX geof: <http://www.opengis.net/def/function/geosparql/>

SELECT ?identifier ?name ?addressLocality ?addressRegion ?leiCode ?location ?streetAddress ?offerId ?distance ?telephone ?rating
(GROUP_CONCAT(DISTINCT ?knowsLanguage; separator = ",") AS ?knowsLanguage)
(GROUP_CONCAT(DISTINCT ?offerId; separator = ",") AS ?offerId) 
WHERE {
    ?translator a schema:LegalService ;
        schema:identifier ?identifier ;
        schema:name ?name ;
        schema:address [
        	schema:addressLocality ?addressLocality ;
        	schema:addressRegion ?addressRegion ;
         	schema:streetAddress ?streetAddress ;
        ] ;
        schema:aggregatedReview [
        	schema:ratingValue ?rating
   	 	] ;
    	schema:location ?location ;
        schema:leiCode ?leiCode ;
		schema:telephone ?telephone ;
     	schema:knowsLanguage ?knowsLanguage ;
      	schema:makesOffer [
        	schema:identifier ?offerId
    	] ;
        BIND(geof:distance(?location, "POINT(%lat %lng)"^^geo:wktLiteral) AS ?distance)
        %filters
}
GROUP BY ?identifier ?name ?addressLocality ?addressRegion ?address ?leiCode ?location ?streetAddress ?email ?distance ?telephone ?rating
ORDER BY ?distance
LIMIT %limit
OFFSET %offset
`;

export const GET_ALL_LANGUAGES = `PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX schema: <https://schema.org/>

SELECT DISTINCT ?knowsLanguage WHERE {{
SELECT DISTINCT ?knowsLanguage 
WHERE {
    ?notary a schema:Notary ;
       schema:knowsLanguage ?knowsLanguage ;  
}}
UNION {
SELECT DISTINCT ?knowsLanguage 
WHERE {
    ?notary a schema:LegalService ;
    schema:knowsLanguage ?knowsLanguage ;  
}
}
} 
`

export const GET_ALL_SERVICES = `PREFIX notary: <http://example.org/notary#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX schema: <https://schema.org/>

SELECT * WHERE{
{
SELECT DISTINCT ?offerId ?offerName ?offerDesc
WHERE {
    ?notary a schema:Notary ;
      	schema:makesOffer [
        	schema:identifier ?offerId ;
    		schema:name ?offerName ;
      		schema:description ?offerDesc ;
    	] ;
}
    }UNION{
        SELECT DISTINCT ?offerId ?offerName ?offerDesc
WHERE {
    ?notary a schema:LegalService ;
      	schema:makesOffer [
        	schema:identifier ?offerId ;
    		schema:name ?offerName ;
      		schema:description ?offerDesc ;
    	] ;
}}}`;

export const GET_ALL_COUNTIES = `PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX schema: <https://schema.org/>

SELECT DISTINCT ?addressRegion WHERE {{
SELECT DISTINCT ?addressRegion 
WHERE {
    ?notary a schema:Notary ;
            schema:address[ schema:addressRegion ?addressRegion ];  
}}
UNION {
SELECT DISTINCT ?addressRegion 
WHERE {
    ?notary a schema:LegalService ;
            schema:address[ schema:addressRegion ?addressRegion ];  
}
}
} ORDER BY ?addressRegion
`;

export const GET_SCHEMA_NOTARIES = `PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX schema: <https://schema.org/>

CONSTRUCT {} WHERE {
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
}
LIMIT 1000
`

export const GET_SCHEMA_TRANSLATORS = `PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX schema: <https://schema.org/>

CONSTRUCT {}
WHERE {
    ?translator a schema:LegalService ;
        schema:identifier ?identifier ;
        schema:name ?name ;
        schema:address [
        	schema:addressLocality ?addressLocality ;
        	schema:addressRegion ?addressRegion ;
         	schema:streetAddress ?streetAddress ;
        ] ;
    	schema:location ?location ;
        schema:leiCode ?leiCode ;
		schema:telephone ?telephone ;
     	schema:knowsLanguage ?knowsLanguage ;
      	schema:makesOffer [
        	schema:identifier ?offerId
    	] ;
}`

export const GET_REVIEWS_FOR_PROVIDER = `PREFIX schema: <https://schema.org/>
select ?ratingComment ?ratingValue ?username
where{
    ?notary a schema:%type;
            schema:identifier ?identifier ;
            schema:review[
        		schema:reviewBody ?ratingComment;
                schema:reviewRating [
					schema:ratingValue ?ratingValue
                ];
     			schema:author [
        			schema:name ?username
    			]
    		];
          filter(?identifier = "%id")
}`;

export const POST_REVIEW = `PREFIX schema: <https://schema.org/>

INSERT {
  ?notary schema:review [
        schema:reviewBody "%ratingComment";
        schema:reviewRating [
        	schema:ratingValue "%ratingValue"
    	];
      	schema:author [
        	schema:name "%username"
    	]
    ] .
}WHERE{
  ?notary a schema:%type ;
    schema:identifier ?identifier ;
          filter(?identifier="%id")
}`;

export const UPDATE_AGG_REVIEW = `PREFIX schema: <https://schema.org/>

DELETE {
	?agg schema:ratingValue ?rating.
}
INSERT{
    ?notary schema:aggregatedReview [
    	schema:ratingValue "%rating"
    ]; 
}
WHERE {
  ?notary a schema:%type;
  	schema:identifier ?identifier;
   	schema:aggregatedReview ?agg ;
    schema:aggregatedReview [
    	schema:ratingValue ?rating
    ];
   filter (?identifier = "%id")
}
`