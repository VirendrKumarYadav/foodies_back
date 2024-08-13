const userModal = require("../modals/user")
const authSchema = require("../authentication")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { use } = require("../router/user");


const userRgistration = async (req, res) => {
    const name = req.body.name
    const email = req.body.email
    const pass = req.body.password
    const hashedPassword = await bcrypt.hash(pass, 10);


    try {

        const newUser = new userModal({
            name: name,
            email: email,
            password: hashedPassword,
        })
        await newUser.save();
        res.json({
            success: true,
            massage: "User Sucessfully Resistered, Let's go to the Login Page!",
        });

    } catch (error) {
        res.status(404).json({
            success: false,
            massage: error.message
        });
    }

};

const userLogin = async (req, res) => {
    try {
        const user = await userModal.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid username or password",
            });
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);

        if (isMatch) {
            const expiryDateTime = Math.floor(new Date().getTime() / 1000) + 7200;
            const payload = {
                id: user._id,
                name: user.name,
                role: user.role,
                exp: expiryDateTime,
            };
            console.log(payload);

            // to generate toaken add payload and jwt secrate key
            const barearToken = jwt.sign(payload, process.env.JWT_SECRET_KEY)
            res.json({
                success: true,
                massage: "Login Sucessfully!",
                token: barearToken
            })

        } else {
            res.status(401).json({
                success: false,
                massage: "Invalid Credencials!"
            })
        }
    } catch (error) {
        res.status(401).json({ massage: error.message });
    }


}

const userLogout = async (req, res) => {
    try {
        const userAuth = await authSchema.findOne({
            email: req.body.email,
        })
        if (userAuth) {
            await authSchema.findOneAndDelete({
                email: req.body.email,
            })
        }

        res.clearCookie("refreshToken");
        res.json({
            success: true,
            massage: "User Logout Sucessfully !"
        });
    } catch (error) {
        res.json({
            success: false,
            massage: "Unable to logout Session !"
        });
    }

}

const getUserID = async (req, res) => {
    try {
        const userDetails = await userModal.find({
            $or: [
                {
                    username: req.body.username
                }, {
                    email: req.body.email
                }
            ]
        })
        res.json({
            success: true,
            massage: "User details",
            details: userDetails

        });
    } catch (error) {
        res.json({
            success: false,
            massage: "Unable to find the details!"
        });
    }
}

const getUserAuth = async (req, res) => {

    try {
        const userAuth = await authSchema.find()
        if (userAuth) {
            res.json({
                success: true,
                massage: "User auth details.",
                details: userAuth
            });
        } else {
            res.status(400).json({
                success: false,
                massage: "User auth details not present.",
                details: userAuth.stack
            });
        }


    } catch (error) {

        res.json({
            success: false,
            massage: "Unable to find the details!"
        });
    }
}
const updateUserDetails = async (req, res) => {

    try {
        const userDetails = await userModal.find({
            $or:
                [
                    {
                        username: req.body.username
                    },
                    {
                        email: req.body.email
                    }
                ]
        })
        if (userDetails) {

        }
        userDetails.update
        res.json({
            success: true,
            massage: "User details",
            details: userDetails

        });
    } catch (error) {
        res.json({
            success: false,
            massage: "Unable to find the details!"
        });
    }
}

module.exports = {
    userRgistration,
    userLogin,
    userLogout,
    getUserID,
    getUserAuth,
    updateUserDetails
}