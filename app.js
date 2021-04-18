const express = require('express')
const mysql = require('mysql')

// create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    // password: '123456',
    database: 'node_mysql'
})

// connect
db.connect((err) => {
    if(err) throw err
    else console.log('MySql Connected...')
})

const app = express()

// create DB
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE node_mysql'
    db.query(sql, (err, result) => {
        if(err) throw err
        console.log(result)
        res.send('Database created...')

    })
})

// create table
app.get('/createpoststable', (req, res) => {
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))';
    db.query(sql, (err, result) => {
        if(err) throw err
        console.log(result)
        res.send('Posts table created...')
    })
})

// insert some data
app.get('/addpostone', (req, res) => {
    let post = {
        title: 'first post',
        body: 'This is the first post'
    }

    let sql = 'INSERT INTO posts SET ?'
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err
        console.log(result)
        res.send('Inserted into posts')
    })
})
app.get('/addposttwo', (req, res) => {
    let post = {
        title: 'second post',
        body: 'This is the second post'
    }

    let sql = 'INSERT INTO posts SET ?'
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err
        console.log(result)
        res.send('Inserted another post')
    })
})

// select router
app.get('/getposts', (req, res) => {
    let sql = 'SELECT * FROM posts'
    let query = db.query(sql, (err, results) => {
        if(err) throw err
        console.log(results)
        res.send('Posts fetched...')
    })
})

// fetch one post
app.get('/getpost/:id', (req, res) => {
    let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`
    let query = db.query(sql, (err, result) => {
        if(err) throw err
        console.log(result)
        res.send('Post fetched...')
    })
})

// update post
app.get('/updatepost/:id', (req, res) => {
    let newTtitle = 'updated title'
    let sql = `UPDATE posts SET title = '${newTtitle}' WHERE id = ${req.params.id}`
    let query = db.query(sql, (err, result) => {
        if(err) throw err
        console.log(result)
        res.send('Post updated...')
    })
})

// delete post
app.get('/deletepost/:id', (req, res) => {
    let newTtitle = 'updated title'
    let sql = `DELETE FROM posts WHERE id = ${req.params.id}`
    let query = db.query(sql, (err, result) => {
        if(err) throw err
        console.log(result)
        res.send('Post DELETED...')
    })
})





const port = process.env.PORT || 5000
app.listen(port, () => console.log(`server listening at port ${port}`))