const sql = require('mssql');

// Azure SQL Database Configuration
const config = {
    user: 'arasakoadmin',
    password: 'Arasako.192sm',
    server: 'arasako-sql-server.database.windows.net',
    database: 'Arasako-DB',
    options: {
        encrypt: true, // Required for Azure SQL
        trustServerCertificate: false
    }
};

module.exports = async function (context, req) {
    const { email, password } = req.body;

    if (!email || !password) {
        context.res = {
            status: 400,
            body: "Email and password are required."
        };
        return;
    }

    try {
        await sql.connect(config);

        const result = await sql.query`
            SELECT * FROM Users WHERE email = ${email} AND password = ${password}
        `;

        if (result.recordset.length > 0) {
            context.res = {
                status: 200,
                body: { message: "Login successful!", user: result.recordset[0] }
            };
        } else {
            context.res = {
                status: 401,
                body: { message: "Invalid email or password." }
            };
        }
    } catch (err) {
        context.res = {
            status: 500,
            body: "Error connecting to database: " + err.message
        };
    }
};
