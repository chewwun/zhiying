// miniprogram/pages/like_page/like_page.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    likeword:[],
    likelisten:[],
    selectedTab:"word",
    shoucangword:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },
  clickTab1:function(){
    this.setData({
      shoucangword:false,
      selectedTab:'word'
    })
  },
  clickTab2:function(){
    this.setData({
      shoucangword:true,
      selectedTab:'listen'
    })
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
    var that = this
    let word = []
    let listen=[]
    db.collection('shoucang').where({
      leibie: "word"
    }).get({
      success: function (res) {
        console.log(res.data)
        for (var i = 0; i < res.data.length; i++) {
          console.log(res.data[i].value)
          word[i]=res.data[i].value
        }
        console.log(word)
        that.setData({
          likeword: word
        })
        console.log(that.data.likeword)
      }, fail: function (res) {
        console.log(res)
      }
    })
    db.collection('shoucang').where({
      leibie: "listen"
    }).get({
      success: function (res) {
        console.log(res.data)
        for (var i = 0; i < res.data.length; i++) {
          console.log(res.data[i].value)
          listen[i] = res.data[i].value
        }
        console.log(listen)
        that.setData({
          likelisten: listen
        })
        console.log(that.data.likelisten)
      }, fail: function (res) {
        console.log(res)
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