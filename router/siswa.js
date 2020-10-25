const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const db = require("../config") //import konfigurasi database

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


// end-point akses data siswa
app.get("/", (req, res) => {
    // create sql query
    let sql = "select * from siswa"

    // run query
    db.query(sql, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message // pesan error
            }            
        } else {
            response = {
                count: result.length, // jumlah data
                siswa: result // isi data
            }            
        }
        res.json(response) // send response
    })
})


// end-point menyimpan data siswa
app.post("/", (req,res) => {

    // prepare data
    let data = {
        nis: req.body.nis,
        nama_siswa: req.body.nama_siswa,
        kelas: req.body.kelas,
    }

    // create sql query insert
    let sql = "insert into siswa set ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data inserted"
            }
        }
        res.json(response) // send response
    })
})


// end-point mengubah data siswa
app.put("/:id", (req,res) => {

    // prepare data
    let data = [
        // data
        {
            nis: req.body.nis,
            nama_siswa: req.body.nama_siswa,
            kelas: req.body.kelas,
        },

        // parameter (primary key)
        {
            id_siswa: req.params.id
        }
    ]

    // create sql query update
    let sql = "update siswa set ? where ?"

    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data updated"
            }
        }
        res.json(response) // send response
    })
})


// end-point mendelete siswa
app.delete("/:id", (req,res) => {
    // prepare data
    let data = [
       
        // parameter (primary key)
        {
            id_siswa: req.params.id
        }
    ]
    // create sql query update
    let sql = "delete from siswa where ?"
    // run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data deleted"
            }
        }
        res.json(response) // send response
    })
})

module.exports=app;