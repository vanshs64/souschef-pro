from flask import Flask, request, jsonify
from flask_cors import CORS

from recipe import get_recipe
from interpret import get_organized_instructions

app = Flask(__name__)
CORS(app)  # Allow requests from frontend (localhost:3000)

# Example recipe URL
website = "https://www.allrecipes.com/recipe/45040/pav-bhaji/"


@app.route('/scrape_recipe', methods=['POST'])
def scrape_recipe():
    data = request.get_json() # take the "body" of the fetch request from App.tsx
    
    url = data.get('url', website)

    scraped_recipe = get_recipe(url)

    organized_instructions = get_organized_instructions(scraped_recipe["instructions"])
    
    scraped_recipe["instructions"] = organized_instructions # Update the organized instructions to the scraped recipe

    return scraped_recipe


if __name__ == "__main__":
    app.run(debug=True)