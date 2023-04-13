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

// GET_____RANDOM_______

router.get("/random", async(req, res) => {
    const type = req.query.type;
    let movie;

        try {
            if(type === "series"){
                movie = await Movie.aggregate([
                    {
                        $match : { isSeries : true},
                    },
                    { $sample : { size: 1}},
                ]);
            }
            else {
                movie = await Movie.aggregate([
                    {
                        $match : { isSeries : false},
                    },
                    { $sample : { size: 1}},
                ]);
            }
            
            res.status(200).json(movie);
        } catch (error) {
            res.status(500).json("You are not allowed");
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



// GET ALL________

router.get("/", verify, async(req, res) => {
    
    if( req.user.isAdmin){
        
        try {
            const movies =  await Movie.find();
            res.status(200).json(movies.reverse());
        } catch (error) {
            res.status(500).json("You are not allowed to see all users..");
        }
    }
});


module.exports = router;