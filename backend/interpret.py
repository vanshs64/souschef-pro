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
                "Given the following list of recipe instructions, organize them into a nested structure "
                "where steps that can be performed simultaneously or multitasked are grouped together. "
                "Return the result as a nested list structure without any additional words or notation. Here is the input list:\n\n"
                f"{instructions}\n\nOrganized instructions:"
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
        print(organized_instructions)
        return organized_instructions
    
    except Exception as e:
        print(f"An error occurred: {e}")
        return None

def prune(response_text):
    """
    Prunes the response text by removing '```py' at the beginning and '```' at the end if present,
    and converts the result into a list.

    Args:
        response_text (str): The response text from OpenAI.

    Returns:
        list: The pruned and converted list of instructions.
    """
    if response_text.startswith("```py"):
        response_text = response_text[5:]  # Remove '```py\n'
    if response_text.startswith("```python"):
        response_text = response_text[9:]  # Remove '```py\n'
    if response_text.startswish("```plaintext"):
        response_text = response_text[12:]  # Remove '```plaintext\n'

    if response_text.endswith("```"):
        response_text = response_text[:-3]  # Remove '```'
    
    return response_text

def get_organized_instructions(instructions):
    # converts the already organized instructions (from a string) to a literal array (list)
    organized = ast.literal_eval(organize_instructions(instructions))

    return organized


# Example usage
if __name__ == "__main__":
    # Example recipe URL
    url = "https://www.allrecipes.com/recipe/45040/pav-bhaji/"
    instructions = get_recipe(url)["instructions"]
    organized = ast.literal_eval(organize_instructions(instructions))
    print("Organized Instructions:", organized)
    print(type(organized))

    