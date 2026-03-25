// In-memory storage for users
const { v4: uuidv4 } = require('uuid');

let users = [
  {
    id: uuidv4(),
    name: "Alice Johnson",
    email: "alice@example.com",
    age: 28,
    createdAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    name: "Bob Smith",
    email: "bob@example.com",
    age: 34,
    createdAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    name: "Charlie Brown",
    email: "charlie@example.com",
    age: 22,
    createdAt: new Date().toISOString()
  }
];

module.exports = { users };
