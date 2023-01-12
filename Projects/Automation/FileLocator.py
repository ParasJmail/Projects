#this program accept file name from user and check whether that file exist in current directory or not
#after creation of file type the following command
#python FileLocator.py FileName.txt

from sys import *
import os

def fileLocator(fi):
    if os.path.exists(fi) ==True:
        print("file exist")
    else:
        print("file does not exist")

def main():
    print("Paras file locator"+argv[0])

    if (len(argv) != 2):
        print("Error :Please give the name of file")
        exit()

    if((argv[1] == "-h") or (argv[1] == "-H")):
        print("please type the name of file")
        exit()

    else:
        fileLocator(argv[1])

    

if __name__ == "__main__":
    main()