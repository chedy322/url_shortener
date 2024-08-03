const express=require('express')
const router=express.Router()

const {getUrlByid,CreateUrl,getAllurl}=require('../controllers/url')
router.route('/').get(getAllurl)
router.route('/').post(CreateUrl)
router.route('/:url').get(getUrlByid)

module.exports=router