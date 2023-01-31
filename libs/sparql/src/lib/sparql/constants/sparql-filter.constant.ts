export const FILTER_ON_NAME = `FILTER(STRSTARTS(LCASE(?name), "%name")) \n`;
export const FILTER_ON_COUNTY = `FILTER(STRSTARTS(LCASE(?county), "%county")) \n`;
export const FILTER_ON_LANGUAGES = `FILTER (regex(?languages, "^%language", "i"))\n`;