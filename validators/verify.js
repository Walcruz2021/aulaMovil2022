var jwt = require("jsonwebtoken");

function verify(){
    jwt.verify(req.token, "secret", (err, authData) => {
        if (err) {
            res.sendStatus(403)
        } else {
            res.json({
                mensaje: "Alumno Permitido Ver",
                authData: authData
            })
        }
    })
} 


module.exports = {
    verify
}