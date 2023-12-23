const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types

const noticeSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    // category:{
    //     type:String,
    //     required:true
    // },
    postedBy: {
        type: ObjectId,
        ref: "USER"
    }
// })
}, { timestamps: true })


// 

mongoose.model("NOTICE", noticeSchema)