const Bullet = require('./bullet')
const {Schema} = require('dash-auth');
import * as mongoose from 'mongoose';

const userSchema = Schema;

userSchema.virtual('bullets', {
    ref: 'Bullet',
    localField: '_id',
    foreignField: 'owner'
})

// Delete user tasks when user is removed
userSchema.pre('remove', async function (next): Promise<void> {
    const user: any = this;
    await Bullet.deleteMany({ owner: user._id });
    next();
});

const User = mongoose.model('user', userSchema);//models.createUserModel(userSchema);

module.exports = User;