var express = require('express')
var router = express.Router()
const mysql = require('mysql');
const url = require('url');
const pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'todo'
});
// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
})
// define the home page route
// define the about route
router.get('/', function (req, res) {
    var sql = "SELECT * from todos";
    pool.getConnection((err, connection) => {
        if (err) {
            throw err;
        }
        pool.query(sql, async (err, result) => {
            if (err) throw err;
            connection.release();
            await res.send(result);
        });


    });
})

router.put('/', function (req, res) {
    let type;
    if(req.body.type === 'todo'){
        type = 'done';
    }else{
        type = 'todo';
    }
    var sql = "UPDATE todos SET type = '" + type + "' WHERE id = " + req.body.id;
    pool.getConnection((err, connection) => {
        if (err) {
            throw err;
        }
        pool.query(sql, async (err, result) => {
            if (err) throw err;
            connection.release();
            await res.send(result);
        });


    });
})


router.post('/', function (req, res) {
    var sql = "INSERT INTO todos (name, description,type) VALUES (" + "'" + req.body.name + "','" + req.body.description + "','" + req.body.type + "'" + ")";
    pool.getConnection((err, connection) => {
        pool.query(sql, ((err, result) => {
            if (err) throw err;
            pool.query("SELECT * from todos", (err, todos) => {

                connection.release();
                res.send(todos);
            })

        }));
    });
})

router.delete('/:id', function (req, res) {
    const id = req.url.substring(1);
    var sql = "DELETE FROM todos where id = " + id;
    pool.getConnection((err, connection) => {
        pool.query(sql, ((err, result) => {
            if (err) throw err;
            connection.release();
            res.send(result);
        }));
    });
})

module.exports = router
