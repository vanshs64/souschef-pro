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
        
        recipe_dict["title"] = scraper.title()
        recipe_dict["total_time"] = scraper.total_time()
        recipe_dict["yields"] = scraper.yields()
        recipe_dict["ingredients"] = scraper.ingredients()
        recipe_dict["instructions"] = scraper.instructions().split('\n')

        # Write the HTML to a file with utf-8 encoding for testing viewing
        with open("recipe.txt", "w", encoding="utf-8") as f:
            f.write(scraper.title())          # "Spinach and Feta Turkey Burgers"
            f.write(str(scraper.total_time()))     # 35
            f.write(scraper.yields())
            f.writelines(scraper.ingredients())
            f.write(scraper.instructions())
            f.write("\n\nWritten to the file.")
        
        return recipe_dict

    # use "help(scraper)" to see all the available methods
    except HTTPError as e:
        if e.code == 403:
            print(f"HTTP Error 403: Forbidden - Access to {url} is denied.")
            return None
        else:
            print(f"HTTP Error {e.code}: {e.reason}")
            return None


if __name__ == "__main__":
    # Example recipe URL
    url = "https://www.indianhealthyrecipes.com/palak-paneer-recipe-easy-paneer-recipes-step-by-step-pics/"
    recipe = get_recipe(url)
    print(recipe)
    if recipe is None:
        print("Recipe unable to be scraped.")
    else:
        print("Recipe scraped successfully.")