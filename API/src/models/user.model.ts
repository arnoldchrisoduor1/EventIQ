import mongoose from "mongoose";

let profile_imgs_name_list = ["Garfield", "Tinkerbell", "Annie", "Loki", "Cleo", "Angel", "Bob", "Mia", "Coco", "Gracie", "Bear", "Bella", "Abby", "Harley", "Cali", "Leo", "Luna", "Jack", "Felix", "Kiki"];
let profile_imgs_collections_list = ["notionists-neutral", "adventurer-neutral", "fun-emoji"];

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true,
    },
    lastLogin: {
        type: Date,
        default: Date.now
    },
    mobilenumber :{
        type: String,
        default: "Not Available"
    },
    address : {
        type: String,
        default: "Not Available"
    },
    occupation : {
        type: String,
        default: "Not Avilable"
    },
    google_auth: {
        type: Boolean,
        default: false
    },
    profileImage: {
        type: String,
        default: () => {
            return `https://api.dicebear.com/6.x/${profile_imgs_collections_list[Math.floor(Math.random() * profile_imgs_collections_list.length)]}/svg?seed=${profile_imgs_name_list[Math.floor(Math.random() * profile_imgs_name_list.length)]}`
        } 
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    social_links: {
        youtube: {
            type: String,
            default: "Not Available",
        },
        instagram: {
            type: String,
            default: "Not Available",
        },
        facebook: {
            type: String,
            default: "Not Available",
        },
        twitter: {
            type: String,
            default: "Not Available",
        },
        website: {
            type: String,
            default: "Not Available",
        }
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);