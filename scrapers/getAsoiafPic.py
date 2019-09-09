#!/bin/env python3
#  coding : utf-8

import os
import re
import csv
import requests
import urllib.request
import urllib3
from urllib.parse import urljoin
from scrapy.selector import Selector


import json

def nameToSuffix(name):
    name = name.replace("-", " ")
    return name.replace(" ", "_")



def parse(name):
    headers = {
            'User-Agent': 'Dalvik/2.1.0 (Linux; U; Android 5.1.1; SM-G955F Build/JLS36C)',
            'Connection': 'close',
        }
    #First phase
    url = prefix_url + "/" + index_url + "/" + nameToSuffix(name)
    response = requests.get(url, headers = headers, verify = False).text
    picNames = Selector(text = response).xpath('//img/@alt').getall()

    wantedPic = "This is a placeholder"

    #Get the pics and skip the sigils
    if(len(picNames) > 2):
        count = 0
        while("svg" in picNames[count]):
            count += 1
        wantedPic = picNames[count].replace(" ", "_")
    else:
        print(name + ": no image for this dude")
        return "no image"

    #Second phase
    advanced_image = Selector(text = response).xpath('//a[contains(@href, "' + wantedPic +'")]/@href').get()

    if(advanced_image == None):
        print(name + ": no image for this dude")
        return "no image"
    else:
        advanced_url = prefix_url  + advanced_image 
        response = requests.get(advanced_url, headers = headers, verify = False).text

        #Third phase
        wantedPic = "^/images.*" + wantedPic
        final_image = Selector(text = response).xpath('//a[re:match(@href, "' + wantedPic +'")]/@href').get()

        final_url = prefix_url + final_image
        print(name + ": " + final_url)
        return final_url


        # opener = urllib.request.build_opener()
        # opener.addheaders = [('User-Agent', 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.6 (KHTML, like Gecko) Chrome/36.0.1941.0 Safari/537.36')]
        # urllib.request.install_opener(opener)
        
        # indexOfDot = final_url.rfind(".")
        # suffix = final_url[indexOfDot:]
        # urllib.request.urlretrieve(final_url, "GOT pics/" + name + suffix)



urllib3.disable_warnings()

prefix_url = "https://awoiaf.westeros.org"
index_url = "index.php"
# with open('results.txt', "w") as file:
#     with open('asoiaf/data/asoiaf-all-nodes.csv', newline = '') as csvfile:
#         reader = csv.DictReader(csvfile)
#         for row in reader:
#             name = row['Label']
#             # print(name)
#             # parse(name)
#             file.write(name + ": " + parse(name) + '\n')

with open('characterId.1.json', 'r+') as f:
    data = json.load(f)
    characterArray = data['data']

    for i in range(0, len(characterArray)):
        name = characterArray[i]['top']
        image_url = parse(name)
        data['data'][i]['image_url'] = image_url
        
    f.seek(0)
    json.dump(data, f, indent = 4)
    f.truncate()
