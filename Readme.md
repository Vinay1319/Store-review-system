Store Rating System

Overview

The Store Rating System is a web application that allows users to rate and review stores. It includes an admin panel for managing stores, users, and ratings.

Screenshots

Admin Pages:
![Admin DashBoard1](screenshots/Screenshot%20(135).png)
![Admin DashBoard2](screenshots/Screenshot%20(136).png)
![Admin DashBoard3](screenshots/Screenshot%20(137).png)
Store Owner DashBoard:
![StoreOwner DashBoard3](screenshots/Screenshot%20(138).png)
Normal User Home:
![User1](screenshots/Screenshot%20(131).png)
![User2](screenshots/Screenshot%20(132).png)



User authentication (Login/Signup)

add /modify rating of stores

Admin panel for managing users, stores, and ratings

Store owners can view their store's ratings

Responsive UI built with React

Installation and Setup

1. Clone the Repository

git clone https://github.com/VeluruPavankumar/StoreRatingSystem.git
cd StoreRatingSystem

2. Backend Setup (Node.js + Express + MySQL)

cd backend
npm install


Configure Environment Variables

Create a .env file inside the backend folder and add:

PORT=.....
DB_HOST=localhost
DB_USER=root
DB_PASS=.......*
DB_NAME=storeratingdb
DB_PORT=.....
JWT_SECRET=.......


Start the Backend Server

npm run pavan --> Run to create tables initally and stop the server then run below command
node hashAdmin.js --> to insert the admin credentials initally
then run again to run the backend
npm run pavan 

3. Frontend Setup (React)

cd ../reviewfeapp
npm install

Start the Frontend Server

npm start

4. Access the Application

Backend API runs on: http://localhost:5000

Frontend runs on: http://localhost:3000

Technologies Used

Frontend: React, Redux, CSS

Backend: Node.js, Express, MySQL

Authentication: JWT
