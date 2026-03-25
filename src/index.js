const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ──────────────────────────────
app.use(express.json()); // Parse JSON request bodies

// ── Routes ─────────────────────────────────
const userRoutes = require('./routes/users');
app.use('/users', userRoutes);

// ── Root endpoint ───────────────────────────
app.get('/', (req, res) => {
  res.json({
    message: '🚀 BuyerForeSight User Management API',
    version: '1.0.0',
    endpoints: {
      'GET    /users':         'List all users (supports ?search= and ?sort=name&order=asc)',
      'GET    /users/:id':     'Get a user by ID',
      'POST   /users':         'Create a new user',
      'PUT    /users/:id':     'Update a user',
      'DELETE /users/:id':     'Delete a user'
    }
  });
});

// ── 404 handler ─────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// ── Start server ─────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
  console.log(`📋 Available endpoints:`);
  console.log(`   GET    http://localhost:${PORT}/users`);
  console.log(`   GET    http://localhost:${PORT}/users/:id`);
  console.log(`   POST   http://localhost:${PORT}/users`);
  console.log(`   PUT    http://localhost:${PORT}/users/:id`);
  console.log(`   DELETE http://localhost:${PORT}/users/:id`);
});
