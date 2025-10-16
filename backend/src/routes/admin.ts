import express from 'express';
import { User } from '../models/User';
import { Link } from '../models/Link';
import { authMiddleware } from '../middleware/auth';
import { adminMiddleware } from '../middleware/admin';

const router = express.Router();

// All routes in this file are protected by auth and admin middleware
router.use(authMiddleware, adminMiddleware);

/**
 * @route   GET /api/admin/users
 * @desc    Get all users with their link counts
 * @access  Admin
 */
router.get('/users', async (req, res) => {
  try {
    // Fetch all users and exclude their password hashes
    const users = await User.find().select('-passwordHash');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error });
  }
});

/**
 * @route   GET /api/admin/users/:id
 * @desc    Get a single user's details and all their links
 * @access  Admin
 */
router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-passwordHash');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const links = await Link.find({ userId: req.params.id }).sort({ createdAt: -1 });

    res.json({ user, links });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user details', error });
  }
});

/**
 * @route   GET /api/admin/links
 * @desc    Get all links
 * @access  Admin
 */
router.get('/links', async (req, res) => {
  try {
    const links = await Link.find().populate('userId', 'name email'); // Populate user details
    res.json(links);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch links', error });
  }
});

export default router;