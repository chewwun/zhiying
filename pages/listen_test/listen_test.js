// miniprogram/pages/listen_test/listen_test.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    badInputList: ['，', '。', '；', '‘', '“', '”', '【', '】', '（', '）', '、', '、', '《', '》', '—', '——', '￥', '~', '……', '…', '？', '！', '：', ' ', 'in', 'at', 'on', 'between', 'beside', 'near', 'from', 'to', 'under', 'behind', 'across', 'along', 'among', 'by', 'down', 'below', 'is', 'a', 'the'],
    answer: true,
    listen: false,
    id:'default'
  },
  back: function () {
    this.setData({
      answer: true,
      listen: false,

    })
  },
/*updateInput: function (e) {
    const characterSet = new Set()
    const questionset = []
    let answers = e.detail.value
    let words = e.detail.value.split(' ')
    console.log(words)
    for (let i = 0; i < words.length; ++i) {
      if (!this.data.badInputList.includes(words[i])) {
        characterSet.add(words[i])
      }
    }
   // console.log(characterSet)
    const characters = Array.from(characterSet)
    for (let i = 0; i < words.length; ++i) {
      //console.log(words[i])
      console.log(characters[0])
      if (words[i] == characters[0]) {
        console.log(1)
        questionset.push("***")
      }
      else if (words[i] == characters[1]) {
        questionset.push("***")
      }
      else if (words[i] == characters[5]) {
        questionset.push("***")
      }
      else{
        questionset.push(words[i])
      }


    }
   let question=[]
     let tmp=[]
    for (let i = 0; i < questionset.length; ++i) {

    
      tmp.push(questionset[i])
      // 如果是已经选中的，也添加到selectIdSet中
      /* if (item['type'] !== 'not-select') {
         selectIdSet.add(item['id'])
       }*/
  // 将打包好的一组数据装到expression中
  /*if(i>=4)
      {if (i %4 == 1 || i === questionset.length - 1) {
        question.push(tmp)
        tmp = []
      }}
    }
    
    this.setData({
      characters: characters,
      listentest:answers,
      questionset:question
    })
},*/
  download_listen:function(){
    var that=this
    wx.downloadFile({
      url: that.data.listen_sound, //仅为示例，并非真实的资源
      success(res) {
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        if (res.statusCode === 200) {
         console.log(res)
         wx.showLoading({
           title: '下载成功',
           icon:true
         })
        }
      }
    })
  },
  playvoice: function (srcc) {

    const innerAudioContext1 = wx.createInnerAudioContext()
    innerAudioContext1.autoplay = true
    innerAudioContext1.src = srcc

    innerAudioContext1.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext1.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
    //若答题正确播放音效，语音播放结束，开始下一题
    innerAudioContext1.onEnded(() => {





    })

  },
  wordsound: function () {
    var that = this
    var plugin = requirePlugin("WechatSI")

    plugin.textToSpeech({
      lang: "en_US",
      tts: true,
      content: this.data.answertxt,
      success: function (res) {
        console.log("succ tts", res.filename)
        that.playvoice(res.filename)
        that.setData({
          listen_sound:res.filename
        })
      },
      fail: function (res) {
        console.log("fail tts", res)
      }
    })
  },
  confirm: function () {
    this.setData({
      listen: true
    })
  },
  answer1: function () {
    var that=this
  this.setData({
    questiontxt:that.data.answertxt
  })
    this.onShow()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    if (wx.getStorageSync("id") == '') {
      this.setData({
        id: 'default'
      })
    } else {
      this.setData({
        id: wx.getStorageSync("id")
      })
    }
    console.log(this.data.id)
    this.getlisten()

    /* let manager = plugin.getRecordRecognitionManager()
     manager.onRecognize = function (res) {
       console.log("current result", res.result)
     }
     manager.onStop = function (res) {
       console.log("record file path", res.tempFilePath)
       console.log("result", res.result)
     }
     manager.onStart = function (res) {
       console.log("成功开始录音识别", res)
     }
     manager.onError = function (res) {
       console.error("error msg", res.msg)
     }
     manager.start({ duration: 30000, lang: "en_US" })*/
  },
  tingliji:function(){
    wx.navigateTo({
      url: '../listenbook/listenbook',
    })
  },
  shoucang:function(){
    wx.showToast({
      title: '收藏成功',

    })
    let v = this.data.answertxt
    db.collection('shoucang').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
        leibie: "listen",
        value: v




      },
      success: function (res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res)
      }
    })
  },
  getlisten: function () {


    var that = this
    //console.log("1")
    let id = that.data.id
    //console.log(id)
    let wordset1 = []
    db.collection('listenbook').where({
      _id: id
    }).get({
      success: function (res) {
        that.setData({
          answertxt: res.data[0].ciji.join(' '),
          questionset: res.data[0].ciji,

        })
        let currentquestionset = []
        //console.log(that.data.questionset)
        for (var i = 0; i < that.data.questionset.length; i++) {
          //console.log(words[i])
          //console.log(that.data.questionset[0])
          if (i == 1) {
            // console.log(1)
            currentquestionset.push("***")
          } else if (i == 3) {
            currentquestionset.push("***")
          } else if (i == 5) {
            currentquestionset.push("***")
          } else {
            currentquestionset.push(that.data.questionset[i])
          }


        }
        that.setData({
          questionset: currentquestionset,
          questiontxt:currentquestionset.join(' ')
        })

        console.log(currentquestionset)
        let tmp = []
        
        let question = []
        for (let i = 0; i < that.data.questionset.length; ++i) {
          tmp.push(that.data.questionset[i])
          // 如果是已经选中的，也添加到selectIdSet中
          /* if (item['type'] !== 'not-select') {
             selectIdSet.add(item['id'])
           }*/
          // 将打包好的一组数据装到expression中
          if (i >=4) {
            if (i % 4 == 3 || i === that.data.questionset.length - 1) {
              question.push(tmp)
              tmp = []
            }
          }
        }
        that.setData({
          questionset: question
        })
        /*console.log(that.data.wordset)
        that.setData({
          yin: that.data.wordset[0]
        })*/
      },
      fail: function (res) {
        console.log(res)
      }
    })



    that.onShow()








  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})