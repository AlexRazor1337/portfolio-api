# portfolio-api
This is a REST API for a portfolio publication site where users can sign up, create portfolios, upload images, and manage their profiles. It supports features such as viewing image feeds, logging in/out, and deleting profiles, portfolios, and images. The API is built using Node.js, Express.js as a framework and utilizes PostgreSQL database with Sequelize as an ORM.
# How to Run

1. Clone the Repository

	```sh
	git clone https://github.com/AlexRazor1337/portfolio-api.git
	cd portfolio-api
	```

2. Install Dependencies  

	```sh
	npm install
	```

3. Set Up PostgreSQL Database

	Run the following command to start a PostgreSQL container **OR** setup it manually:

	```sh
	docker run --name portfolio-pg --rm -e POSTGRES_USER=portfolio -e POSTGRES_PASSWORD=devpass -e PGDATA=/var/lib/postgresql/data/pgdata -v /tmp:/var/lib/postgresql/data -p 5432:5432 -it postgres:14.1-alpine
	```

4. Set Up Environment Variables

	Create an `.env` file in the root directory of the project and populate it with the following content:

	```
	APP_PORT=3000
	DB_USER=portfolio
	DB_PASS=devpass
	DB_NAME=portfolio-db
	DB_HOST=localhost
	JWT_SECRET=jwtsecret
	```

	Adjust the values according to your preferences or existing database configuration.

5. Set Up Database tables

	To set up the database, run the following commands:

	```sh
	npx sequelize-cli db:create
	npx sequelize-cli db:migrate
	```
	This will create the database and all the necessary tables.
	
6. Start the API

	Finally, start the API server by running the following command:

	```
	npm run start
	```

	The server will start running on the specified port and you can access the API endpoints.

# Endpoints Documentation

## Images
### Create image
> POST /api/images

**Description:** This route is used to create a new image.  
**Is Auth required?:** Yes

**Request data:**
```
multipart/form-data:
- portfolioId: "1"
- name: my image
- description: this is my image
- image: [file]
```

**Response:**
```json
{
	"id": 1,
	"portfolioId": 1,
	"name": "my image",
	"description": "this is my image",
	"filename": "2a2472b6-a526-4adb-8e8a-ffcfe3580393.jpeg",
	"updatedAt": "2023-06-11T11:55:55.179Z",
	"createdAt": "2023-06-11T11:55:55.179Z"
}
```

## Get image
> GET /api/images/:id

**Description:** This route is used to get information about a specific image.  
**Is Auth required?:** No

**Request data:**
```
params:
- id
```

**Response:**
```json
{
	"id": 1,
	"name": "my image",
	"description": "this is my image",
	"filename": "2a2472b6-a526-4adb-8e8a-ffcfe3580393.jpeg",
	"createdAt": "2023-06-11T11:55:55.179Z",
	"updatedAt": "2023-06-11T11:55:55.179Z",
	"portfolioId": 1,
	"Portfolio": {
		"id": 1,
		"name": "Portfolio 1"
	},
	"Comments": [],
	"url": "/images/2a2472b6-a526-4adb-8e8a-ffcfe3580393.jpeg"
}
```

## Delete image
> DELETE /api/images/:id

**Description:** This route is used to delete a specific image.  
**Is Auth required?:** Yes

**Request data:**
```
params:
- id
```

**Response:**
```json
{
	"message": "Image deleted!"
}
```

## Feed
### Get feed
> GET /api/feed

**Description:** This route is used to get the feed of images.  
**Is Auth required?:** No

**Request data:**
```
Query:
- offset: "10"
- limit: "10"
```

**Response:**
```json
{
	"data": [
		{
			"id": 1,
			"name": "my image",
			"description": "this is my image",
			"filename": "2a2472b6-a526-4adb-8e8a-ffcfe3580393.jpeg",
			"createdAt": "2023-06-11T11:55:55.179Z",
			"updatedAt": "2023-06-11T11:55:55.179Z",
			"Portfolio": {
				"name": "Portfolio 1"
			},
			"Comments": [
				{
					"id": 1,
					"text": "nice image",
					"createdAt": "2023-06-11T11:56:06.563Z",
					"updatedAt": "2023-06-11T11:56:06.563Z",
					"User": {
						"id": 2,
						"email": "test@mail.com"
					}
				}
			],
			"url": "/images/2a2472b6-a526-4adb-8e8a-ffcfe3580393.jpeg"
		}
	]
}
```

## Comments
### Create comment
> POST /api/comments

**Description:** This route is used to create a new comment for an image.  
**Is Auth required?:** Yes

**Request data:**
```
Body:
{
  "imageId": 1,
  "text": "nice image"
}
```

