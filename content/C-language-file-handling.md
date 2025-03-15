---
title: " C language file handling"
date: "2025-02-03"
excerpt: "This blog contains about c language file handling basic concept"
slug: "C-language-file-handling"
category : "C-language"
---

The random-access memory is volatile, and its content is lost once the program
terminates. In order to persist the data forever we use files.
A file is data stored in a storage device.
A C program can talk to the file by reading content from it and writing content to it.

## FILE POINTER
A “FILE” is a structure which needs to be created for opening the file.
A file pointer is a pointer to this structure of the file.
(FILE pointer is needed for communication between the file and the program).
A FILE pointer can be created as follows:
```c
FILE *ptr;
ptr = fopen("filename.ext", "mode");
```

## FILE OPENING MODES IN C
C offers the programmers to select a mode for opening a file.
Following modes are primarily used in C File I/O.
- "r" -> open for reading
- "rb" -> open for reading in binary
- "w" -> open for writing // If the file exists, the contents will be overwritten
- "wb" -> open for writing in binary
- "a" -> open for append // If the file does not exist, it will be created

## TYPES OF FILES
Primarily, there are two types of files:
1. Text files (.txt, .c)
2. Binary files (.jpg, .dat)

## READING A FILE
A file can be opened for reading as follows:
```c
FILE *ptr;
ptr = fopen("harry.txt", "r");
int num;
```
Let us assume that "harry.txt" contains an integer we can read that integer using:
```c
fscanf(ptr, "%d", &num); // fscanf is file counterpart of scanf
```
This will read an integer from file into the `num` variable.

### Quick Quiz:
Modify the program above to check whether the file exists or not before opening the file.

## CLOSING THE FILE
It is very important to close the file after read or write. This is achieved using `fclose` as follows:
```c
fclose(ptr);
```
This will tell the compiler that we are done working with this file and the associated resources could be freed.

## WRITE TO A FILE
We can write to a file in a very similar manner like we read the file:
```c
FILE *fptr;
fptr = fopen("harry.txt", "w");
int num = 432;
fprintf(fptr, "%d", num);
fclose(fptr);
```

## FGETC() AND FPUTC()
`fgetc` and `fputc` are used to read and write a character from / to a file.
```c
fgetc(ptr); // used to read a character from file
fputc('c', ptr); // used to write character 'c' to the file
```

## EOF : END OF FILE
`fgetc` returns EOF when all the characters from a file have been read. So, we can write a check like below to detect end of file:
```c
while(1)
{
    ch = fgetc(ptr); // when all the content of a file has been read, break the loop!
    if (ch == EOF)
    {
        break;
    }
    // code
}
```

