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




def nameToSuffix(name):
    return name.replace(" ", "_")




urllib3.disable_warnings()

prefix_url = "https://awoiaf.westeros.org"
index_url = "index.php"

name = "Robb Stark" 

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
if(len(picNames) > 0):
    count = 0
    while("svg" in picNames[count]):
        count += 1
    wantedPic = picNames[count].replace(" ", "_")
else:
    print(name + ": no image for this dudeeee")
print(wantedPic)
#Second phase
advanced_image = Selector(text = response).xpath('//a[contains(@href, "' + wantedPic +'")]/@href').get()

if(advanced_image == None):
    print(name + ": no image for this dude")
else:
    advanced_url = prefix_url  + advanced_image 
    response = requests.get(advanced_url, headers = headers, verify = False).text

    #Third phase
    wantedPic = "^/images.*" + wantedPic
    print("wanted : " + wantedPic)
    final_image = Selector(text = response).xpath('//a[re:match(@href, "' + wantedPic +'")]/@href').get()

    print(prefix_url)
    print(final_image)
    final_url = prefix_url + final_image
    print(name + ": " + final_url)



    opener = urllib.request.build_opener()
    opener.addheaders = [('User-Agent', 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.6 (KHTML, like Gecko) Chrome/36.0.1941.0 Safari/537.36')]
    urllib.request.install_opener(opener)

    indexOfDot = final_url.rfind(".")
    suffix = final_url[indexOfDot:]
    urllib.request.urlretrieve(final_url, name + suffix)




