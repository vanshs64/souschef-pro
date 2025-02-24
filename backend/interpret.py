import openai
import os
from dotenv import load_dotenv
import ast

from recipe import get_recipe


# Load environment variables from .env file
load_dotenv()

# Initialize OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY")

## ERROR HERE ^^ dk why it isn't getting the api key unless explicitly passed

def organize_instructions(instructions):
    """
    Sends a list of instructions to OpenAI's API to organize them into a nested structure
    based on tasks that can be multitasked or grouped together.

    Args:
        api_key (str): OpenAI API key for authentication.
        instructions (list): A list of instruction strings to organize.

    Returns:
        list: A nested list of organized instructions.
    """

        # Prepare the messages for the ChatGPT model
    messages = [
        {"role": "system", "content": "You are an assistant that organizes instructions."},
        {
            "role": "user",
            "content": (
                "Given the following recipe instructions, restructure them into a structured array where:"
                "Each step has a header as the first item, which should be a **short descriptive title** summarizing those steps."
                "The second and final item of each step will be a list/array containing the actual instructions (which could be multiple)."
                "If a step has multiple alternative ways of preparation (e.g., 'OR' options), these should be grouped under the same header as separate instruction entries."
                "Also group steps that can be performed simultaneously or multitasked together."
                "Include a 'header' within the list structure for each group of steps to describe the step in a few words so that the user can understand the the following steps before reading so much text."
                "For example, this is what the structure must look like.\n\n"
                """

                [
                    [
                        "Prepare Ingredients",
                        [
                        "Start with ...",
                        "Do this", 
                        "Step 3"
                        ]
                    ],
                    [
                        "Rest the Dough",
                        [
                        "Step 4" will start to discolor."
                        "Step 5",
                        ]
                    ],
                    [
                        "Roll Out the Dough",
                        "Step 6",
                        "For tagliatelle here is step 7."
                    ],
                    [
                        "Store or Cook the Pasta",
                        [
                        "At this point you can cook the pasta immediately, dry it, refrigerate it, or freeze it."
                        ]
                    ],
                    [
                        "Cook the Tagliatelle",
                        [
                        "Bring a large pot of salted water to a boil. Cook the pasta for 2-3 minutes, or until tender. Drain, reserving 3/4 cup of the pasta water in case you need any for serving.",
                        "Serve in any of the ways suggested above and enjoy immediately."
                        ]
                    ]
                ]

                """
                "Return the result as a nested list structure without any additional words or notation. Here is the input you should fill the structure's content with:\n\n"
                f"Here are the instructions: \n\n {instructions}"
            ),
        },
    ]


    try:
        response = openai.chat.completions.create(
            model = "gpt-4o",
            messages = messages,
            temperature = 0.7
        )
        # Parse the response text to extract the organized list
        organized_instructions = response.choices[0].message.content
        # print(organized_instructions)
        return organized_instructions
    
    except Exception as e:
        print(f"An error occurred: {e}")
        return None

def prune(response_text):
    """
    Prunes the response text by removing '```py', '```python', '```json', '```plaintext' at the beginning
    and '```' at the end if present, and converts the result into a list.

    Args:
        response_text (str): The response text from OpenAI.

    Returns:
        str: The pruned response text.
    """
    if response_text.startswith("```python"):
        response_text = response_text.split("```python")[1]  # Remove the first '```python' block
    if response_text.startswith("```py"):
        response_text = response_text.split("```py")[1]  # Remove the first '```py' block
    elif response_text.startswith("```json"):
        response_text = response_text.split("```json")[1]  # Remove the first '```json' block
    elif response_text.startswith("```plaintext"):
        response_text = response_text.split("```plaintext")[1]  # Remove the first '```plaintext' block

    elif response_text.startswith("```"):
        response_text = response_text.split("```")[1]  # Remove the first '```' block
    if response_text.endswith("```"):
        response_text = response_text.split("```")[0]  # Remove the last '```' block
    
    return response_text

def get_organized_instructions(instructions):

    # take scraped instructions and use AI to organize structure
    organized = organize_instructions(instructions) #

    # prune the delimiters for ``` syntax bs
    pruned_organized = prune(organized)

    # convert the string to a list
    final_organized_instructions_list = ast.literal_eval(pruned_organized)

    # return instructions
    return final_organized_instructions_list


# Example usage
if __name__ == "__main__":
    # Example recipe URL
    url = "https://tastesbetterfromscratch.com/sticky-toffee-pudding/"
    recipe = get_recipe(url)
    
    if not recipe:
        instructions = recipe["instructions"]

        print(f"{instructions}\n\n\n")

        organized = get_organized_instructions(instructions)

        print(f"{organized}\n\n\n")

        pruned_organized = prune(organized)

        print(f"{pruned_organized}\n\n\n")    

        recipe["instructions"] = pruned_organized

        print(type(recipe))
    