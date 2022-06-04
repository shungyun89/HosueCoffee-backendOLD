const express = require('express');
const router = express.Router();
const multer = require('multer');
const db = require('../../modules/mysql_config');
const upload = multer();
require("dotenv").config();



router.route('/odList')
//^查詢本帳號訂單^
    .get(async(req,res,next)=>{
        const sql=
        "select o_id,fk_member_id,order_condition,CREATEd_at from orders where fk_member_id=?"; 
        const [datas]=await db.query(sql,[req.query.fk_member_id]);
        res.json(datas);

    })

router.route('/odList/detailed3')
//^查詢訂單前三筆資料(用於列表照片)^
    .get(async(req,res,next)=>{
        const sql=
        "select p_name from order_detail join orders  on order_detail.fk_o_id=orders.o_id join products  on order_detail.fk_p_id=products.p_id  where o_id=? LIMIT 3"; 
        const [datas]=await db.query(sql,[req.query.o_id]);
        res.json(datas);

    })

router.route('/odList/detailed')
//^查詢訂單 商品名 商品價格 商品數列 商品id^
    .get(async(req,res,next)=>{
        const sql=
        "select p_name,p_price,qty ,p_id from order_detail join orders  on order_detail.fk_o_id=orders.o_id join products  on order_detail.fk_p_id=products.p_id where o_id=?"; 
        const [datas]=await db.query(sql,[req.query.o_id]);
        res.json(datas);
        // console.log(datas)

    })

router.route('/odList/detailed/count')
//^查詢此訂單購買多少項商品^
    .get(async(req,res,next)=>{
        const sql=
        "select count(*) as total from order_detail where fk_o_id=?"; 
        const [datas]=await db.query(sql,[req.query.fk_o_id]);
        res.json(datas[0]);

    })

router.route('/')
//^查詢本訂單所有基本資料^
    .get(async(req,res,next)=>{
        console.log(req.query.o_id)
        const sql=
        "select * from orders where o_id=?"; 
        const [datas]=await db.query(sql,[req.query.o_id]);
        // console.log(datas)
        res.json(datas);
    })


module.exports = router;