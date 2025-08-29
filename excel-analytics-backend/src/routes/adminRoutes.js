// src/routes/adminRoutes.js
const express = require('express');
const { authenticate, requireRole } = require('../middleware/roles');
const { listUsersWithUsage, setUserRole, deleteUser } = require('../controllers/adminController');

const router = express.Router();
router.use(authenticate, requireRole('admin', 'superadmin'));

router.get('/users', listUsersWithUsage);
router.patch('/users/:id/role', setUserRole);
router.delete('/users/:id', deleteUser);

module.exports = router;
