# Todo Application 

## Introduction
This is a Todo application made using basic HTML, CSS and JS.

## Setting up the project

Follow the following steps to setup this project.

*Note* - Make sure you have node and npm installed in your system. If not, follow the steps given [here](https://nodejs.org/en/download/) to install it.

### Fork this repository
First of all, click on the top-right corner of this repository to fork it.

### Create a local clone of your fork
Then, clone your forked repository :

Change your current directory to the repo's root.
```
cd To-Do-Application
```

### Run the server

Install the dependencies using
```
npm i
```

Then you can finally run the server using this command.
```
npm run dev
```

Then you can go to `localhost:3000` in your browser.

### Deploying App

You can use netlify or vercel for deploying your app. The build command is
```
npm run build
```

This will create a `dist` folder which can be served now


<!-- [![Netlify Status](https://api.netlify.com/api/v1/badges/10c7980a-fa55-46ae-9a5d-07ec36ec9b2b/deploy-status)](https://app.netlify.com/sites/peaceful-wright-0c70c6/deploys) -->

## Todo Application

There are three pages in this site.

- `/` - This is the main page where the user can create, edit or delete the tasks.
- `/login/` - This is the login page.
- `/register/` - This is the register page.

This app is using the  backend server containing the API endpoints required for this application to function completely  - [https://todo-app-csoc.herokuapp.com/](https://todo-app-csoc.herokuapp.com/)

## API Usage

### Auth System
All the requests made to the API (except the Login and Register endpoints) need an  **Authorization header**  with a valid token and the prefix  **Token**

`Authorization: Token <token>`

In order to obtain a valid token it's necessary to send a request  `POST /auth/login/`  with  **username**  and  **password**. To register a new user it's necessary to make a request  `POST /auth/register/`  with name, email, username and password.

### End Points

**Auth**

-   `POST /auth/login/`

	Takes the username and password as input, validates them and returns the **Token**, if the credentials are valid.

	Request Body (Sample):
	```
	{
	  "username": "string",
	  "password": "string"
	}
	```
	Response Body (Sample):
	```
	{
	  "token":  "string"
	}
	```
	Response Code: `200`

-   `POST /auth/register/`

	Register a user in Django by taking the name, email, username and password as input.

	Request Body (Sample):
	```
	{
	  "name": "string",
	  "email": "user@example.com",
	  "username": "string",
	  "password": "string"
	}
	```
	Response Body (Sample):
	```
	{
	  "token":  "string"
	}
	```
	Response Code: `200`

-   `POST /auth/profile/`

	Retrieve the id, name, email and username of the logged in user. Requires token in the Authorization header.

	Response Body (Sample):
	```
	{
	  "id":  1,
	  "name":  "string",
	  "email":  "user@example.com",
	  "username":  "string"
	}
	```
	Response Code: `200`


**Todo**

-   `GET /todo/`

	Get all the Todos of the logged in user. Requires token in the Authorization header.

	Response Body (Sample):
	```
	[
	  {
	    "id":  1,
	    "title":  "string"
	  },
	  {
	    "id":  2,
	    "title":  "string"
	  }
	]
	```
	Response Code: `200`

-   `POST /todo/create/`

	Create a Todo entry for the logged in user. Requires token in the Authorization header.

	Request Body (Sample):
	```
	{
	  "title": "string"
	}
	```
	Response Code: `200`

-   `GET /todo/{id}/`

	Get the Todo of the logged in user with given id. Requires token in the Authorization header.

	Response Body (Sample):
	```
	{
	  "id":  1,
	  "title":  "string"
	}
	```
	Response Code: `200`

-   `PUT /todo/{id}/`

	Change the title of the Todo with given id, and get the new title as response. Requires token in the Authorization header.

	Request Body (Sample):
	```
	{
	  "title": "string"
	}
	```
	Response Body (Sample):
	```
	{
	  "id":  1,
	  "title":  "string"
	}
	```

-   `PATCH /todo/{id}/`

	Change the title of the Todo with given id, and get the new title as response. Requires token in the Authorization header.

	Request Body (Sample):
	```
	{
	  "title": "string"
	}
	```
	Response Body (Sample):
	```
	{
	  "id":  1,
	  "title":  "string"
	}
	```

-   `DELETE /todo/{id}/`

	Delete the Todo with given id. Requires token in the Authorization header.

	Response Code: `204`

All the requests must be prefixed with the base URL of the API.
Example: for login the `POST` request must be sent to `https://todo-app-csoc.herokuapp.com/auth/login/` with the required details. **Make sure to append a slash at the end, otherwise you may encounter an error while making the `POST` request.**

### Documentation
Swagger generated docs: [https://todo-app-csoc.herokuapp.com/](https://todo-app-csoc.herokuapp.com/)
ReDoc generated docs: [https://todo-app-csoc.herokuapp.com/redoc/](https://todo-app-csoc.herokuapp.com/redoc/)

### Testing the API

The API can be tested by going to the deployed URL: [https://todo-app-csoc.herokuapp.com/](https://todo-app-csoc.herokuapp.com/), clicking the "Try it out" button after selecting the endpoint and finally executing it along with the Response Body (if required).

For testing the endpoints which require **Token** in the Authorization header, you can click on the "Authorize" button, write the Authorization token as  `Token <token>` (which you have obtained from the `auth/login/` endpoint) and finally click on "Authorize". Thereafter, all the requests made to any endpoint will have the Token in the Authorization Header.
