const router = require("express").Router();
const Movie = require("../models/Movie");
const verify = require("../verifyToken");


// CREATE_________

router.post("/", verify, async(req, res) => {
    if (req.user.isAdmin) {
        const newMovie = new Movie(req.body);

        try {
            const saveMovie = await newMovie.save();
            res.status(200).json(saveMovie);

        } catch (error) {
            res.status(500).json('You are not allowed');
        }
    }
});


// UPDATE_________

router.put("/:id", verify, async(req, res) => {
    if (req.user.isAdmin) {
        

        try {
            const updateMovie = await Movie.findByIdAndUpdate(req.params.id, {
                $set : req.body,
            }, { new : true })
           res.status(200).json(updateMovie);

        } catch (error) {
            res.status(500).json('You are not allowed');
        }
    }
});

// DELETE________


router.delete("/:id", verify, async(req, res) => {
    if (req.user.isAdmin) {
        
        try {
            const deleteMovie = await Movie.findByIdAndDelete(req.params.id);
            res.status(200).json(deleteMovie);

        } catch (error) {
            res.status(500).json(error);
        }
    }
});


// get___________


router.get("/:id", verify, async(req, res) => {
    if (req.user.isAdmin) {
        
        try {
            const getMovie = await Movie.findById(req.params.id);
            res.status(200).json(getMovie);

        } catch (error) {
            res.status(500).json(error);
        }
    }
});


// GET_____RANDOM_______

router.get("/random", async(req, res) => {
    const type = req.query.type;
    let movie;

        try {
            if(type === "series"){
                movie = Movie.aggregate([
                    {
                        $match : { isSeries : true},
                    },
                    { $sample : { size: 1}},
                ]);
            }
            else {
                movie = Movie.aggregate([
                    {
                        $match : { isSeries : false},
                    },
                    { $sample : { size: 1}},
                ]);
            }
            
            res.status(200).json(movie);
        } catch (error) {
            res.status(500).json("not working");
        }
    
});

// GET ALL________

// router.get("/", verify, async(req, res) => {
//     const query = req.query.new;
//     if( req.user.isAdmin){
        
//         try {
//             const users = query ?  await User.find().limit(10) : await User.find();
//             res.status(200).json(users);
//         } catch (error) {
//             res.status(500).json("You are not allowed to see all users..");
//         }
//     }
// });


// GET USER STATS__

// router.get("/stats" , async (req, res) => {
//     // const today = new Date();
//     // const lastYear = today.setFullYear(today.setFullYear() - 1)
//     // console.log(lastYear);

//     // const monthsArray = [
//     //     "January", "February", "March", "April", "May", "June", "july", "August", "September", "October", "November", "December"
//     // ];

//     try {
//         const data = await User.aggregate([
//             {
//                 $project: {
//                     month : { $month : "$createdAt"}
//                 }
//             },
//             {
//                 $group : {
//                     _id: "$month",
//                     total: { $sum: 1 },
//                 },
//             },
//         ]);
//         res.status(200).json(data);
        
//     } catch (error) {
//         res.status(500).json(error)
//     };
    
// })
module.exports = router;