module.exports = class GetPayment {

  payUid(req, res) {
    let uid = randomValue(10, 99) + "1234567890234567" + randomValue(10, 99);
    res.render('payment', { uid: uid  });
  }
  
  payAction(req,res,next){
    // const uid = req.query.uid;
    // const totalPrice = Number(fetchData);

    let base_param = {
      MerchantTradeNo: payUid, //請帶20碼uid, ex: f0a0d7e9fae1bb72bc93
      MerchantTradeDate: onTimeValue(), //ex: 2017/02/13 15:45:30
      TotalAmount: '100',
      TradeDesc: '測試交易描述',
      ItemName: 'HouseCoffe網路購物',
      ReturnURL: 'https://team3-housecoffee-backend.herokuapp.com/payment',
      // ChooseSubPayment: '',
      OrderResultURL: 'https://team3-housecoffee-backend.herokuapp.com/payment/paymentactionresult',
      // NeedExtraPaidInfo: '1',
      // ClientBackURL: 'https://www.google.com',
      // ItemURL: 'http://item.test.tw',
      // Remark: '交易備註',
      // HoldTradeAMT: '1',
      // StoreID: '',
      // CustomField1: '',
      // CustomField2: '',
      // CustomField3: '',
      // CustomField4: ''
    };
    let invoice = {};
    let parameters = {};

    try {
      const ecpay_payment = require('./lib/ecpay_payment')
      const options = require('./conf/config-example'),
      create = new ecpay_payment(options);
      let htm = create.payment_client.aio_check_out_credit_onetime(parameters = base_param);
      res.send(htm)
      
    } catch (err) {
      // console.log(err);
      let error = {
          status: '500',
          stack: ""
      }
      res.render('error', {
          message: err,
          error: error
      })
    }
    
  }
}

// 隨機訂單ID
const randomValue = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
// const fetchData = async()=>{
//     const response = await fetch('https://team3-hosue-coffee-frontend-shungyun89.vercel.app/OnlineCheckPage2',);
//     const results = await response.json();  
//     return(results)       
// }



//example: 2017/08/09 20:34:02
const onTimeValue = function () {
  var date = new Date();
  var mm = date.getMonth() + 1;
  var dd = date.getDate();
  var hh = date.getHours();
  var mi = date.getMinutes();
  var ss = date.getSeconds();

  return [date.getFullYear(), "/" +
      (mm > 9 ? '' : '0') + mm, "/" +
      (dd > 9 ? '' : '0') + dd, " " +
      (hh > 9 ? '' : '0') + hh, ":" +
      (mi > 9 ? '' : '0') + mi, ":" +
      (ss > 9 ? '' : '0') + ss
  ].join('');
};