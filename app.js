const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./util/db');
const postRoutes = require('./routes/postRoute');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

// Routes
app.use('/', postRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.use((req, res) => {
    res.status(404).send('Route not found');
});

sequelize.sync({ force: false }) 
    .then(() => {
        console.log('Database synced');
        app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
    })
    .catch((err) => console.error('Failed to sync database:', err));
