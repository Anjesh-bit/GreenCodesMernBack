const AdminSchema = require('../models/admin');
const HanlderAsync = require('express-async-handler');
const generateToken = require('../config/generateToken');
const GreenAdminRegistration = HanlderAsync(async (req, res) => {
    const { name, email, role, username, password, pp } = req.body;
    const isExists = await AdminSchema.findOne({ email });
    if (isExists) {
        res.status(400).json("User Already Exists")
        return;
    }
    const admin = await AdminSchema({
        name,
        email,
        role,
        username,
        password,
        pp
    })
    await admin.save((error, data) => {
        if (data) {
            res.status(201).json({
                id: admin.id,
                name: admin.name,
                email: admin.email,
                role: admin.role,
                pp: admin.pp,
                username: admin.username,
                token: generateToken(admin.id),
            })
        }
        if (error) {
            res.status(400).json({
                error: "Unable to save the data"
            })
        }
    })
})
const GreenAdminLogin = HanlderAsync(async (req, res) => {
    const { email, password } = req.body;
    const user = await AdminSchema.findOne({ email });

    if (user && (await user.comparePassword(password))) {

        res.status(201).json({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            pp: user.pp,
            username: user.username,
            token: generateToken(user.id),
        })


    }
    else {
        res.status(400).json({
            error: "Email/Password is invalid"
        })
    }


}
)


module.exports = { GreenAdminRegistration, GreenAdminLogin };