**Response:**
```json
{
	"id": 1,
	"imageId": 1,
	"userId": 2,
	"text": "nice image",
	"updatedAt": "2023-06-11T11:56:06.563Z",
	"createdAt": "2023-06-11T11:56:06.563Z"
}
```

## Delete comment
> DELETE /api/comments/:id

**Description:** This route is used to delete a specific comment.  
**Is Auth required?:** Yes

**Request data:**
```
:id
```

**Response:**
```json
{
	"message": "Comment deleted"
}
```

## Portfolio
### Get portfolios
> GET /api/portfolio

**Description:** This route is used to get all your portfolios.  
**Is Auth required?:** Yes

**Request data:**
```
None
```

**

Response:**
```json
{
	"data": [
		{
			"id": 1,
			"name": "Portfolio 1",
			"description": "my cool portfolio",
			"createdAt": "2023-06-11T11:55:29.044Z",
			"updatedAt": "2023-06-11T11:55:29.044Z",
			"userId": 2
		}
	]
}
```

### Get portfolio
> GET /api/portfolio/:id

**Description:** This route is used to get information about a specific portfolio.  
**Is Auth required?:** Yes

**Request data:**
```
:id
```

**Response:**
```json
{
	"id": 1,
	"name": "Portfolio 1",
	"description": "my cool portfolio",
	"createdAt": "2023-06-11T11:55:29.044Z",
	"updatedAt": "2023-06-11T11:55:29.044Z",
	"userId": 2,
	"Images": [
		{
			"id": 2,
			"name": "my image",
			"description": "this is my image",
			"filename": "4512359e-4a35-4e9b-bf45-9251ce7ea33c.jpeg",
			"createdAt": "2023-06-11T21:33:44.138Z",
			"updatedAt": "2023-06-11T21:33:44.138Z",
			"url": "/images/4512359e-4a35-4e9b-bf45-9251ce7ea33c.jpeg"
		}
	]
}
```

### Create portfolio
> POST /api/portfolio

**Description:** This route is used to create a new portfolio.  
**Is Auth required?:** Yes

**Request data:**
```
application/json

Body:
{
  "name": "Portfolio 1",
  "description": "my cool portfolio"
}
```

**Response:**
```json
{
	"id": 1,
	"userId": 2,
	"name": "Portfolio 1",
	"description": "my cool portfolio",
	"updatedAt": "2023-06-11T11:55:29.044Z",
	"createdAt": "2023-06-11T11:55:29.044Z"
}
```

### Delete portfolio
> DELETE /api/portfolio/:id

**Description:** This route is used to delete a specific portfolio.  
**Is Auth required?:** Yes

**Request data:**
```
:id
```

**Response:**
```json
{
	"message": "Portfolio deleted"
}
```

## Auth
### Signup
> POST /api/auth/signup

**Description:** This route is used to sign up a new user.  
**Is Auth required?:** No

**Request data:**
```
application/json

Body:
{
  "email": "test@mail.com",
  "password": "devpass",
  "confirmPassword": "devpass"
}
```

**Response:**
```json
{
	"id": 2,
	"email": "test@mail.com",
	"updatedAt": "2023-06-11T11:54:59.606Z",
	"createdAt": "2023-06-11T11:54:59.606Z"
}
```

### Login
> POST /api/auth/login

**Description:** This route is used to log in a user.  
**Is Auth required?:** No

**Request data:**
```
application/json

Body:
{
  "email": "test@mail.com",
  "password": "devpass"
}
```

**Response:**
```json
{
	"id": 2,
	"email": "test@mail.com",
	"createdAt": "2023-06-11T11:54:59.606Z",
	"updatedAt": "2023-06-11T11:54:59.606Z",
	"token": "jwt_token"
}
```

### Logout
> POST /api/auth/logout

**Description:** This route is used to log out the currently authenticated user.  
**Is Auth required?:** Yes

**Request data:** `None`

**Response:**
```json
{
	"message": "Logged out"
}
```

## Profile
### Delete profile
> DELETE *host

*/api/profile

**Description:** This route is used to delete the user's profile.  
**Is Auth required?:** Yes

**Request data:**
```
None
```

**Response:**
```json
{
	"message": "Profile deleted"
}
```

### Show profile
> GET /api/profile

**Description:** This route is used to retrieve the user's profile information.  
**Is Auth required?:** Yes

**Request data:** `None`

**Response:**
```json
{
	"id": 2,
	"email": "test@mail.com",
	"createdAt": "2023-06-11T11:54:59.606Z",
	"updatedAt": "2023-06-11T11:54:59.606Z"
}
```
