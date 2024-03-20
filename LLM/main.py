from openai import OpenAI

#add api key
client = OpenAI()

# Optimized prompt
prompt = "Your task is to preprocess a user query for the custom Coding Assistant. Focus on ensuring clarity, relevance, and programming-related topics. Remove noise, clarify ambiguous terms, and identify key concepts. Optimize the user query for effective assistance. Only output the preprocessed user query."

# User query to be categorized
user_query = "What is an array and give pseudocode?"

# Requesting completion with user query and optimized prompt
completion = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": prompt},
        {"role": "user", "content": f"User query: {user_query}"}
    ]
)

# Extracting preprocessed user query
preprocessed_query = completion.choices[0].message.content

# Categorizing preprocessed query into one of the four categories
categorization_completion = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": "Your task is to categorize the User query into one of the 4 categories:\
                                       1. Problem Definition\
                                       2. Concept Explanation\
                                       3. Step-by-step guidance with Pseudocode\
                                       4. Code visualization"},
        {"role": "user", "content": f"User query: {preprocessed_query}"}
    ],
)

# Extracting category
category = categorization_completion.choices[0].message.content

print("Preprocessed User Query:", preprocessed_query)
print("Category:", category)
