const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root', 
  password: '', 
  database: 'test', 
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const getMarketingData = async () => {
  try {
    // Query SQL untuk mengambil data marketing
    const sql = `
      SELECT
        Marketing.Name AS MarketingName,
        MONTHNAME(penjualan.date) AS Month,
        SUM(penjualan.total_balance) AS revenue
      FROM
        marketing
      LEFT JOIN
        penjualan ON marketing.ID = penjualan.marketing_id
      GROUP BY
        MONTH, marketing.Name
      ORDER BY
        MONTH;
    `;

    // Eksekusi query SQL
    const [rows, fields] = await pool.execute(sql);

    // Menampilkan hasil query
    return rows;
  } catch (error) {
    console.error('Error executing SQL query:', error);
    throw error; // Re-throwing the error to handle it outside
  }
};

// Define an async function to wrap your code
const main = async () => {
  try {
    // Memanggil fungsi dan menyimpan hasilnya ke dalam variabel
    const marketingData = await getMarketingData();
    return marketingData; // Sekarang Anda memiliki akses ke data marketing
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

// Call the async function to execute your code
module.exports = main;
