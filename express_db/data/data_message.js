/**
 * Created by Rebecca_Han on 16/10/26.
 */


var index= {};
function getData(url, data, cb) {
  wx.request({
    url: rootDocment + url,
    data: data,
    method: 'get',
    header: { 'Content-Type': 'application/x-www-form-urlencoded' },
    success: function (res) {
      return typeof cb == "function" && cb(res.data)
    },
    fail: function () {
      return typeof cb == "function" && cb(false)
    }
  })
}
module.exports = {
  getData: getData
}  

module.exports.index = index;