from flask import Flask, flash, request, redirect, url_for
from flask_cors import CORS
import sys
import ast
import json
from sentiments import sentiment_func
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
    




if(__name__ == "__main__"):
    app.run(debug= True)