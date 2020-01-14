

const searchwords = (word,successCallback, failCallback) => {
  wx.request({
    url: 'http://dict.youdao.com/jsonapi?jsonversion=2&client=mobile&q='+word+'&dicts=%7B%22count%22%3A99%2C%22dicts%22%3A%5B%5B%22ec%22%2C%22ce%22%2C%22newcj%22%2C%22newjc%22%2C%22kc%22%2C%22ck%22%2C%22fc%22%2C%22cf%22%2C%22multle%22%2C%22jtj%22%2C%22pic_dict%22%2C%22tc%22%2C%22ct%22%2C%22typos%22%2C%22special%22%2C%22tcb%22%2C%22baike%22%2C%22lang%22%2C%22simple%22%2C%22wordform%22%2C%22exam_dict%22%2C%22ctc%22%2C%22web_search%22%2C%22auth_sents_part%22%2C%22ec21%22%2C%22phrs%22%2C%22input%22%2C%22wikipedia_digest%22%2C%22ee%22%2C%22collins%22%2C%22ugc%22%2C%22media_sents_part%22%2C%22syno%22%2C%22rel_word%22%2C%22longman%22%2C%22ce_new%22%2C%22le%22%2C%22newcj_sents%22%2C%22blng_sents_part%22%2C%22hh%22%5D%2C%5B%22ugc%22%5D%2C%5B%22longman%22%5D%2C%5B%22newjc%22%5D%2C%5B%22newcj%22%5D%2C%5B%22web_trans%22%5D%2C%5B%22fanyi%22%5D%5D%7D&keyfrom=mdict.7.2.0.android&model=honor&mid=5.6.1&imei=659135764921685&vendor=wandoujia&screen=1080x1800&ssid=superman&network=wifi&abtest=2&xmlVersion=5.1',
    method: 'GET',

    success: res => {
      if (typeof (successCallback) === 'function') {
        successCallback(res)
      }
    },
    fail: res => {
      if (typeof (failCallback) === 'function') {
        failCallback(res)
      }
    }
  })
}
const getwords = (successCallback, failCallback) => {
  wx.request({
    url: 'https://api.ooopn.com/ciba/api.php?type=json',
    method: 'GET',

    success: res => {
      if (typeof (successCallback) === 'function') {
        successCallback(res)
      }
    },
    fail: res => {
      if (typeof (failCallback) === 'function') {
        failCallback(res)
      }
    }
  })
}
const upload=(filePath,word,successCallback) => {
  
    wx.showLoading({
      title: '等我一下',
    })
   
    wx.uploadFile({
      url: 'https://t02.io.speechx.cn:8443/MDD_Server/mdd_v18',
      filePath: filePath,
      name: 'myWavfile',
      header: {
        "Authorization": "Bearer " + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzcGVlY2h4X21kZCIsIlNpZ25lZEJ5IjoianN6aG9uZyIsIkVuZ2xpc2hMZXZlbCI6MywiaXNzIjoiYXV0aDAiLCJuR0JfVVMiOjAsImF1ZCI6Imd1ZXN0IiwiaXNGb3JDaGlsZCI6ZmFsc2UsIm5DbGllbnRJRCI6MTU3NTQ0ODczMCwibk1heENvbmN1cnJlbnRVc2VyIjowLCJQdWJsaXNoZXJOYW1lIjoiYmVpamluZ2RheHVlXzIwMTkxMjA0MTYzNzA2MzUzIiwiRmVlZEJhY2tUeXBlIjo2LCJleHAiOjE2MDc3ODg4NTAsImlhdCI6MTU3NTQ0ODczMH0.N45sdy7f - hORM8CLbl62YEJZsXj43h97UzrgWuMYLpg'
      },
      formData: {
        word_name: word
      },
      success: res => {
        wx.hideLoading();
        console.log(res)
        let scoreData = JSON.parse(res.data);
        console.log(scoreData);

        if (typeof (successCallback) === 'function') {
          successCallback(res)
        }
      },
      fail: res => {
        if (typeof (failCallback) === 'function') {
          failCallback(res)
        }
      }
      

    })
  }
  module.exports = {
  upload:upload,
  getwords:getwords,
  searchwords:searchwords
  }