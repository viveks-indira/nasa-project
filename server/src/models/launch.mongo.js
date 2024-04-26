const mongoose = require('mongoose');

const LaunchSchema = new mongoose.Schema(
    {
        flightNumber:{
            type : Number,
            required : true,
        },
        launchDate:{
            type: String,
            required:true,
        },
        mission:{
            type:String,
            required:true,
        },
        rocket:{
            type:String,
        },
        target:{
            type:String,
            required:true,
        },
        customers:[String], //Array of strings
        upcoming:{
            type:Boolean,
            required:true,
        },
        success:{
            type:Boolean,
            required:true,
            default:true,
        }
    }
);

module.exports =  mongoose.model('Launch',LaunchSchema);