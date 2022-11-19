from bs4 import BeautifulSoup as bs
import requests


def save_notaries_list(download_link):
    if not download_link:
        print("[Error] No download link available for notary list")
        return

    folder_name = 'gov'
    file_name = 'notaries_list.xlsx'
    relative_path = '{}/{}'.format(folder_name, file_name)

    r = requests.get(download_link, verify=False)
    with open(relative_path, 'wb') as f:
        f.write(r.content)
    print("Finished saving notary list to", relative_path)


def get_notary_download_link():
    r = requests.get('https://data.gov.ro/dataset/notari-publici', verify=False)
    html_doc = r.text

    soup = bs(html_doc, 'html.parser')
    # get first resource item from the list (first item is last uploaded)
    resource_item = soup.find(id="dataset-resources").li
    download_link = resource_item.div.ul.find_all('li')[1].a.attrs['href']
    print('Public notary entities download link:', download_link)
    return download_link


download_link = get_notary_download_link()
save_notaries_list(download_link)
