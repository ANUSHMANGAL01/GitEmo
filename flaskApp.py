from flask import Flask, flash, request, redirect, url_for
from flask_cors import CORS
import json
from transformers import pipeline
classifier = pipeline("zero-shot-classification", device=0)

# from sentiments import sentiment_func
app = Flask(__name__)
CORS(app)
@app.route('/', methods = ['POST'])

def index():

    
    data_received = request.data
   
    json_data = json.loads(data_received)
    
    
    list = []
    for ele in json_data:
       list.append(ele["test"])
     
    ans =  sentiment_func(list)
    
    return ans
    

def sentiment_func(input_list):
    candidate_labels = ["anger", "fear", "joy", "sadness", "surprise" , "confidence", "confused", "worried", "praise", "mistake"]
    output=[]
    for text in input_list:
        text_result = classifier(text, candidate_labels)
        output.append(text_result["labels"][0])
        output.append(text_result["labels"][1])
        
    return json.dumps(output)


if(__name__ == "__main__"):
    app.run(debug= True)