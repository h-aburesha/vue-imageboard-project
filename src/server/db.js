require("dotenv").config();
const { SQL_USER, SQL_PASSWORD } = process.env; // add a .env file next to the db.js file with your PostgreSQL credentials
const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        `postgres:${SQL_USER}:${SQL_PASSWORD}@localhost:5432/imageboard`
);

module.exports.getImgById = (id) => {
    return db.query(`SELECT * FROM images WHERE id = $1`, [id]);
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

module.exports.addComment = (comment, username, image_id) => {
    return db.query(
        `INSERT INTO comments (comment, username, image_id) VALUES ($1, $2, $3) RETURNING *;`,
        [comment, username, image_id]
    );
};

module.exports.getAllComments = (image_id) => {
    return db.query(
        `
    SELECT * FROM comments WHERE image_id = $1 
    ORDER BY created_at DESC;
    `,
        [image_id]
    );
};

module.exports.addLikes = (imageId) => {
    return db.query(
        `
        UPDATE images 
        SET likes = likes + 1 
        WHERE id = $1
        RETURNING *;`,
        [imageId]
    );
};
