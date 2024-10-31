
const adminAuth = (req , res , next) => {
    console.log("admin auth is checked");
    const token = "abc";
    const tokeauthor = token === "abdc";
    if (!tokeauthor) {
        console.log("not authorised");
        res.status(481).send("not authorized");
        
    }
    else{
        next();
    }
}

module.exports = {
    adminAuth,
}