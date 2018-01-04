
export default {
  createTime(tt){
    var time = new Date(parseInt(tt.slice(6, 19)))
    //tt.replace(/Date\([\d+]+\)/, function(a) { eval('d = new '+a) });
    var y = time.getFullYear();
      var m = time.getMonth() + 1;
      m = m < 10 ? ('0' + m) : m;
      var d = time.getDate();
      d = d < 10 ? ('0' + d) : d;
      var h = time.getHours();
      var minute = time.getMinutes();
      minute = minute < 10 ? ('0' + minute) : minute;
      var seconds = time.getSeconds();
      seconds = seconds < 10 ? ('0' + seconds) : seconds;
      return y + '-' + m + '-' + d+' '+h+':'+minute;
  },
  getCommonTime(milliseconds) {
    var time = new Date(milliseconds)
    //tt.replace(/Date\([\d+]+\)/, function(a) { eval('d = new '+a) });
    var y = time.getFullYear();
      var m = time.getMonth() + 1;
      m = m < 10 ? ('0' + m) : m;
      var d = time.getDate();
      d = d < 10 ? ('0' + d) : d;
      var h = time.getHours();
      var minute = time.getMinutes();
      minute = minute < 10 ? ('0' + minute) : minute;
      var seconds = time.getSeconds();
      seconds = seconds < 10 ? ('0' + seconds) : seconds;
      return y + '-' + m + '-' + d;
  },
  getCommonTime1(milliseconds){
    var time = new Date(milliseconds),
        time_ = new Date(),
        time1 = time.getTime(time),//发布时间
        time_1 = time_.getTime(time_),//现在时间
        jTime = time_1 - time1,
        days    = jTime / 1000 / 60 / 60 / 24,
        daysRound   = Math.floor(days),
        hours    = jTime/ 1000 / 60 / 60 - (24 * daysRound),
        hoursRound   = Math.floor(hours),
        minutes   = jTime / 1000 /60 - (24 * 60 * daysRound) - (60 * hoursRound),
        minutesRound  = Math.floor(minutes),
        seconds   = jTime/ 1000 - (24 * 60 * 60 * daysRound) - (60 * 60 * hoursRound) - (60 * minutesRound),
        secondsRound = Math.floor(seconds);
    if(daysRound>0){
        return this.getCommonTime(milliseconds)
    }else{
      if(hoursRound>0){
        return hoursRound+"小时前";
      }else{
        if(minutesRound>10){
          return minutesRound+"分钟前";
        }else{
          if(secondsRound>0){
            return "刚刚";
          }
        }
      }
    }
  },
  getTime(tt){
    let t = tt
    if (t) {
      var time = t.split('+')[0]
      time = time.replace('T', ' ')
      return time
    } else {
      return t
    }
  },
  fetchAjaxPOST (url, data) {
    var domain = 'http://api.55lover.com/'
    fetch(domain + url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: data
    })
  },
  fetchAjaxGET (url) {
    var domain = 'http://api.55lover.com/'
    return fetch(domain + url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
  }
}
