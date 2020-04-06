import * as mongoose from 'mongoose';
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Bullet = require('./bullet')

const options = {
    collection: 'users',
    timestamps: true
}

const userSchema: mongoose.Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value: String) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
            return true;
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, options);

// export interface IUser extends mongoose.Document {
//     name: String,
//     email: String,
//     password: String,
//     tokens: []
// }

userSchema.virtual('bullets', {
    ref: 'Bullet',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.toJSON = function (): Object {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
}

userSchema.methods.generateAuthToken = async function (): Promise<String> {
    const user = this;
    const token: String = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);

    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
}

userSchema.statics.findByCredentials = async (email, password): Promise<Object> => {
    const user: any = await User.findOne({ email });

    if (!user) {
        throw new Error('Unable to login');
    }

    const isMatch: Boolean = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('Unable to login');
    }

    return user;
}

// Hash the plain text password before saving
userSchema.pre('save', async function (next): Promise<void> {
    const user: any = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
});

// Delete user tasks when user is removed
userSchema.pre('remove', async function (next): Promise<void> {
    const user: any = this;
    await Bullet.deleteMany({ owner: user._id });
    next();
});

const User = mongoose.model('user', userSchema);

module.exports = User;