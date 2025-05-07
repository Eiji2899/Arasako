const { app } = require('@azure/functions');
const sql = require('mssql');

// It's strongly recommended to use environment variables instead of hardcoding secrets
const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: 'arasako-sql-server.database.windows.net',
    database: 'Arasako-DB',
    options: {
        encrypt: true,
        trustServerCertificate: false
    }
};

app.http('loginUser', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        const { email, password } = await request.json();

        if (!email || !password) {
            return {
                status: 400,
                body: "Email and password are required."
            };
        }

        try {
            await sql.connect(config);

            const result = await sql.query`
                SELECT * FROM Users WHERE email = ${email} AND password = ${password}
            `;

            if (result.recordset.length > 0) {
                return {
                    status: 200,
                    jsonBody: { message: "Login successful!", user: result.recordset[0] }
                };
            } else {
                return {
                    status: 401,
                    jsonBody: { message: "Invalid email or password." }
                };
            }
        } catch (err) {
            return {
                status: 500,
                body: "Error connecting to database: " + err.message
            };
        }
    }
});
