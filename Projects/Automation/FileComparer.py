#This program accept 2 filename from user and comapre content of both file # if both file contain same content it returns Success otherwise it return Failure
#after creation of file type the following command
#python FileComparer FileName1.txt FileName2.txt


from sys import *
import os
import filecmp

def FileComparer(de,he):
    if filecmp.cmp(de,he) == True:
        print("Success")
    else:
        print("Failure")

def main():
    print("Paras file Comparer"+argv[0])

    if (len(argv) != 3):
        print("Error :Please give the INPUT of file")
        exit()

    if((argv[1] == "-h") or (argv[1] == "-H")):
        print("please type the name of file")
        exit()

    else:
        FileComparer(argv[1],argv[2])

    

if __name__ == "__main__":
    main()