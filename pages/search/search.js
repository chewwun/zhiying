// miniprogram/pages/search/search.js
const app = getApp()
const db = wx.cloud.database()
const server = require('../../utils/server.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    s:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  shoucang: function () {
    wx.showToast({
      title: '收藏成功',

    })
    let v = this.data.yin
    db.collection('shoucang').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
        leibie: "word",
        value: v




      },
      success: function (res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res)
      }
    })
  },
  search: function () {
    this.setData({
      s:false
    })
    //wx.setStorageSync("city", this.data.textvalue)
   /* let search_city = this.data.textvalue
    console.log(search_city)
    console.log(this.data.citys)
    let city = this.data.citys
    let flag = false
    for (var i = 0; i < city.length; i++) {
      if (city[i] == search_city) {
        flag = true
        this.setData({
          citys: [this.data.textvalue]
        })
        break
      }
    }
    if (flag == false) {
      wx.showModal({
        title: '搜索城市不存在',
        content: '请您检查是否输入错误',
      })
    }*/
    const successCallback=res=>{
      console.log(res)
      let rel=[]
      
      for(let i=0;i<res.data.rel_word.rels.length;i++)
      {
       
        for (let t= 0; t < res.data.rel_word.rels[i].rel.words.length; t++)
        {
          console.log(res.data.rel_word.rels[i].rel.words.length)
          const item={
            "pos": res.data.rel_word.rels[i].rel.pos,
            "relword": res.data.rel_word.rels[i].rel.words[t].word,
            "reltran": res.data.rel_word.rels[i].rel.words[t].tran
          }
          
          rel.push(item)
        }
      }
      this.setData({
        relword:rel
      })

      console.log(this.data.relword)
      let wordshiyi=[]
      let wordyinbiao=''
      let input=''
      for(let n=0;n<res.data.ec.word[0].trs.length;n++)
      {
        input=res.data.input
        wordyinbiao = res.data.ec.word[0].ukphone
        wordshiyi[n] = res.data.ec.word[0].trs[n].tr[0].l.i[0]
      }
      this.setData({
        wordyinbiao:wordyinbiao,
        wordshiyi:wordshiyi,
        input:input
      })
      this.onShow()
    }
    server.searchwords(this.data.textvalue, successCallback)

    /*wx.redirectTo({
      url: '../weather/weather',
    })*/
  },
  input: function (e) {
    this.setData({
      textvalue: e.detail.value
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