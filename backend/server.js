require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const pool = require('./db');
const initDb = require('./initDb');

const app = express();
app.use(cors());
app.use(express.json());

const SECRET_KEY = process.env.SECRET_KEY;

initDb();

app.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(`Email: ${email}, Password: ${hashedPassword}`);
    try {
        await pool.query("INSERT INTO users (email, password) VALUES ($1, $2)", [email, hashedPassword]);
        res.json({ message: "Utilisateur créé !" });
    } catch (error) {
        res.status(400).json({ error: "Email déjà utilisé !" });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    if (result.rows.length === 0 || !await bcrypt.compare(password, result.rows[0].password)) {
        return res.status(401).json({ error: "Mauvais email ou mot de passe" });
    }

    const token = jwt.sign({ userId: result.rows[0].id }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
});

const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) return res.status(401).json({ error: "Pas de token" });

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).json({ error: "Token invalide" });
        req.userId = decoded.userId;
        next();
    });
};

app.get('/profile', authenticateToken, async (req, res) => {
    const result = await pool.query("SELECT email FROM users WHERE id = $1", [req.userId]);
    res.json(result.rows[0]);
});

app.listen(3000, () => console.log("Serveur sur http://localhost:3000"));