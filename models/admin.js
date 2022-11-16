const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const AdminSchema = new Schema({

    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        default: "admin",

    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    pp: {
        type: String,
        required: true,

    },
},
    {
        timestamps: true,
    }

)
//hash the password before save
AdminSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});
AdminSchema.methods.comparePassword = async function (candidatePass) {
    return await bcrypt.compare(candidatePass, this.password);
};
module.exports = mongoose.model("GreenCodesAdmin", AdminSchema);