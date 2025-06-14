# Form Assist
## How to
```
git clone https://github.com/kdkchy/form-assist.git
cd form-assist
npm i
cp .env.example .env 
	- setup env write base API URL on VITE_API_URL
npm run dev
```

## Package and Dependencies
```
Typescript v5.8
React v19.1
Material UI v7.1
React Tanstack Query v5.80
Axios v1.9
Redux v9.2
React Hook Form v7.57
Yup Validator v1.6
DayJs v1.11
Tailwind CSS v4.1
```

## What is pointed out
This project is Google Form like project, creator are able to create form and question with option are simple input, textarea, select, radio button, checkbox, and date input. What's unique within the form is, it can restrict the participant to answer regarding their domain of email that registered on the platform. Link of the form are shareable and make other people can easy reach out the form and fill the answer

## Project Directories
```
src
 |--- api
 |--- components
 |--- lib
 |--- pages
 |--- routes
 |--- store
 |--- types
```

### api
Store every request to BE that used on the system, it also sliced into smallest directory and file with single function. Requesting API are using axios and react query

### components
Write usable component that will used around the project, pages, or within this directories itself. Layout of the system is also stored here

### lib
Similar like components but this directories will store function that often used in any pages or component

### pages
Store every page that will be accessed, it slice into different file one file, one page. In this directories also slice smallest component that only used in the directories itself, for example, FormDetail page may have FormCreate that will only used in this directories. Even it called component but because it only used in this directory.

### routes
Every route handling are stored here

### store
Because this project is forced user to access the form using authentication, we need Redux to store token and also need Redux Persist, this will make token will not refreshed even the browser is refreshed

### types
Making sure and predict every data that stored and called all over the page, component and also request response from and to BE, this directories is stored every types of data that used in the entire project