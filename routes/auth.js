const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { validaJWT } = require('../middlewares/validar-jwt');

const router = Router();


//Crear nuevo usuario
router.post('/new',[
    check('email','El email es obligatorio').isEmail(),
    check('password','La contraseña es obligatoria').isLength({min:6}),
    check('name','EL nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearUsuario);

//Login usuario
router.post('/', [
    check('email','El email es obligatorio').isEmail(),
    check('password','La contraseña es obligatoria').isLength({min:6}),
    validarCampos
],loginUsuario);

//Validar y revalidar tokenn 
router.get('/renew',[
    validaJWT
], revalidarToken);




module.exports = router;