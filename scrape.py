import requests # type: ignore
from bs4 import BeautifulSoup as bs # type: ignore

url = "https://tastesbetterfromscratch.com/sticky-toffee-pudding/"
url2 = "https://www.aspicyperspective.com/best-hamburger-patty-recipe/"

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36"
}
# url = input("URL: ")

# Step 1: Send a GET request to fetch the raw HTML
response = requests.get(url2, headers=headers)
if response.status_code == 200:
    print("Page fetched successfully!")
else:
    print(f"Failed to fetch the page: {response.status_code}")
    exit()


# Step 2: Parse the HTML using BeautifulSoup
soup = bs(response.text, 'html.parser').get_text()

# Extract specific elements
# title = soup.find('div', class_='recipe-title')
# ingredients = [li.get_text(strip=True) for li in soup.select('.ingredients li')]
# instructions = [p.get_text(strip=True) for p in soup.select('.instructions p')]


# Display the results
# print(type(soup.prettify()))

# Write the HTML to a file with utf-8 encoding
with open("website.txt", "w", encoding="utf-8") as f:
    f.write(soup)  # Save prettified HTML to the file
    f.write("\nWritten to the file.")

print("done")