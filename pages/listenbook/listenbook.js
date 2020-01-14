// miniprogram/pages/wordbook/wordbook.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    word: [],
    image: [],
    newadd: false,
    xiangxi: false,
    setword: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let wordname = []
    let imageurl = []
    let wordset = []
    var that = this
    db.collection('listenbook')

      .get({
        success: function (res) {
          console.log(res.data)
          console.log(res.data.length)
          for (var i = 0; i < res.data.length; i++) {
            console.log(res.data[i].name)
            imageurl[i] = 'cloud://prod-8aa9a5.7072-prod-8aa9a5-1257798914/listenset/' + res.data[i].name + res.data[i].imageleixing
            wordname[i] = res.data[i].name
            wordset[i] = res.data[i].ciji
          }
          console.log(wordname)
          // console.log(that)
          that.setData({
            word: wordname,
            image: imageurl,
            setword: wordset


          })

        }


      })
  },
  addciben: function () {
    this.setData({
      newadd: true
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  addimage: function () {
    var that = this
    wx.chooseImage({
      count: 1,
      type: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        //const tempFilePaths = res.tempFile[0].name
        console.log(res)
        //const imagefilePath = res.tempFiles[0].path
        that.setData({
          imagepath: res.tempFiles[0].path
        })

        console.log(that.data.imagepath)


      }


    })


  },
  quxiao: function () {
    this.setData({
      newadd: false
    })
  },
  inputwordname: function (e) {
    this.setData({
      wordname: e.detail.value
    })

  },
  inputwordleibie: function (e) {
    this.setData({
      wordleibie: e.detail.value
    })
  },
  tianjia: function () {

    var that = this
    db.collection('listenbook').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
        name: that.data.wordname,
        leibie: that.data.wordleibie,
        imageleixing: that.data.imagepath.match(/\.[^.]+?$/)[0],




      },
      success: function (res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res)
      
      }
    })

    this.setData({
      newadd: false
    })





    const cloudPath = "listenset/" + that.data.wordname + that.data.imagepath.match(/\.[^.]+?$/)[0]

    const filePath = that.data.imagepath
    console.log(that.data.imagepath)
    //console.log(imagePath1)
    wx.cloud.uploadFile({
      cloudPath,
      filePath,
      success: res => {
        console.log('[上传文件] 成功：', cloudPath, res)
        wx.showToast({
          title: '听力集创建成功',
        })

      },
      fail: e => {
        console.error('[上传文件] 失败：', e)
        wx.showToast({
          icon: 'none',
          title: '上传失败',
        })
      },
      complete: () => {

        that.onShow()
      }
    })



  },
  click: function (e) {
    console.log(e.currentTarget.id)
    var that = this
    this.setData({
      xiangxi: true,
      currentwordbookname: that.data.word[e.currentTarget.id]
    })
    wx.setStorageSync("id", this.data.currentwordbookname)
  },
  deleteImage: function (e) {
    var that = this
    wx.showModal({
      title: "请问确定要删除" + that.data.word[e.currentTarget.id] + "听力集",

      success: function (res) {
        console.log(res)
        if (res.confirm) {
          let deleteid = that.data.word[e.currentTarget.id]
          db.collection('listenbook').doc(deleteid).remove().then(res => {
            console.log(res)
            wx.showToast({
              title: '删除成功',
            })
            that.onShow()
          })
        }
      }
    })

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let wordname = []
    let imageurl = []
    let wordset = []
    var that = this
    db.collection('listenbook')

      .get({
        success: function (res) {
          console.log(res.data)
          console.log(res.data.length)
          for (var i = 0; i < res.data.length; i++) {
            console.log(res.data[i].name)
            imageurl[i] = 'cloud://prod-8aa9a5.7072-prod-8aa9a5-1257798914/listenset/' + res.data[i].name + res.data[i].imageleixing
            wordname[i] = res.data[i].name
            wordset[i] = res.data[i].ciji
          }
          console.log(wordname)
          // console.log(that)
          that.setData({
            word: wordname,
            image: imageurl,
            setword: wordset


          })

        }


      })
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