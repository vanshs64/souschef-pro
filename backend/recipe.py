from urllib.request import urlopen
from urllib.error import HTTPError
from recipe_scrapers import scrape_html


def get_recipe(url):

    recipe_dict = {
        "title": "",
        "total_time": 0,
        "yields": "",
        "ingredients": [],
        "instructions": ""
    }

    try:
        # retrieve the recipe webpage HTML
        html = urlopen(url).read().decode("utf-8")

        # pass the html alongside the url to our scrape_html function
        scraper = scrape_html(html, org_url=url)
        
        # COMMENT THIS "WITH OPEN" ONCE YOU INTEGRATE THIS FUNCTION INTO YOUR SERVER

        # Write the HTML to a file with utf-8 encoding
        with open("recipe.txt", "w", encoding="utf-8") as f:
            f.write(scraper.title())          # "Spinach and Feta Turkey Burgers"
            f.write(str(scraper.total_time()))     # 35
            f.write(scraper.yields())
            f.writelines(scraper.ingredients())
            f.write(scraper.instructions())
            f.write("\nWritten to the file.")

        recipe_dict["title"] = scraper.title()
        recipe_dict["total_time"] = scraper.total_time()
        recipe_dict["yields"] = scraper.yields()
        recipe_dict["ingredients"] = scraper.ingredients()
        recipe_dict["instructions"] = scraper.instructions().split('\n')

        return recipe_dict

    # use "help(scraper)" to see all the available methods
    except HTTPError as e:
        if e.code == 403:
            print(f"HTTP Error 403: Forbidden - Access to {url} is denied.")
        else:
            print(f"HTTP Error {e.code}: {e.reason}")


if __name__ == "__main__":
    # Example recipe URL
    url = "https://www.allrecipes.com/recipe/9870/easy-sugar-cookies"
    get_recipe(url)
    print("Recipe scraped successfully.")