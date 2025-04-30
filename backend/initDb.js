const pool = require('./db');
const bcrypt = require('bcryptjs');

async function initDb() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL
            );
        `);

        const checkUser = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            ['example@example.com']
        );

        if (checkUser.rows.length === 0) {
            const hashedPassword = await bcrypt.hash('example', 10);

            await pool.query(
                "INSERT INTO users (email, password) VALUES ($1, $2)",
                ['example@example.com', hashedPassword]
            );
            console.log("Utilisateur 'example@example.com' ajouté.");
        } else {
            console.log("Utilisateur 'example@example.com' existe déjà.");
        }

        console.log("Base de données initialisée !");
    } catch (err) {
        console.error("Erreur lors de l'initialisation de la base :", err);
    }
}

module.exports = initDb;