from bs4 import BeautifulSoup as bs
import requests
import urllib3

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)


def save_list(download_link, folder_name, file_name):
    if not download_link:
        print("[Error] No download link available for notary list")
        return

    relative_path = '{}/{}'.format(folder_name, file_name)

    r = requests.get(download_link, verify=False)
    with open(relative_path, 'wb') as f:
        f.write(r.content)
    print("Finished saving list to", relative_path)


def get_download_link(link):
    r = requests.get(link, verify=False)
    html_doc = r.text

    soup = bs(html_doc, 'html.parser')
    # get first resource item from the list (first item is last uploaded)
    resource_item = soup.find(id="dataset-resources").li
    download_link = resource_item.div.ul.find_all('li')[1].a.attrs['href']
    print('Download link:', download_link)
    return download_link


download_link = get_download_link('https://data.gov.ro/dataset/notari-publici')
save_list(download_link, 'gov', 'notaries_list.xlsx')

download_link = get_download_link('https://data.gov.ro/dataset/traducatori-si-interpreti')
save_list(download_link, 'gov', 'translators_list.xlsx')
