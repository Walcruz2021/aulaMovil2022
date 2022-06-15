


const verifyToken=(req,res,next)=>{
  const bearerHeader=req.headers["authorization"];
  if(typeof bearerHeader !=="undefined"){
    console.log("ingreso aqui")
    const bearerToken=bearerHeader.split(" ")[1];
    req.token=bearerToken;
    next()
  }
  else{
    console.log("ingreso en el else")
    res.sendStatus(403)
  }
  
}


module.exports={
    verifyToken
}