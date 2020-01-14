// pages/upload_page/upload_page.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    word: false,
    selectedTab: "word",
    badInputList: ['，', '。', '；', '‘', '“', '”', '【', '】', '（', '）', '、', '、', '《', '》', '—', '——', '￥', '~', '……', '…', '？', '！', '：', ' ', 'in', 'at', 'on', 'between', 'beside', 'near', 'from', 'to', 'under', 'behind', 'across', 'along', 'among', 'by', 'down', 'below', 'a', 'the', 'is', 'In'],
    sign: ['.', '?', '!', ','],
    wordset: true,
    newaddd: false,
    imagepath: '',
    filenewwords: [],
    wordshuzu: '',
    xianqian: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },
  clickTab1: function() {
    this.setData({
      selectedTab: "word",
      word: false
    })

  },
  clickTab2: function() {
    this.setData({
      selectedTab: "listen",
      word: true

    })

  },
  addimage: function() {
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
  inputwordname: function(e) {
    this.setData({
      wordname: e.detail.value
    })

  },
  inputwordleibie: function(e) {
    this.setData({
      wordleibie: e.detail.value
    })
  },
  upload_file: function() {
    var that = this

    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        //const tempFilePaths = res.tempFile[0].name
        console.log(res)

        that.setData({
          newWords: res.tempFiles[0].name
        })

        wx.getFileSystemManager().readFile({
          filePath: res.tempFiles[0].path,
          encoding: 'utf-8',
          success: res => {
            console.log(res.data)
            //返回临时文件路径    
            let characterSet = new Set()
            let words = res.data.trim().split(' ')
            for (let i = 0; i < words.length; ++i) {
              let flag = false
              if (!that.data.badInputList.includes(words[i])) {

                for (var t = 0; t < that.data.sign.length; t++) {
                  if (words[i].indexOf(that.data.sign[t]) >= 0) {
                    console.log(words[i])
                    flag = true

                    words[i] = words[i].split(that.data.sign[t])[0]
                    if (words[i] !== "") {
                      characterSet.add(words[i])
                    }
                  }
                }

                if (flag == false) {
                  if (words[i] !== "") {
                    console.log(words[i])
                    characterSet.add(words[i])
                  }
                }



              }
            }

            const characters = Array.from(characterSet)
            //console.log(characters)
            that.setData({
              filenewWords: characters
            })

            that.setData({
              add: true
            })
          },
          fail: console.error
        })

      }


    })



  },


  upload_lfile: function() {
    var that = this
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        //const tempFilePaths = res.tempFile[0].name
        console.log(res)
        wx.cloud.uploadFile({

          filePath: res.tempFiles[0].path,
          name: 'uploadFile',
          success(res) {
            //json字符串 需用JSON.parse 转   
          }
        })

      }
    })


  },
  confirmback: function() {
    this.setData({
      add: false
    })
  },
  addnew: function() {
    this.setData({
      add: false,
      newadd: true
    })

  },
  tianjia: function() {
    var that = this
    console.log(wx.getStorageSync("currentbook"))
    console.log(that.data.filenewWords)
    db.collection('wordbook').where({
      _id: wx.getStorageSync("currentbook")
    }).get({
      success: function(res) {
        console.log("xianqian")
        console.log(res.data[0].ciji.length)
        that.setData({
          xianqian: res.data[0].ciji
        })
        console.log(that.data.xianqian)
        db.collection('wordbook').doc(wx.getStorageSync("currentbook")).update({
          // data 字段表示需新增的 JSON 数据
          data: {
            ciji: that.data.filenewWords.concat(that.data.xianqian),
          },
          success: function (res) {
            // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
            console.log(res)
          },
          fail: function (res) {
            // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
            console.log(res)
          }
        })
      }
    })

    that.setData({
      filenewWords: that.data.filenewWords
    })
    
   

    this.setData({
      add: false
    })





    /*const cloudPath = "wordset/" + that.data.wordname + that.data.imagepath.match(/\.[^.]+?$/)[0]

    const filePath = that.data.imagepath
    console.log(that.data.imagepath)
    //console.log(imagePath1)
    wx.cloud.uploadFile({
      cloudPath,
      filePath,
      success: res => {
        console.log('[上传文件] 成功：', cloudPath, res)
        wx.showToast({
          title: '单词本创建成功',
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

        wx.navigateTo({
          url: '../wordbook/wordbook',
        })
      }
    })*/



  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },
  updateInput: function(e) {
    var that = this
    const characterSet = new Set()

    let words = e.detail.value.trim().split(' ')
    //console.log(words)

    for (let i = 0; i < words.length; i++) {
      if (!this.data.badInputList.includes(words[i])) {
        let flag = false
        for (var t = 0; t < this.data.sign.length; t++) {

          for (var t = 0; t < that.data.sign.length; t++) {
            if (words[i].indexOf(that.data.sign[t]) >= 0) {
              console.log(words[i])
              flag = true

              words[i] = words[i].split(that.data.sign[t])[0]
              if (words[i] !== "") {
                characterSet.add(words[i])
              }
            }
          }
        }
        if (flag == false) {
          if (words[i] !== "") {
            console.log(words[i])
            characterSet.add(words[i])
          }
        }

      }
    }
    const characters = Array.from(characterSet)
    console.log(characters)
    that.setData({
      filenewWords: characters

    })
    console.log(this.data.filenewWords)


  },
  confirmadd: function() {

    /* let selectIdSet = this.data.selectIdSet
     if (!selectIdSet) {
       selectIdSet = new Set()
     }
     console.log(this.data.newWords)
     let tmp = []
     const characters = []
     if (!this.data.newWords) {
       wx.showModal({
         title: '请输入想要上传的文本',
         content: '',
       })
     } else {
       for (let i = 0; i < this.data.newWords.length; ++i) {
 
         const item = {
 
           'content': this.data.newWords[i],
 
           'cssClass': 'not-select'
         }
         // 如果这项已经选过，那么就设置相应的属性
         if (selectIdSet.has(item['content']) && item['cssClass'] === 'not-select') {
           item['cssClass'] = 'select-not-learned'
         }
         if (this.data.flagSelectallAll == true) {
           item['cssClass'] = 'select-not-learned'
           selectIdSet.add(item['content'])
 
         }
         tmp.push(item)
         // 如果是已经选中的，也添加到selectIdSet中
         /* if (item['type'] !== 'not-select') {
            selectIdSet.add(item['id'])
          }*/
    // 将打包好的一组数据装到expression中
    /* if (i % 2 === 1 || i === this.data.newWords.length - 1) {
       characters.push(tmp)
       tmp = []
     }
   }
   this.setData({
     chooseword: true,
     characters: characters,
     wordset: false,
   })
 }*/
    this.setData({
      add: true
    })

},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})