from bs4 import BeautifulSoup as bs
import requests
import openpyxl
from pathlib import Path


class Notary:
    def __init__(self, name, room, address, city, country):
        self.name = name
        self.room = room
        self.address = address
        self.city = city
        self.country = country


def augment_from_notariat_public(notary):
    url = 'https://notariatpublic.com/rezultate-cautare?cx=partner-pub-5453614192961613%3A1332164919&cof=FORID%3A10&ie=UTF-8&q={}'.format(notary.name.replace(" ", "+"))
    r = requests.get(url, verify=False)
    if r.status_code != 200:
        print("[NOTARIAT_PUBLIC] Conexion problem", notary)
    print(r)


def augment_notary(notary):
    # augment notary data from different sites
    augment_from_notariat_public(notary)


def augment_notaries(notaries_list):
    for notary in notaries_list:
        augment_notary(notary)


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


raw_data, notaries_obj_list = parse_notaries_list()
augment_notaries(notaries_obj_list)