const { response } = require("express");
const { validationResult } = require("express-validator");


const validarCampos = (req,resp = response,next) =>{
    const erros = validationResult(req);
    if(!erros.isEmpty()){
        return resp.status(400).json({
            ok: false,
            erros: erros.mapped()
        })
    }
    next();
}



module.exports = {
    validarCampos
}