const express = require('express');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Default route
app.get('/', (req, res) => {
    res.json({ message: "Welcome to Khanh Hoa Monument Management API" });
});

// Routes
const authRoutes = require('./routes/auth.routes');
const monumentRoutes = require('./routes/monument.routes');
const favoriteRoutes = require('./routes/favorite.routes');
const postRoutes = require('./routes/post.routes');
const commentRoutes = require('./routes/comment.routes');
const managementUnitRoutes = require('./routes/managementUnit.routes');
const statsRoutes = require('./routes/stats.routes');

app.use('/api/auth', authRoutes);
app.use('/api/monuments', monumentRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/management-units', managementUnitRoutes);
app.use('/api/stats', statsRoutes);

module.exports = app;
