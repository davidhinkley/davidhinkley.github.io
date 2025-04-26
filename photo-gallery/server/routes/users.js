const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');

// Get all users (admin only)
router.get('/', auth, async (req, res) => {
  try {
    // Check if user is admin
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
    }

    // Return all users without password field
    const users = global.db.users.map(user => ({
      id: user.id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin || false,
      createdAt: user.createdAt
    }));

    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user by ID (admin only)
router.get('/:id', auth, async (req, res) => {
  try {
    // Check if user is admin
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
    }

    const user = global.db.users.find(user => user.id === req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return user without password
    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin || false,
      createdAt: user.createdAt
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new user (admin only)
router.post('/', auth, async (req, res) => {
  try {
    // Check if user is admin
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
    }

    const { username, email, password, isAdmin } = req.body;
    
    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Please provide username, email and password' });
    }

    // Check if user already exists
    const userExists = global.db.users.find(user => user.email === email || user.username === username);
    if (userExists) {
      return res.status(400).json({ message: 'User with that email or username already exists' });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create new user
    const newUser = {
      id: Date.now().toString(),
      username,
      email,
      password: hashedPassword,
      isAdmin: isAdmin || false,
      createdAt: new Date()
    };
    
    global.db.users.push(newUser);
    
    // Save database state
    if (typeof global.saveDbState === 'function') {
      global.saveDbState();
    }
    
    // Return user without password
    res.status(201).json({
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin || false,
      createdAt: newUser.createdAt
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user (admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    // Check if user is admin
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
    }

    const { username, email, password, isAdmin } = req.body;
    
    // Find user
    const userIndex = global.db.users.findIndex(user => user.id === req.params.id);
    
    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if username or email is already taken by another user
    if (username || email) {
      const userExists = global.db.users.find(user => 
        user.id !== req.params.id && 
        ((username && user.username === username) || (email && user.email === email))
      );
      
      if (userExists) {
        return res.status(400).json({ message: 'Username or email already in use' });
      }
    }
    
    // Update user
    const updatedUser = { ...global.db.users[userIndex] };
    
    if (username) updatedUser.username = username;
    if (email) updatedUser.email = email;
    if (typeof isAdmin === 'boolean') updatedUser.isAdmin = isAdmin;
    
    // Update password if provided
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updatedUser.password = await bcrypt.hash(password, salt);
    }
    
    // Save updated user
    global.db.users[userIndex] = updatedUser;
    
    // Save database state
    if (typeof global.saveDbState === 'function') {
      global.saveDbState();
    }
    
    // Return updated user without password
    res.json({
      id: updatedUser.id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin || false,
      createdAt: updatedUser.createdAt
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete user (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    // Check if user is admin
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
    }

    // Prevent deleting the current user
    if (req.user.id === req.params.id) {
      return res.status(400).json({ message: 'Cannot delete your own account' });
    }
    
    // Find user
    const userIndex = global.db.users.findIndex(user => user.id === req.params.id);
    
    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Remove user
    global.db.users.splice(userIndex, 1);
    
    // Save database state
    if (typeof global.saveDbState === 'function') {
      global.saveDbState();
    }
    
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;