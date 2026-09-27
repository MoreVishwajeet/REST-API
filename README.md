# User REST API — Node.js & Express.js

A simple REST API built with **Node.js** and **Express.js** to perform CRUD operations on user data.

The project uses a JSON file (`MOCK_DATA.json`) as a simple data store and demonstrates how backend APIs work with different HTTP methods.

## 🚀 Features

* Get all users
* Get a user by ID
* Create a new user
* Update user details
* Delete a user
* Store updated data in a JSON file
* Handle users that do not exist
* Test APIs using Postman

## 🛠️ Technologies Used

* Node.js
* Express.js
* JavaScript
* REST API
* JSON
* Postman
* Node.js File System (`fs`)

## 📁 Project Structure

```text
project/
│
├── MOCK_DATA.json
├── index.js
├── package.json
├── package-lock.json
└── README.md
```

### `index.js`

Contains the Express server and all API routes.

### `MOCK_DATA.json`

Contains the user data used by the API.

## ⚙️ Setup

### 1. Clone the repository

```bash
git clone <your-repository-url>
```

### 2. Navigate to the project

```bash
cd <project-folder>
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the server

```bash
node index.js
```

The server will run on:

```text
http://localhost:8000
```

## 🔗 API Endpoints

### 1. Get All Users

```http
GET /api/users
```

Example:

```text
http://localhost:8000/api/users
```

Returns all users in JSON format.

---

### 2. Get User by ID

```http
GET /api/users/:id
```

Example:

```text
http://localhost:8000/api/users/10
```

Returns the user with the specified ID.

If the user does not exist:

```json
{
  "status": "error",
  "message": "User does not exists"
}
```

---

### 3. Create a User

```http
POST /api/users
```

Send user data in the request body.

Example:

```text
first_name=Vishwa
last_name=More
email=vishwa@example.com
gender=Male
job_title=Software Engineer
```

The new user is added to `MOCK_DATA.json`.

---

### 4. Update a User

```http
PATCH /api/users/:id
```

Example:

```text
PATCH /api/users/10
```

Request body:

```text
first_name=Vishwajeet
```

Only the provided fields are updated.

The existing user data is preserved.

---

### 5. Delete a User

```http
DELETE /api/users/:id
```

Example:

```text
DELETE /api/users/10
```

The user with the specified ID is removed from the data.

## 📌 HTTP Methods

| Method | Purpose     |
| ------ | ----------- |
| GET    | Read data   |
| POST   | Create data |
| PATCH  | Update data |
| DELETE | Delete data |

These operations together represent the basic **CRUD** operations:

```text
Create → POST
Read   → GET
Update → PATCH
Delete → DELETE
```

## 🧩 Middleware

The project uses Express middleware to handle URL-encoded request bodies:

```js
app.use(express.urlencoded({ extended: false }));
```

This allows data sent through URL-encoded forms/request bodies to be accessed using:

```js
req.body
```

## 💾 Data Storage

Instead of using a database, this project uses:

```text
MOCK_DATA.json
```

When a user is created, updated, or deleted, the `fs` module is used to write the changes back to the JSON file.

Example:

```js
fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), ...)
```

## 🧪 Testing

The APIs can be tested using **Postman**.

Example requests:

```text
GET     /api/users
GET     /api/users/10
POST    /api/users
PATCH   /api/users/10
DELETE  /api/users/10
```

## 📚 What I Learned

Through this project, I practiced:

* Node.js backend development
* Express.js
* REST API architecture
* HTTP methods
* CRUD operations
* Express routing
* Route parameters using `req.params`
* Request body using `req.body`
* Express middleware
* HTTP status codes
* Reading and writing files using Node.js `fs`
* API testing with Postman
* Git and GitHub

## 👨‍💻 Author

**Vishwa**

Built while learning **Node.js, Express.js and REST API development**.
