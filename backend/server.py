from flask import Flask, request, jsonify
from flask_cors import CORS
from recipe import get_recipe

app = Flask(__name__)
CORS(app)  # Allow requests from frontend (localhost:3000)

# Example recipe URL
website = "https://www.allrecipes.com/recipe/9870/easy-sugar-cookies"


@app.route('/scrape_recipe', methods=['GET'])
def scrape_recipe(url = website):
    scraped_recipe = get_recipe(url)
    return jsonify(scraped_recipe)


if __name__ == "__main__":
    app.run(debug=True)