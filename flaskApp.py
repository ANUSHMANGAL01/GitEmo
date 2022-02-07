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

    # data_received = (request.form["data"]
    data_received = request.data
    # print(type(data_received))
    json_data = json.loads(data_received)
    # print(json_data)
    # print(type(json_data))
    
    list = []
    for ele in json_data:
        if(len(ele["test"]) >20):
            list.append(ele["test"])
    # print(list)  
    ans =  sentiment_func(list)
    # print("Hello")
    # print(ans)
    return ans
    # return "Hello"




if(__name__ == "__main__"):
    app.run(debug= True)