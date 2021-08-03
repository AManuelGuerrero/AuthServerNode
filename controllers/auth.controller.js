const { response, request } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


const  crearUsuario =async (req, resp = response)=>{

    const {email,password,name} = req.body;

    try {

        //Verificar el email unico
        const usuario = await Usuario.findOne({email});

        if(usuario){
            return resp.status(404).json({
                ok: false,
                mfg: 'EL usuario ya existe con ese email'
            });
        }

        //Crear el usuario con el modelo
        const dbUser = new Usuario(req.body);

        //Hashear la contraseña
        const salt = bcrypt.genSaltSync();
        dbUser.password = bcrypt.hashSync(password, salt);

        //General el JWT
        const token = await generarJWT(dbUser.id,name);

        //Crear usuario de DB
        await dbUser.save();

        //Generar respuesta exitosa
        return resp.status(201).json({
            ok: true,
            uid: dbUser.id,
            name,
            token
        });
        
    } catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
    
  
}

const loginUsuario =  async (req, resp = response)=>{

    const {email,password} = req.body;

    try {

        const usuarioDB = await Usuario.findOne({email});
        
        if(!usuarioDB){
            return resp.status(400).json({
                ok: false,
                msg: 'El correo no existe'
            });
        }

        const validPassword = bcrypt.compareSync(password, usuarioDB.password);

        if(!validPassword){
            return resp.status(400).json({
                ok:false,
                msg: 'El password no es válido'
            });
        }

        const token = await generarJWT(usuarioDB.id,usuarioDB.name);

        return resp.status(200).json({
            ok: true,
            uid: usuarioDB.id,
            name: usuarioDB.name,
            token
        })
        
    } catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Hable con el administrador',
        });
    }
}

const revalidarToken = async (req = request, resp = response)=>{
    const { uid ,name } = req;
    const token = await generarJWT(uid,name);
    return resp.json({
        ok: true,
        uid,
        name,
        token
    });
}



module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}