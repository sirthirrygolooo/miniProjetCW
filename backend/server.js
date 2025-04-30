require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const pool = require('./db');
const initDb = require('./initDb');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const app = express();
app.use(cors());
app.use(express.json());

const SECRET_KEY = process.env.SECRET_KEY;

initDb();

const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'API Authentication avec JWT',
        version: '1.0.0',
        description: 'Une API pour l\'inscription, la connexion et l\'authentification avec JWT',
      },
      components: {
        securitySchemes: {
          BearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      security: [
        {
          BearerAuth: [],
        },
      ],
    },
    apis: ['./server.js'],
};
  
const swaggerDocs = swaggerJSDoc(swaggerOptions);
  
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: L'email de l'utilisateur
 *         password:
 *           type: string
 *           description: Le mot de passe de l'utilisateur
 *     Token:
 *       type: object
 *       required:
 *         - token
 *       properties:
 *         token:
 *           type: string
 *           description: Le token JWT généré
 */


/**
 * @swagger
 * /register:
 *   post:
 *     summary: Créer un nouvel utilisateur
 *     tags: [Authentification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Utilisateur créé avec succès
 *       400:
 *         description: Email déjà utilisé
 */
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


/**
 * @swagger
 * /login:
 *   post:
 *     summary: Se connecter et obtenir un token JWT
 *     tags: [Authentification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *           example:
 *             email: "example@example.com"
 *             password: "example"
 *     responses:
 *       200:
 *         description: Connexion réussie, token JWT retourné
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Token'
 *       401:
 *         description: Mauvais email ou mot de passe
 */
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


/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Récupérer les informations de l'utilisateur
 *     tags: [Utilisateur]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Détails de l'utilisateur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   description: L'email de l'utilisateur
 *       401:
 *         description: Token invalide ou expiré
 *       400:
 *         description: Veuillez vous connecter pour obtenir un token
 */
app.get('/profile', authenticateToken, async (req, res) => {
    const result = await pool.query("SELECT email FROM users WHERE id = $1", [req.userId]);
    res.json(result.rows[0]);
});

app.listen(3000, () => console.log("Doc sur http://localhost:3000/api-docs"));