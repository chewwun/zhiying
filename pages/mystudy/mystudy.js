// miniprogram/pages/mystudy/mystudy.js
const CHARTS = require('../../utils/wxcharts-min.js'); // 引入wx-charts.js文件

const db = wx.cloud.database()

const app = getApp()
const server = require('../../utils/server.js')
const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    let word=[]
   /* db.collection('mystudy').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        _id: 'id', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
        value: [50,70,70,70,50,50,70]



      },
      success: function (res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res)
      }
    })
    db.collection('listenstudy').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        _id: 'id', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
        value: [50, 70, 70, 70, 50, 50, 70]



      },
      success: function (res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res)
        db.collection('mystudy').get({

          success: function (res) {

            console.log(res)
            word = res.data.value


            let datavalue = [1, 2, 3, 4, 5, 6, 7]
            let line = {
              canvasId: 'lineGraph', // canvas-id
              type: 'line', // 图表类型，可选值为pie, line, column, area, ring
              categories: datavalue,
              series: [ // 数据列表
                {
                  name: '单词',
                  data: word,
                },

              ],
              yAxis: {
                min: 0 // Y轴起始值
              },
              width: 310,
              height: 200,
              dataLabel: true, // 是否在图表中显示数据内容值
              legend: true, // 是否显示图表下方各类别的标识
              extra: {
                lineStyle: 'curve' // (仅对line, area图表有效) 可选值：curve曲线，straight直线 (默认)
              }
            }
            new CHARTS(line);
            that.onShow()

          }, fail: function (res) {
            console.log(res)
          }
        })
      }
    })
   
    let listen=[]
    
    this.setData({
      word:word,
      listen:listen
    })
    console.log(word)*/
   
    let datavalue = [1, 2, 3, 4, 5, 6, 7];
    let word1=[50,70,70,70,50,70,70]
    let line = {
      canvasId: 'lineGraph', // canvas-id
      type: 'line', // 图表类型，可选值为pie, line, column, area, ring
      categories: datavalue,
      series: [ // 数据列表
        {
          name: '单词',
          data: word1,
        },

      ],
      yAxis: {
        min: 0 // Y轴起始值
      },
      width: 310,
      height: 200,
      dataLabel: true, // 是否在图表中显示数据内容值
      legend: true, // 是否显示图表下方各类别的标识
      extra: {
        lineStyle: 'curve' // (仅对line, area图表有效) 可选值：curve曲线，straight直线 (默认)
      }
    }
    new CHARTS(line);
    
    
    let listen1= [50, 50, 70, 50, 50, 70, 70]
    let line1 = {
      canvasId: 'lineGraph1', // canvas-id
      type: 'line', // 图表类型，可选值为pie, line, column, area, ring
      categories: datavalue,
      series: [ // 数据列表
        {
          name: '单词',
          data: listen1,
        },

      ],
      yAxis: {
        min: 0 // Y轴起始值
      },
      width: 310,
      height: 200,
      dataLabel: true, // 是否在图表中显示数据内容值
      legend: true, // 是否显示图表下方各类别的标识
      extra: {
        lineStyle: 'curve' // (仅对line, area图表有效) 可选值：curve曲线，straight直线 (默认)
      }
    }
    new CHARTS(line1);
 
    
  this.onShow()
  },
  shezhi:function(){
    wx.navigateTo({
      url: '../shezhi/shezhi',
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