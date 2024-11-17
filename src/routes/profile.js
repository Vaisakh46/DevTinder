const express = require("express");
const profileRouter = express.Router();
const { validateProfileEditData } = require("../utils/validation");
const { userAuth } = require("../middlewares/auth");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});


profileRouter.patch('/profile/edit',userAuth,async (req,res)=>{
  try{

    if (!validateProfileEditData(req)) {
      throw new Error('invalid Edit request')
    }

    const loggedInUser = req.user 
    
    Object.keys(req.body).forEach((kery) => (loggedInUser[key] = req.body[key]))
    await loggedInUser.save();

    res.send('Saved Successfully')
  }
  catch(err){
    res.status(400).send('ERROR')
  }
  
  
})

module.exports = profileRouter;