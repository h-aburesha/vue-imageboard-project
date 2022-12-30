require("dotenv").config();
const { SQL_USER, SQL_PASSWORD } = process.env; // add a .env file next to the db.js file with your PostgreSQL credentials
const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        `postgres:${SQL_USER}:${SQL_PASSWORD}@localhost:5432/imageboard`
);

module.exports.getImgById = (id) => {
    return db.query(`SELECT * FROM images WHERE id=$1`, [id]);
};

module.exports.getAllImg = () => {
    return db.query(`
    SELECT * FROM images
    ORDER BY created_at DESC;
    `);
};

module.exports.addImg = (url, username, title, description) => {
    return db.query(
        `INSERT INTO images (url, username, title, description) VALUES ($1, $2, $3, $4) RETURNING *;`,
        [url, username, title, description]
    );
};
//?
