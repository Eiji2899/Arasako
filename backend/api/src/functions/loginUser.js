const { app } = require('@azure/functions');
const sql = require('mssql');

const config = {
    user: 'arasakoadmin',
    password: 'Arasako.192sm',
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
    handler: async (req, context) => {
        const { email, password } = await req.json();

        if (!email || !password) {
            return {
                status: 400,
                body: "Email and password required."
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
                    jsonBody: {
                        message: "Login successful!",
                        user: result.recordset[0]
                    }
                };
            } else {
                return {
                    status: 401,
                    jsonBody: { message: "Invalid credentials." }
                };
            }
        } catch (err) {
            return {
                status: 500,
                body: "Error: " + err.message
            };
        }
    }
});
