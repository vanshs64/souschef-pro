import openai
import os
from dotenv import load_dotenv
import ast


# Load environment variables from .env file
load_dotenv()

# Initialize OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY")

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
                "Given the following list of instructions, organize them into a nested structure "
                "where steps that can be performed simultaneously or multitasked are grouped together. "
                "Return the result as a nested list structure without any additional words. Here is the input list:\n\n"
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
        return prune(organized_instructions)
    
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
    if response_text.endswith("```"):
        response_text = response_text[:-3]  # Remove '```'
    
    return response_text

def get_organized_instruction(instructions):

    organized = ast.literal_eval(organize_instructions(instructions))

    return organized


# Example usage
if __name__ == "__main__":
    api_key = "your_openai_api_key_here"
    instructions = [
        "Gather all ingredients. Preheat the oven to 375 degrees F (190 degrees C).",
        "Stir flour, baking soda, and baking powder together in a small bowl.",
        "Beat sugar and butter together in a large bowl with an electric mixer until smooth.",
        "Beat in egg and vanilla.",
        "Gradually blend in flour mixture.",
        "Roll dough into walnut-sized balls and place 2 inches apart onto ungreased baking sheets.",
        "Bake in the preheated oven until edges are golden, 8 to 10 minutes. Cool on the baking sheets briefly before removing to a wire rack to cool completely."
    ]
    organized = ast.literal_eval(organize_instructions(instructions))
    print("Organized Instructions:", organized)
    print(type(organized))