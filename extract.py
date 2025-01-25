import os
from openai import OpenAI

client = OpenAI(
    api_key=""  # This is the default and can be omitted
)

website_html = open('website.txt','r', encoding='utf-8').read()


completion = client.chat.completions.create(
  model="gpt-4o-mini",
  messages=[
    {"role": "user", "content": f"Can you read this Recipe HTML file and extract in easy to read formatting  1. Title, 2. Ingredients, 3. Instructions, and 4. Notes on the recipe? {website_html}"},
  ]
)

print(completion.choices[0].message.content)
print(type(completion.choices[0].message.content))

