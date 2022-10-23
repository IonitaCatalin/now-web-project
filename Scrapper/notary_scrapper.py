import json
from bs4 import BeautifulSoup as bs
import requests
import openpyxl
from pathlib import Path
import urllib.parse as urlparser
import re
import time


class Notary:
    def __init__(self, name, room, address, city, country):
        self.name = name
        self.room = room
        self.address = address
        self.city = city
        self.country = country
        self.description = ''
        self.phone_numbers = []
        self.email_addr = ''
        self.languages = []

    def __str__(self):
        return "Notar {} din {}".format(self.name, self.city)


def cleanhtml(raw_html):
    cleantext = re.sub(clean_r, '', raw_html)
    return cleantext


def augment_from_notariat_public(notary):
    try:
        url_list = 'https://cse.google.com/cse/element/v1?rsz=filtered_cse&num=10&hl=ro&source=gcsc&gss=.com&cselibv=f275a300093f201a&cx=partner-pub-5453614192961613:1332164919&q={}&safe=off&cse_tok=AB1-RNXZKlg6B-IIJANFEzuZjQ7c:1666517031524&exp=csqr,cc&callback=google.search.cse.api4013'
        url_list = url_list.format(urlparser.quote(notary.name))
        r = requests.get(url_list, verify=False)
        if r.status_code != 200:
            print("[NOTARIAT_PUBLIC] No search result for", notary)
            print("response status code", r.status_code)
            return
        query_search = json.loads(r.text[r.text.find('4013') + 5:-2])

        url = query_search['results'][0]['url']
        r = requests.get(url, verify=False)
        if r.status_code != 200:
            print("[NOTARIAT_PUBLIC] Connexion problem", notary)
            return
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

    except Exception as e:
        print("[NOTARIAT_PUBLIC] cannot augment", notary)
        print("Exception", e)
        return


def augment_notary(notary):
    # augment notary data from different sites
    augment_from_notariat_public(notary)


def augment_notaries(notaries_list):
    for notary in notaries_list:
        augment_notary(notary)
        time.sleep(1)


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


clean_r = re.compile('<.*?>')
raw_data, notaries_obj_list = parse_notaries_list()
augment_notaries(notaries_obj_list)
print(notaries_obj_list)
