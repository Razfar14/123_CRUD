import express from 'express';
import pg from 'pg';

const app = express();
const port = 3000;
const {Pool} = pg

app.use(express.json ());
app.use(
express.urlencoded({ extended: true })
)

const pool = new pg.Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Mahasiswa',
  password: '123kucing',
  port: 5432,
});

app.get('/', (req, res) => {
    console.log("TEST DATA :")
    pool.query('SELECT * FROM Biodata')
        .then(testData => {
            console.log(testData.rows);
            res.json(testData.rows);
        })
        .catch(err => {
            console.error('Error executing query', err.stack);
            res.status(500).send('Error executing query');
        });
});

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
});