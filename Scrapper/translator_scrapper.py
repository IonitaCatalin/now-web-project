import json
import jsonpickle
from bs4 import BeautifulSoup as bs
import requests
import openpyxl
from pathlib import Path
import urllib.parse as urlparser
import re
import time
import urllib3
from unidecode import unidecode

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)


class Translator:
    def __init__(self, name, appeal_court, languages, autorization_number, county, phone_numbers):
        self.name = name
        self.appeal_court = appeal_court
        self.autorization_number = autorization_number
        self.county = county
        self.phone_numbers = phone_numbers
        self.languages = languages
        self.address = ''
        self.coordinates = {
            "lat": None,
            "lng": None
        }

    def __str__(self):
        return "Translator {} din {}".format(self.name, self.county)


def augment_with_coordinates(translator):
    url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/{}.json?access_token=pk.eyJ1IjoibWNzc3RlZmFuIiwiYSI6ImNsYnJ1aWdiMjB2MDczdm12ZjExNzQyOHgifQ.fjq7re7h2ZsBNPGbty_wjQ&country=RO&limit=1'
    to_search = 'Translator ' + translator.name + ", " + translator.county

    to_search = urlparser.quote(to_search)
    url = url.format(to_search)
    r = requests.get(url, verify=False)
    if r.status_code != 200:
        print("[FAIL] Couldn't find coordinates for ", translator)
        return
    res = json.loads(r.text)
    if len(res['features']) > 0:
        translator.coordinates = {
            "lng": res['features'][0]['geometry']['coordinates'][0],
            "lat": res['features'][0]['geometry']['coordinates'][1]
        }
        if 'address' in res['features'][0]['properties']:
            translator.address = res['features'][0]['properties']['address']
        else:
            translator.address = res['features'][0]['place_name']
    else:
        print("[FAIL] Couldn't find coordinates for ", translator)
        return


def augment_translator(translator):
    try:
        # augment translator data from different sources
        augment_with_coordinates(translator)
        print("Augmented translator", translator)
    except Exception:
        print('[ERR]', translator)


def augment_translators(translators_list):
    for translator in translators_list:
        augment_translator(translator)
        # time.sleep(0.1)


def parse_translators_list():
    xlsx_file = Path('gov', 'translators_list.xlsx')
    wb_obj = openpyxl.load_workbook(xlsx_file)

    # Read the active sheet:
    sheet = wb_obj.active
    data = {}
    translators_obj_list = []

    for i, row in enumerate(sheet.iter_rows(values_only=True)):
        if i == 0:
            data[row[0]] = []
            data[row[1]] = []
            data[row[2]] = []
            data[row[3]] = []
            data[row[4]] = []
            data[row[5]] = []

        else:
            name = row[0]
            appeal_court = row[1]
            languages = row[2].split(",")
            autorization_number = row[3]
            county = row[4]
            phone_numbers = row[5]
            translators_obj_list.append(
                Translator(name, appeal_court, languages, autorization_number, county, phone_numbers))

    return data, translators_obj_list


def serialize_translators(notaries_obj_list):
    # from this file we can reconstruct the Translator obj
    path = Path('scrapped', 'translators_list_pickle.json')
    text_file = open(path, "w")
    text_file.write(jsonpickle.encode(notaries_obj_list))
    text_file.close()
    # This file doesn't contain the metadata to reconstruct the obj
    path = Path('scrapped', 'translators_list.json')
    text_file = open(path, "w")
    text_file.write(jsonpickle.encode(notaries_obj_list, False))
    text_file.close()


def remove_no_data_translators(translators_obj_list):
    new_list = []
    for translator in translators_obj_list:
        if hasattr(translator, 'coordinates') and (translator.coordinates['lat'] and translator.coordinates['lng']):
            new_list.append(translator)
    return new_list


def deserialize_translators_json():
    f = open(Path('scrapped', 'translators_list_pickle.json'))
    input = f.read()
    f.close()
    deserialized = jsonpickle.decode(input)
    return deserialized


# raw_data, translators_obj_list = parse_translators_list() # load data from xls file
translators_obj_list = deserialize_translators_json() # load data from json file (already augmented)
augment_translators(translators_obj_list)
print("Length before cleaning", len(translators_obj_list))
to_serialize = remove_no_data_translators(translators_obj_list)
print("Length after cleaning", len(to_serialize))
serialize_translators(to_serialize)
