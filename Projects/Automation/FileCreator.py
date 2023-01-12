#this program accept file name from user and copy all content from existing file into a new file
#after creation of file type the following command
#python FileCreator FileName.txt
from sys import *
import os

def FileCopy(fi):
    if os.path.exists(fi) ==True:
        print("file already exist")
        fd2 = open(fi,"r+")
        fd3 = open("ABC.txt","r")
        fd2.write(str(fd3.read()))
        fd3.close()
        fd2.close()
        
       
    else:
        print("file does not exist")

        fd = open(fi,"w")
        fd1= open("ABC.txt","r")
        fd.write(str(fd1.read()))
        fd1.close()
        fd.close()



def main():
    print("Paras file Creator"+argv[0])

    if (len(argv) != 2):
        print("Error :Please give the name of file")
        exit()

    if((argv[1] == "-h") or (argv[1] == "-H")):
        print("please type the name of file")
        exit()

    else:
        FileCopy(argv[1])

    

if __name__ == "__main__":
    main()