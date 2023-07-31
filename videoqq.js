const chavy = init()
const cookieName = '腾讯视频'
const KEY_signcookie = '
qq_domain_video_guid_verify=c3e131840b1ca24c; video_platform=2; video_platform=2; video_guid=c3e131840b1ca24c; pgv_info=ssid=s3071756404; pgv_pvid=8207364536; _qpsvr_localtk=0.10792030379939432; RK=HDmMQ+bMYS; ptcz=041819f4b87e0b884bef131e693788aa5fbc4cada8faa15d44a569c96299ee95; main_login=qq; vqq_access_token=8295E564D74F73F05DEE4FDB68ACC0A6; vqq_appid=101483052; vqq_openid=A4146B43FEE17F2BE91DBD9A76B11B33; vqq_vuserid=188242069; vqq_refresh_token=FFEA9741B15666015F4A244597F99A98; qq_nick=%E3%80%80%E3%80%80;'
const KEY_loginurl = 'chavy_auth_url_videoqq'
const KEY_loginheader = 'chavy_auth_header_videoqq'
const KEY_mh5signurl = 'chavy_msign_url_videoqq'
const KEY_mh5signheader = 'chavy_msign_header_videoqq'

const signinfo = {}
let VAL_signcookie = chavy.getdata(KEY_signcookie)
let VAL_loginurl = chavy.getdata(KEY_loginurl)
let VAL_loginheader = chavy.getdata(KEY_loginheader)
let VAL_mh5signurl = chavy.getdata(KEY_mh5signurl)
let VAL_mh5signheader = chavy.getdata(KEY_mh5signheader)

;(sign = async () => {
  chavy.log(`🔔 ${cookieName}`)
  await login()
  await signapp()
  await getexp()
  showmsg()
})()
.catch((e) => chavy.log(`❌ ${cookieName} 签到失败: ${e}`))
.finally(() => chavy.done())

function login() {
  return new Promise((resolve, reject) => {
    const url = { url: VAL_loginurl, headers: JSON.parse(VAL_loginheader) }
    chavy.get(url, (error, response, data) => {
      try {
        resolve()
      } catch (e) {
        chavy.msg(cookieName, `签到结果: 失败`, `说明: ${e}`)
        chavy.log(`❌ ${cookieName} login - 登录失败: ${e}`)
        chavy.log(`❌ ${cookieName} login - response: ${JSON.stringify(response)}`)
        resolve()
      }
    })
  })
}

function signapp() {
  return new Promise((resolve, reject) => {
    const timestamp = Math.round(new Date().getTime() / 1000).toString()
    const VAL_signurl = `https://vip.video.qq.com/fcgi-bin/comm_cgi?name=hierarchical_task_checkin&cmd=2&_=${timestamp}`
    let url = { url: VAL_signurl, headers: {} }
    url.headers['User-Agent'] = 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.5 Mobile/15E148 Safari/604.1'
    chavy.get(url, (error, response, data) => {
      try {
        signinfo.signapp = JSON.parse(data.match(/\((.*)\);/)[1])
        resolve()
      } catch (e) {
        chavy.msg(cookieName, `签到结果: 失败`, `说明: ${e}`)
        chavy.log(`❌ ${cookieName} signapp - 签到失败: ${e}`)
        chavy.log(`❌ ${cookieName} signapp - response: ${JSON.stringify(response)}`)
        resolve()
      }
    })
  })
}

function getexp() {
  return new Promise((resolve, reject) => {
    const timestamp = Math.round(new Date().getTime() / 1000).toString()
    const VAL_getexpurl = `https://vip.video.qq.com/fcgi-bin/comm_cgi?name=spp_vscore_user_mashup&type=1&_=${timestamp}`
    let url = { url: VAL_getexpurl, headers: {} }
    url.headers['User-Agent'] = 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.5 Mobile/15E148 Safari/604.1'
    chavy.get(url, (error, response, data) => {
      try {
        signinfo.expinfo = JSON.parse(data.match(/\((.*)\);/)[1])
        resolve()
      } catch (e) {
        chavy.msg(cookieName, `签到结果: 失败`, `说明: ${e}`)
        chavy.log(`❌ ${cookieName} getexp - 签到失败: ${e}`)
        chavy.log(`❌ ${cookieName} getexp - response: ${JSON.stringify(response)}`)
        resolve()
      }
    })
  })
}

function showmsg() {
  if (signinfo.signapp) {
    let subTitle, detail
    if (signinfo.signapp.ret == 0) {
      subTitle = '签到结果: 成功'
      if (signinfo.expinfo) {
        subTitle += !
Number(signinfo.signapp.checkin_score) ? ' (重复签到)' : ''
        detail = `V力值: ${signinfo.expinfo.lscore_info.score} (+${signinfo.signapp.checkin_score}), 积分: ${signinfo.expinfo.cscore_info.vip_score_total}`
      }
    } else if (signinfo.signapp.ret == -10006) {
      subTitle = '签到结果: 失败'
      detail = `原因: 未登录, 说明: ${signinfo.signapp.msg}`
    } else if (signinfo.signapp.ret == -10019) {
      subTitle = '签到结果: 失败'
      detail = `原因: 非会员, 说明: ${signinfo.signapp.msg}`
    } else {
      subTitle = '签到结果: 未知'
      detail = `编码: ${signinfo.signapp.ret}, 说明: ${signinfo.signapp.msg}`
    }
    chavy.msg(cookieName, subTitle, detail)
    chavy.log(subTitle)
    chavy.log(detail)
  }
}

function init() {
  isSurge = () => {
    return undefined === this.$httpClient ? false : true
  }
  isQuanX = () => {
    return undefined === this.$task ? false : true
  }
  getdata = (key) => {
    if (isSurge()) return $persistentStore.read(key)
    if (isQuanX()) return $prefs.valueForKey(key)
  }
  setdata = (key, val) => {
    if (isSurge()) return $persistentStore.write(key, val)
    if (isQuanX()) return $prefs.setValueForKey(key, val)
  }
  msg = (title, subtitle, body) => {
    if (isSurge()) $notification.post(title, subtitle, body)
    if (isQuanX()) $notify(title, subtitle, body)
  }
  log = (message) => console.log(message)
  get = (url, cb) => {
    if (isSurge()) {
      $httpClient.get(url, cb)
    }
    if (isQuanX()) {
      url.method = 'GET'
      $task.fetch(url).then((resp) => cb(null, resp, resp.body))
    }
  }
  post = (url, cb) => {
    if (isSurge()) {
      $httpClient.post(url, cb)
    }
    if (isQuanX()) {
      url.method = 'POST'
      $task.fetch(url).then((resp) => cb(null, resp, resp.body))
    }
  }
  done = (value = {}) => {
    $done(value)
  }
  return { isSurge, isQuanX, msg, log, getdata, setdata, get, post, done }
}
