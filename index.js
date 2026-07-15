import express from 'express';
import pg from 'pg';

const app = express();
const port = 3000;

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

app.post('/', (req, res) => {
    const { nama, nim, kelas } = req.body;
    pool.query('INSERT INTO Biodata (nama, nim, kelas) VALUES ($1, $2, $3)', [nama, nim, kelas])
        .then(() => {
            res.status(201).send('Data berhasil ditambahkan');
        })
        .catch(err => {
            console.error('Error executing query', err.stack);
            res.status(500).send('Error executing query');
        });
});

app.put('/', (req, res) => {
    const { id, nama, nim, kelas } = req.body;
    pool.query('UPDATE Biodata SET nama = $1, nim = $2, kelas = $3 WHERE id = $4', [nama, nim, kelas, id])
        .then(() => {
            res.send('Data berhasil diperbarui');
        })
        .catch(err => {
            console.error('Error executing query', err.stack);
            res.status(500).send('Error executing query');
        });
    })

app.delete('/', (req, res) => {
    const { id } = req.body;
    pool.query('DELETE FROM Biodata WHERE id = $1', [id])
        .then(() => {
            res.send('Data berhasil dihapus');
        })
        .catch(err => {
            console.error('Error executing query', err.stack);
            res.status(500).send('Error executing query');
        });
    })
        
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})