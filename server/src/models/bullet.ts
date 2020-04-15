import * as mongoose from 'mongoose';

const options =  { 
    collection: 'bullets', 
    discriminatorKey: '_type', 
    timestamps: true
}

// Schemas
const bulletSchema: mongoose.Schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type:String
    },
    anchorDate: {
        // Date to tie the bullet to the calendar
        type: Date,
        required: true,
        default: Date.now,
        index: true
    },
    notes: [String],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, options);

bulletSchema.pre('save', async function(next): Promise<void> {
    const bullet: any = this;
    const userBullets = await Bullet.find({owner: bullet.owner});
    if(process.env.MAX_BULLETS && userBullets.length >= parseInt(process.env.MAX_BULLETS))
        throw new Error("User has hit maximum number of bullets, delete some to add more.");
    next();
});

const Bullet = mongoose.model('bullet', bulletSchema);

module.exports = Bullet;