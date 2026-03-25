const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { users } = require('../db');

// ─────────────────────────────────────────────
// GET /users — List all users with optional filters
// Query params: ?search=alice  OR  ?sort=name&order=asc
// ─────────────────────────────────────────────
router.get('/', (req, res) => {
  let result = [...users];

  // 🔍 Search filter (searches by name or email)
  if (req.query.search) {
    const keyword = req.query.search.toLowerCase();
    result = result.filter(
      (u) =>
        u.name.toLowerCase().includes(keyword) ||
        u.email.toLowerCase().includes(keyword)
    );
  }

  // 🔃 Sort filter
  if (req.query.sort) {
    const sortField = req.query.sort;       // e.g. "name" or "age"
    const order = req.query.order === 'desc' ? -1 : 1;

    result.sort((a, b) => {
      if (a[sortField] < b[sortField]) return -1 * order;
      if (a[sortField] > b[sortField]) return 1 * order;
      return 0;
    });
  }

  res.json({
    success: true,
    count: result.length,
    data: result
  });
});

// ─────────────────────────────────────────────
// GET /users/:id — Get a single user by ID
// ─────────────────────────────────────────────
router.get('/:id', (req, res) => {
  const user = users.find((u) => u.id === req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: `User with id "${req.params.id}" not found`
    });
  }

  res.json({ success: true, data: user });
});

// ─────────────────────────────────────────────
// POST /users — Create a new user
// Body: { name, email, age }
// ─────────────────────────────────────────────
router.post('/', (req, res) => {
  const { name, email, age } = req.body;

  // Validation
  if (!name || !email) {
    return res.status(400).json({
      success: false,
      message: 'Name and email are required fields'
    });
  }

  // Check duplicate email
  const emailExists = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (emailExists) {
    return res.status(409).json({
      success: false,
      message: `Email "${email}" is already registered`
    });
  }

  const newUser = {
    id: uuidv4(),
    name,
    email,
    age: age || null,
    createdAt: new Date().toISOString()
  };

  users.push(newUser);

  res.status(201).json({
    success: true,
    message: 'User created successfully',
    data: newUser
  });
});

// ─────────────────────────────────────────────
// PUT /users/:id — Update an existing user
// Body: { name?, email?, age? }
// ─────────────────────────────────────────────
router.put('/:id', (req, res) => {
  const index = users.findIndex((u) => u.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `User with id "${req.params.id}" not found`
    });
  }

  const { name, email, age } = req.body;

  // Check if new email conflicts with another user
  if (email) {
    const emailConflict = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.id !== req.params.id
    );
    if (emailConflict) {
      return res.status(409).json({
        success: false,
        message: `Email "${email}" is already used by another user`
      });
    }
  }

  // Update only the fields that were sent
  users[index] = {
    ...users[index],
    name: name || users[index].name,
    email: email || users[index].email,
    age: age !== undefined ? age : users[index].age,
    updatedAt: new Date().toISOString()
  };

  res.json({
    success: true,
    message: 'User updated successfully',
    data: users[index]
  });
});

// ─────────────────────────────────────────────
// DELETE /users/:id — Delete a user
// ─────────────────────────────────────────────
router.delete('/:id', (req, res) => {
  const index = users.findIndex((u) => u.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `User with id "${req.params.id}" not found`
    });
  }

  const deletedUser = users.splice(index, 1)[0];

  res.json({
    success: true,
    message: 'User deleted successfully',
    data: deletedUser
  });
});

module.exports = router;
