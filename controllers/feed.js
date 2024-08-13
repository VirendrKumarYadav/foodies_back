const userFeed = require("../modals/feed")

const createfeedback = async (req, res) => {

    console.log(req.body);
    
    try {

        const newFeed = new userFeed(req.body)
        await newFeed.save();
        res.json({
            success: true,
            massage: "User Feeback created Sucessfully!"
        });

    } catch (error) {
        res.status(404).json({
            success: false,
            massage: error.message
        });
    }

};


module.exports = {
    createfeedback,
}