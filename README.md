# BuyerForeSight - User Management REST API

A Node.js + Express REST API for managing users.

---

## 📁 Project Structure

```
user-management-api/
├── src/
│   ├── index.js          ← Entry point (starts the server)
│   ├── db.js             ← In-memory database (sample data)
│   └── routes/
│       └── users.js      ← All user API routes
├── package.json
└── README.md
```

---

## 🚀 Setup Steps

### Step 1 — Make sure Node.js is installed
```bash
node -v
npm -v
```
If not installed, download from https://nodejs.org

### Step 2 — Install dependencies
```bash
npm install
```

### Step 3 — Start the server
```bash
# Normal start
npm start

# Dev mode (auto-restart on file changes)
npm run dev
```

Server runs at: **http://localhost:3000**

---

## 📋 API Endpoints

### 1. GET /users — List all users
```
GET http://localhost:3000/users
```
With search filter:
```
GET http://localhost:3000/users?search=alice
```
With sort:
```
GET http://localhost:3000/users?sort=name&order=asc
GET http://localhost:3000/users?sort=age&order=desc
```

---

### 2. GET /users/:id — Get single user
```
GET http://localhost:3000/users/<user-id>
```

---

### 3. POST /users — Create a user
```
POST http://localhost:3000/users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 25
}
```

---

### 4. PUT /users/:id — Update a user
```
PUT http://localhost:3000/users/<user-id>
Content-Type: application/json

{
  "name": "John Updated",
  "age": 26
}
```

---

### 5. DELETE /users/:id — Delete a user
```
DELETE http://localhost:3000/users/<user-id>
```

---

## 🧪 Testing with curl

```bash
# Get all users
curl http://localhost:3000/users

# Search users
curl "http://localhost:3000/users?search=alice"

# Create a user
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@test.com","age":25}'

# Update a user (replace <id> with actual id)
curl -X PUT http://localhost:3000/users/<id> \
  -H "Content-Type: application/json" \
  -d '{"name":"John Updated"}'

# Delete a user
curl -X DELETE http://localhost:3000/users/<id>
```
