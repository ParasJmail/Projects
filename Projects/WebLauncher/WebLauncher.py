#2 files ko ek folder mein download karke ye command type kar
#python WebLauncher.py weblist.txt

from sys import *
import webbrowser
import re
import urllib.request
import urllib.error


def is_connected():
    try:
        urllib.request.urlopen("https://www.google.com/",timeout = 1)
        return True
    except urllib.request.URLError as err:
        return False

def Find(string):
    url = re.findall("https[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\(\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+",string)
    return url

def WebLauncher(path):
    with open(path) as fp:
        for line in fp:
            print(line)
            url = Find(line)
            print(url)
            for str in url:
                webbrowser.open(str, new=2)

def main():
    print("Application By Paras Jaitly")

    print("Application name : "+argv[0])

    if len(argv) != 2:
        print("Error: Invalid number of input")
        exit()

    if (argv[1] == "-h") or (argv[1] == "-H"):
        print("This Script is used open URL which are written in one file")
        exit()

    if (argv[1] == "-u") or (argv[1] == "-U"):
        print("Usage :Application Name_Of_File")
        exit()

    try:
        connected = is_connected()

        if connected:
            WebLauncher(argv[1])
        else:
            print("Unable to connect to internet")

    except ValueError:
        print("Error :Invalid datatype of input")

    except Exception as E:
        print("Error :Invalid Input",E)

if __name__ == "__main__":
    main()
         