# Blog Front-End
The code for the back-end of this website is available [here](https://github.com/duncanp781/blog-api).

This project is a full-stack blogging site. 
It allows users to create and edit posts in markdown (using react-md-editor and react-markdown) as well as view and reply to other user's posts.
The front end of the website was made using React, using Material-UI and styled components for the design.
The back end is a REST api made with Node.js and Express, using JSON Web Tokens with bcrypt for authentication. 
# Installation 
To run this project locally, follow these steps:
1. Clone the repository using 
```
    git clone https://github.com/duncanp781/blog-frontend
``` 
2. When in the project directory, install the dependencies using 
```
    npm install
```
3. Start the development server using
```
    npm run start
```
which will start the development server on the localhost. I recommend starting the api before this to avoid port conflicts. 