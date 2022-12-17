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

NOT_FOUND_NOTARIES = 0


class Notary:
    def __init__(self, name, room, address, city, county):
        self.name = name
        self.room = room
        self.address = address
        self.city = city
        self.county = county
        self.description = ''
        self.phone_numbers = []
        self.email_addr = ''
        self.languages = []

    def __str__(self):
        return "Notar {} din {}".format(self.name, self.city)


def cleanhtml(raw_html):
    cleantext = re.sub(clean_r, '', raw_html)
    return cleantext


def compute_url_for_notar(notary):
    url_notar_list = []
    url_notar = 'https://notariatpublic.com/{}/{}'
    nume_notar = unidecode(" ".join(notary.name.split()).replace(" ", "-").lower())
    judet = unidecode(notary.county.replace(" ", "-").lower())
    if judet == 'bucuresti':
        for i in range(1, 7):
            url_judet = 'notar-sector-{}-bucuresti'.format(i)
            url_notar_list.append(url_notar.format(url_judet, nume_notar))
    else:
        url_notar_list.append(url_notar.format(notary_judet_to_url[judet], nume_notar))

    return url_notar_list


def augment_from_notariat_public(notary):
    global NOT_FOUND_NOTARIES
    try:
        # url_list = 'https://cse.google.com/cse/element/v1?rsz=filtered_cse&num=10&hl=ro&source=gcsc&gss=.com&cselibv=f275a300093f201a&cx=partner-pub-5453614192961613:1332164919&q={}&safe=off&cse_tok=AB1-RNWYpNz1AsSrHqBO01qC2JTk:1670755732131&exp=csqr,cc&callback=google.search.cse.api7279'
        # url_list = url_list.format(urlparser.quote(notary.name))
        # r = requests.get(url_list, verify=False)
        # if r.status_code != 200:
        #     print("[NOTARIAT_PUBLIC] No search result for", notary)
        #     print("response status code", r.status_code)
        #     return
        # query_search = json.loads(r.text[r.text.find('(') + 1:-2])
        # url = query_search['results'][0]['url']

        for url in compute_url_for_notar(notary):
            r = requests.get(url, verify=False)
            if r.status_code != 200:
                print("[FAIL] Couldn't find ", notary)
                continue
            start_description = r.text.find("Biroul notarial")
            notary.description = cleanhtml(r.text[start_description: r.text.find(".", start_description)])

            soup = bs(r.text, 'html.parser')
            found_elements = soup.table.contents
            if len(found_elements) != 5:
                print("[NOTARIAT_PUBLIC] Not enough elements for", notary)
                print("Nr of elements:", len(found_elements))
            found_addr = found_elements[0].br.next.text
            if found_addr:
                notary.address = cleanhtml(found_addr)
            found_phones = []
            first_number = found_elements[1].contents[1].next.text
            if first_number:
                found_phones.append(cleanhtml(first_number))
            second_number = soup.table.contents[1].contents[1].next.next.next
            if second_number:
                found_phones.append(cleanhtml(second_number.text))
            notary.phone_numbers = found_phones
            email_addr = found_elements[2].contents[1].text
            if email_addr:
                notary.email_addr = cleanhtml(email_addr)
            languages = found_elements[3].contents[1].text
            if languages:
                notary.languages = found_elements[3].contents[1].text.split(',')

            print("[SUCCESS] ", notary)
    except Exception as e:
        print("[FAIL] cannot augment", notary)
        print("Exception", e)
        NOT_FOUND_NOTARIES += 1
        return


def augment_notary(notary):
    # augment notary data from different sites
    augment_from_notariat_public(notary)


def augment_notaries(notaries_list):
    for notary in notaries_list:
        augment_notary(notary)
        time.sleep(0.1)
    print("COULDN'T AUGMENT: ", NOT_FOUND_NOTARIES)


def parse_notaries_list():
    xlsx_file = Path('gov', 'notaries_list.xlsx')
    wb_obj = openpyxl.load_workbook(xlsx_file)

    # Read the active sheet:
    sheet = wb_obj.active
    data = {}
    notaries_obj_list = []

    for i, row in enumerate(sheet.iter_rows(values_only=True)):
        if i == 0:
            data[row[0]] = []
            data[row[1]] = []
            data[row[2]] = []
            data[row[3]] = []
            data[row[4]] = []

        else:
            name = row[0]
            data['Nume si prenume'].append(row[0])
            room = row[1]
            data['Camera'].append(row[1])
            address = row[2]
            data['Adresa sediu'].append(row[2])
            city = row[3]
            data['Localitate'].append(row[3])
            county = row[4]
            data['Judet'].append(row[4])
            notaries_obj_list.append(Notary(name, room, address, city, county))

    return data, notaries_obj_list


def serialize_notaries(notaries_obj_list):
    path = Path('scrapped', 'notaries_list.json')
    text_file = open(path, "w")
    text_file.write(jsonpickle.encode(notaries_obj_list))
    text_file.close()


clean_r = re.compile('<.*?>')


def compute_notary_for_judet():
    f = open("judete.json")
    data = json.load(f)
    f.close()
    dict = {}
    for judetObj in data:
        dict[judetObj['nume']] = judetObj['notariatpublic']
    return dict


notary_judet_to_url = compute_notary_for_judet()
raw_data, notaries_obj_list = parse_notaries_list()
augment_notaries(notaries_obj_list)
serialize_notaries(notaries_obj_list)
print(notaries_obj_list)
