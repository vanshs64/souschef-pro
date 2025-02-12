from flask import Flask, request, jsonify
from flask_cors import CORS

from recipe import get_recipe
from interpret import get_organized_instructions

app = Flask(__name__)
CORS(app)  # Allow requests from frontend (localhost:3000)

# Example recipe URL
website = "https://www.allrecipes.com/recipe/45040/pav-bhaji/"

test_recipe = {
    'title': 'Pav Bhaji',
    'total_time': 50,
    'yields': '4 servings',
    'ingredients': [
        '½ cup vegetable oil',
        '2 teaspoons chopped garlic',
        '1 teaspoon finely chopped green chile peppers',
        '1 cup chopped onions',
        '2 teaspoons grated fresh ginger',
        '1 cup chopped roma (plum) tomatoes',
        '2 cups cauliflower, finely chopped',
        '1 cup chopped cabbage',
        '1 cup green peas',
        '1 cup grated carrots',
        '4 potatoes, boiled and mashed',
        '3 tablespoons pav bhaji masala',
        'salt to taste',
        '1 tablespoon lemon juice',
        '8 (2 inch square) dinner rolls',
        '½ tablespoon butter',
        '¼ cup finely chopped onion',
        '1 tablespoon finely chopped green chile peppers',
        '¼ cup chopped fresh cilantro'
    ],
    'instructions': [
        [
            "Heat the oil in a wok over medium heat.",
            "Saute garlic and green chile for 30 seconds, then stir in onions and ginger.",
            "Cook until onions are brown.",
            "Add tomatoes, and cook until pasty.",
            "Stir in cauliflower, cabbage, peas, carrots and potatoes.",
            "Season with pav bhaji masala.",
            "Cover, and cook for 15 minutes, stirring occasionally.",
            "Season with salt, and stir in lemon juice."
        ],
        [
            "Toast the dinner rolls, and spread lightly with butter.",
            "Serve garnished with chopped onion, green chile and cilantro."
        ]
    ]
}

# CHANGE THIS TO SCRAPED_RECIPE DICTIONARY, RIGHTNOW WE'RE RETURNING THE TEST_RECIPE DICTIONARY TO AVOID MAKING EXTRA API CALLS
@app.route('/scrape_recipe', methods=['POST'])
def scrape_recipe():
    return test_recipe
    data = request.get_json() # take the "body" of the fetch request from App.tsx
    
    url = data.get('url', website)

    scraped_recipe = get_recipe(url)

    organized_instructions = get_organized_instructions(scraped_recipe["instructions"])
    
    scraped_recipe["instructions"] = organized_instructions # Update the organized instructions to the scraped recipe

    return scraped_recipe

if __name__ == "__main__":
    app.run(debug=True)