import requests
from time import sleep
from bs4 import BeautifulSoup


class Scraper:
    links = []
    names = []

    def get_url(self, url):
        url = requests.get(url)
        self.soup = BeautifulSoup(url.content, 'html.parser')

    def print_info(self, url):
        self.get_url(url)
        if self.soup.find('span', class_='subtext').text.strip()[0] == '0':
            print(f'No recipes found for {url}')
            return
        results = self.soup.find('section', id='fixedGridSection')
        articles = results.find_all('article')
        texts = []
        for article in articles:
            txt = article.find('h3', class_='fixed-recipe-card__h3')
            if txt:
                if len(texts) < 5:
                    texts.append(txt)
                else:
                    break
        self.links = [txt.a['href'] for txt in texts]
        self.names = [txt.a.span.text for txt in texts]
        self.get_data()

    def get_data(self):
        for i, link in enumerate(self.links):
            self.get_url(link)
            print('-' * 4 + self.names[i] + '-' * 4)
            info_names = [div.text.strip() for div in self.soup.find_all(
                'div', class_='recipe-meta-item-header')]
            ingredient_spans = self.soup.find_all('span', class_='ingredients-item-name')
            ingredients = [span.text.strip() for span in ingredient_spans]
            for i, div in enumerate(self.soup.find_all('div', class_='recipe-meta-item-body')):
                print(info_names[i].capitalize(), div.text.strip())
            print()
            print('Ingredients'.center(len(ingredients[0]), ' '))
            print('\n'.join(ingredients))
            print()
            print('*' * 50, end='\n\n')


chrome = Scraper()
chrome.print_info(input())