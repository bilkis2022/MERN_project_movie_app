const router = require("express").Router();
const User = require("../models/user");
const CryptoJS = require("crypto-js");
const verify = require("../verifyToken");



// UPDATE_________

router.put("/:id", verify, async(req, res) => {
    if(req.user.id === req.params.id || req.user.isAdmin){
        if(req.body.password){
            req.body.password = CryptoJS.AES.encrypt(
                req.body.password,
                process.env.secret_pass_key
              ).toString();
        }

        try {
            const updateuser = await User.findByIdAndUpdate(req.params.id, {
                $set : req.body,
            }, {new: true});
            res.status(200).json(updateuser);
        } catch (error) {
            res.status(500).json("You can update only your account..");
        }
    }
});

// DELETE_________

router.delete("/:id", verify, async(req, res) => {
    if(req.user.id === req.params.id || req.user.isAdmin){
        

        try {
             await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User has been deleted....");
        } catch (error) {
            res.status(500).json("You can delete only your account..");
        }
    }
});

// GET____________

router.get("/find/:id", async(req, res) => {
    

        try {
            const user = await User.findById(req.params.id);
            const { password, ...info} = user._doc;
            res.status(200).json(info);
        } catch (error) {
            res.status(500).json("You can update only your account..");
        }
    
});

// GET ALL________

router.get("/", verify, async(req, res) => {
    const query = req.query.new;
    if( req.user.isAdmin){
        
        try {
            const users = query ?  await User.find().limit(10) : await User.find();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json("You are not allowed to see all users..");
        }
    }
});


// GET USER STATS__

router.get("/stats" , async (req, res) => {
    // const today = new Date();
    // const lastYear = today.setFullYear(today.setFullYear() - 1)
    // console.log(lastYear);

    // const monthsArray = [
    //     "January", "February", "March", "April", "May", "June", "july", "August", "September", "October", "November", "December"
    // ];

    try {
        const data = await User.aggregate([
            {
                $project: {
                    month : { $month : "$createdAt"}
                }
            },
            {
                $group : {
                    _id: "$month",
                    total: { $sum: 1 },
                },
            },
        ]);
        res.status(200).json(data);
        
    } catch (error) {
        res.status(500).json(error)
    };
    
})
module.exports = router;