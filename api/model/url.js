const mongoose=require('mongoose')


const ShortUrl=new mongoose.Schema({
    short_url:{
        type:String
    },
    original_url:{
        type:String
    },
    clicks:{
        type:Number,
        
    }
},{
    timestamps:true
})

module.exports=mongoose.model('ShortUrl',ShortUrl)