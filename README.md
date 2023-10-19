# Project Study Buddy

## Dependencies

* Ubuntu Linux terminal
* MariaDB with desktop client MySQL Workbench

## Installing

* Open an ubuntu terminal
* Place yourself in the folder you want to download the project/program to
* Clone the GitHub repository to the folder you are placed in with the command below
```
git clone git@github.com:A-Norre/ProjectStudyBuddy.git
```

## Set up
* To initiate the project run the command below and press ENTER on every question
```
npm init
```

* To install the packages run the command below
```
npm install express ejs
```

* Open folder /config
* Inside /config open folder /db 
* Find the file study.json
* Change the content of this file to match and connect to your own database
* To initiate the database run the command below (make sure you are placed in the project folder ProjectStudyBuddy)
```
mariadb --table < sql/study.sql
```

## Starting the program
* To start the program run the command below (make sure you are placed in the project folder ProjectStudyBuddy)
```
node index.js
```
* Copy the following url
http://localhost:1339/study
* Open a browser
* Paste the url in the browser and refresh the browser

## Stopping the program
* To stop the program open your terminal and use the following two keys together
ctrl + c

## Author
Alexander Norrman
