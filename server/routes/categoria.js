const express = require('express');

let { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');
let app = express();
let Categoria = require('../models/categorias');
const { json } = require('body-parser');

/* ******* Mostrar todas las categorias ********  */
app.get('/categoria', (req, res) => {
    Categoria.find({})
        .sort('descripcion')
        .populate('usuario', 'nombre email')
        .exec((err, categorias) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    estado: false,
                    err
                });
            }
            res.json({
                ok: true,
                categorias
            })
        });
});

/* ******* Mostrar todas las categorias por ID ********  */
app.get('/categoria/:id', (req, res) => {
    let id = req.params.id;
    Categoria.findById(id, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                estado: false,
                err
            });
        }
        if (!categoriaDB) {
            return res.status(500).json({
                ok: false,
                estado: false,
                err: {
                    message: 'El ID no es correcto!!!'
                }
            });
        }
        res.json({
            ok: true,
            categoria: categoriaDB
        })
    });

});

/* ******* Crear nueva categoria ********  */
app.post('/categoria', verificaToken, (req, res) => {
    let body = req.body;
    //console.log('BODY: ', body);
    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    });
    //console.log('categoria: .. ', categoria);
    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                estado: false,
                err
            });
        }
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                estado: false,
                err
            });
        }
        //console.log('CategoriaDB: ', categoriaDB);
        res.json({
            ok: true,
            categoria: categoriaDB
        });
        //console.log('categoriaDB: ... ', categoriaDB);
    });

});

/* ******* Actualizar una categoria ********  */
app.put('/categoria/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    let body = req.body;

    let descCategoria = {
        descripcion: body.descripcion
    };

    Categoria.findByIdAndUpdate(id, descCategoria, { new: true, runValidators: true }, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                estado: false,
                err
            });
        }
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                estado: false,
                err
            });
        }
        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });
});

/* ******* Borrar una de las categorias ********  */
app.delete('/categoria/:id', [verificaToken, verificaAdmin_Role], (req, res) => {
    // solo un ADMIN puede borrar la categoria, eliminar fisicamente
    // Categoria.findByIdRemove....
    let id = req.params.id;
    Categoria.findByIdAndRemove(id, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                estado: false,
                err
            });
        }
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                estado: false,
                err: {
                    message: 'El ID no existe'
                }
            });
        }
        res.json({
            ok: true,
            message: 'Categoria borrada!!!'
        });
    });

});




module.exports = app;