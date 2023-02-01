export const FILTER_ON_NAME = `FILTER(STRSTARTS(LCASE(?name), "%name")) \n`;
export const FILTER_ON_COUNTY = `FILTER(STRSTARTS(LCASE(?addressRegion), "%county")) \n`;
export const FILTER_ON_LANGUAGES = `FILTER (regex(?knowsLanguage, "^%language", "i"))\n`;