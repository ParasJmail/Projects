#this program accept file from user and open that file and display the content of the file
#after creation of file type the following command
#python FileReader.py FileName.txt

from sys import *
import os

def FileReader(fi):
    if os.path.exists(fi) ==True:
        print("file exist")
        print("Contents of",fi,"are")
        fd = open(fi,"r")
        print(fd.read())
        fd.close()
    else:
        print("file does not exist")
    


def main():
    print("Paras file opener "+argv[0])

    if (len(argv) != 2):
        print("Error :Please give the name of file")
        exit()

    if((argv[1] == "-h") or (argv[1] == "-H")):
        print("please type the name of file")
        exit()

    else:
        FileReader(argv[1])

    

if __name__ == "__main__":
    main()