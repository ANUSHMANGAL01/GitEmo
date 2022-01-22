from transformers import pipeline
import sys
import ast
import json
classifier = pipeline("zero-shot-classification", device=0)
candidate_labels = ["anger", "fear", "joy", "sadness", "surprise" , "confidence", "confused", "worried", "praise", "mistake"]

input = ast.literal_eval(sys.argv[1])
output =[]

for text in input:
    text_result = classifier(text, candidate_labels)
    output.append(text_result["labels"][0])
    output.append(text_result["labels"][1])

print(json.dumps(output))
sys.stdout.flush() 

# print(type(classifier(text, candidate_labels)))
