from flask import Flask, request, jsonify
from flask_cors import CORS

from recipe import get_recipe
from interpret import get_organized_instructions

app = Flask(__name__)
CORS(app)  # Allow requests from frontend (localhost:3000)

# Example recipe URL
website = "https://www.allrecipes.com/recipe/45040/pav-bhaji/"

test_recipe = {
    "title": 'Palak Paneer Recipe (Spinach Paneer)',
    "total_time": 45,
    "yields": '2 servings',
    "ingredients": [
      '150 grams (1¼ cups) paneer (Indian cottage cheese)',
      '3½ to 4 cups (100 to 120 grams) palak (spinach)',
      '2 tablespoons oil (or half oil & half butter)',
      '2 green chilies (deseeded, less spicy kind)',
      '¾ cup (90 grams, 1 small) onions (fine chopped)',
      '½ cup (1 small) tomatoes (deseeded & chopped or pureed)',
      '¾ teaspoon ginger garlic paste (read notes for substitute)',
      '½ teaspoon salt (use as per your taste)',
      '8 to 10 cashewnuts (read notes for substitutes)',
      '½ to ¾ teaspoon garam masala (adjust to taste)',
      "½ teaspoon kasuri methi (dried fenugreek leaves, skip if you don't have)",
      '¼ cup water (to blend spinach)',
      '¾ cup water (to cook the gravy)',
      '3 tablespoons cream (optional)',
      '⅛ teaspoon cumin seeds (jeera, optional)',
      '2 green cardamoms (elaichi, optional)',
      '1 inch cinnamon (dalchini, optional)',
      '2 cloves (laung, optional)'
    ],
    "instructions": [
      [
        'Preparation',
        [
          'Pluck only the young & tender spinach leaves and discard the stems as they may leave a bitter taste. If using baby spinach you can use the stems as well.',
          'Add them to a large pot of water. Rinse them well few times & drain to a colander.',
          'Allow the water to drain completely otherwise it will let out lot of moisture while cooking.'
        ]
      ],
      [
        'Cooking Spinach',
        [
          [
            'Heat half tablespoon oil in a pan. Saute green chilies, cashews and spinach for 3 to 4 mins until the leaves wilt off thoroughly & raw smell of spinach has gone away.',
            'Cool this completely. Blend this along with water to a smooth puree. The puree should be smooth and thick. You may add 1 to 2 tbsps more water to help in blending.'
          ],
          [
            'Another option is to blanch the palak in 4 cups of hot water with ¼ tsp salt for 2 mins. Then immerse in ice cold water. Drain completely.',
            'Cool this completely. Blend this along with water to a smooth puree. The puree should be smooth and thick. You may add 1 to 2 tbsps more water to help in blending.'
          ]
        ]
      ],
      [
        'Making Palak Paneer',
        [
          'Heat 1 tablespoon butter and half tablespoon oil to the same pan, Once they melt, add cinnamon, cardamoms, cloves & cumin seeds.',
          'When the spices begin to sizzle, add onions and fry till they turn transparent to golden.',
          'Next saute ginger garlic paste for 1 to 2 minutes or until you begin to smell it nice.',
          'Then add tomatoes with salt. Saute until they break down and turn mushy.',
          'Add garam masala & saute until the masala smells good. This may take 2 mins.',
          'Pour water and cook covered until onions are completely soft. There should be some water left in the pan.',
          'Lower the flame, add kasuri methi and pureed spinach. Mix well and cook until it begins to bubble for about 2 to 3 mins. If the curry is too thick you may add a few tbsps of hot water.',
          'Avoid overcooking. Add paneer & mix well. Turn off and remove to a serving bowl. Optionally garnish with cream.'
        ]
      ],
      [
        'Serving',
        [
          'Serve palak paneer with naan, roti, Basmati rice or Jeera rice.'
        ]
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