import mongoose from 'mongoose';
import Article from "./article.model.js";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 50,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 60,
        trim: true
    },
    fullName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator:function(value) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            }
        },
        lowercase: true
    },
    role: {
        type: String,
        enum: ['admin', 'writer', 'guest']
    },
    age: {
        type: Number,
        min: 1,
        max: 99
    },
    numberOfArticles: {
        type: Number,
        default: 0
    },
    articles: [{type: mongoose.Schema.Types.ObjectId, ref: 'Article'}],
    likedArticles: [{type: mongoose.Schema.Types.ObjectId, ref: 'Article'}]
}, {
    timestamps: true
});

userSchema.pre('save', function(next){
    this.fullName = `${this.firstName} ${this.lastName}`
    next()
})

userSchema.pre('validate', function(next){
    if(this.age < 0){
        this.age = 1
    }
    next()
})


const User = mongoose.model('User', userSchema);

export default User;
