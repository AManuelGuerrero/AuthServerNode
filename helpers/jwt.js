const jw = require("jsonwebtoken")


const generarJWT = (uid, name) =>{
    
    const payload = { uid,name};

    return new Promise((resolve,reyect)=>{

        jw.sign(payload,process.env.SECRET_JWT_SEED,{
            expiresIn: '24h'
        }, (err, token)=>{
            if(err){
                console.log(err);
                reyect(err);
            }else{
                resolve(token);
            }
        })

    });

    
}


module.exports = {
    generarJWT
}