from transformers import pipeline
import sys
import ast
import json
classifier = pipeline("zero-shot-classification", device=0)


def sentiment_func(input_list):
    candidate_labels = ["anger", "fear", "joy", "sadness", "surprise" , "confidence", "confused", "worried", "praise", "mistake"]
    output=[]
    for text in input_list:
        text_result = classifier(text, candidate_labels)
        output.append(text_result["labels"][0])
        output.append(text_result["labels"][1])
        
    return json.dumps(output)

if(__name__ =='__main__'):
    sentiment_func([
  "I am angry",
  "I am happy",
  "I am sad",
  "I hate you",
  "Your work is amazing",
  "I am sorry",
  "I messed it up",
])
# print(type(classifier(text, candidate_labels)))
