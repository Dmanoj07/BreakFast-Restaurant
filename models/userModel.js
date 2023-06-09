const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isclerk: {
        type: Boolean,
        required: false
    },
    userCart: {
        type: Array,
        required: false
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    }

});

userSchema.pre("save", function (next) {
    let user = this;

    //generate a unique salt

    bcrypt.genSalt(10)
        .then(salt => {
            // hash the password using the generated salt
            bcrypt.hash(user.password, salt)
                .then(hashedPwd => {
                    //update the user model before we save it to database
                    user.password = hashedPwd;
                    next();

                })
                .catch(err => {
                    console.log(`Error occured when hashing...${err}`);
                })
        })
        .catch(err => {
            console.log(`Error occurred when salting ...${err}`)
        });
});

const userModel = mongoose.model("users", userSchema)
module.exports = userModel;