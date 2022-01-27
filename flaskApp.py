from flask import Flask, flash, request, redirect, url_for
import sys
import ast
import json
from sentiments import sentiment_func
app = Flask(__name__)
@app.route('/', methods = ['POST'])
def index():

    # data_received = (request.form["data"]
    data_received = request.data
    json_data = json.loads(data_received)
    print(json_data)
    list = []
    for ele in json_data:
        list.append(ele['test'])
    # print(list)    
    return sentiment_func(list)




if(__name__ == "__main__"):
    app.run(debug= True)