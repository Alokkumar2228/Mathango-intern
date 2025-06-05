const adminAuth = (req,res,next) =>{
    const adminApiKey = process.env.ADMIN_API_KEY;

    const userApiKey = req.headers['x-api-key'];

    if(userApiKey === adminApiKey){
        next();
    }else{
        res.status(401).json({message:"Only admin can access"});
    }
}

export default adminAuth;