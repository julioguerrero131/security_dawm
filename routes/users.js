var express = require('express');
var router = express.Router();

let crypto = require('crypto');

const sequelize = require('../models/index.js').sequelize;
var initModels = require("../models/init-models");
var models = initModels( sequelize );  

/* GET users listing. */
router.get('/', async function(req, res, next) {
    
  let usersCollection = await models.users.findAll({ })
  
  res.render('crud', { title: 'CRUD with users', usersArray: usersCollection });
   
});

/* POST user. */
 /* 2. Cree el callback asíncrono que responda al método POST */
 router.post('/', async (req, res) => {

  /* 3. Desestructure los elementos en el cuerpo del requerimiento */
  let { name, password, idrole } = req.body;

  try {

    /* 4. Utilice la variable SALT para encriptar la variable password. */
    let salt = process.env.SALT
    let hash = crypto.createHmac('sha512', salt).update(password).digest("base64");
    let passwordHash = salt + "$" + hash

    /* 5. Guarde el registro mediante el método create */
    let user = await models.users.create({ name: name, password: passwordHash })

    /* 6. Redireccione a la ruta con la vista principal '/users' */
    res.redirect('/users')

  } catch (error) {

    res.status(400).send(error)

  }

})

module.exports = router;