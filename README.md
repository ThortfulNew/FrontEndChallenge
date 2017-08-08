# FrontEndChallenge

### Live in https://front-end-challenge.herokuapp.com/

## To run locally

### Client folder

Run this commands:

* npm install
* bower install
* gulp

### Server folder

Run this commands:

* npm install
* node app
* go to http://localhost:3000

## Usage

* Open the site
* Write a repository name in the input field
* Press enter or click the button
* Now you will see a list with the found repositories:
    1) You can open the repository in a new tab
    2) You can view the issues in the current page
    3) You can open the owner's github page in a new tab
    3) You can go to the next page (if there are more repositories matching the search)
* In the issues view:
    1) You can see their state
    2) You can open their github page in a new tab
    3) You can also open the assignee's profile in a new tab
    4) You can go to the next page, as with the repositories


## Technologies

### Front-end

* AngularJS to create most of the logic.
* Bootstrap to help with the styles.
* Font-awesome for their icons.
* Angular-spinner, self explanatory :)
* AngularJS-Toaster to display error messages. You may not notice it, but if you the github API fails, it will display nice error messages! You can test it by spamming the search 10-15 times.
* Angular-animate for toaster and the animations on repository and issue list load.
* Gulp and its packages to build the project

### Back-end

* Node with Expressjs, a light-weight server. By the way, if you have looked inside server/app.js, that code is more complicated than it should because I was expecting to use angular routes but decided to keep it lighter at the end.

## Comments

I believe the AngularJS and Gulp code is the most interesting part of this application. Hopefully the UI is decent too! You should have seen the original one... :D

Also, some parts may not follow standards, as I was exploring different approaches.

Please let me know your thoughts and the things you would do differently.
