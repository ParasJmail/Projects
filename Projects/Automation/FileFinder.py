#This program is an automatic script which accept directory name and file extension from user . Display all file extension with that extension
#after creation of file type the following command
#python FileFinder.py FileName.txt


from sys import *
import os


def Direct(Dire,Name):
    print("Inside direct function")
    paths = os.path.dirname(Dire)
    print(paths)
    NameOfFile = [ f for f in os.listdir(Dire) if f.endswith(str(Name))]
    print(NameOfFile)
    

def main():

    print("automatic script which accept directory name and file extension from user . Display all file extension with that extension"+argv[0])

    if (len(argv) != 3):
        print("Please enter Directory name and file extension")
        exit()

    elif ((argv[1] == "-h") or (argv[1] == "-H")):
        print("Enter the name and extension")
        exit()

    else:
        Direct(argv[1],argv[2])

if __name__ == "__main__":
    main()