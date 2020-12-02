/**
# Clocker
@param params
@param params.countSec : number 还剩时间 必传
@param params.callback : function 回调


# 使用示例
```
let clocker = new Clocker({countSec: 600000, callback: () => {}});
clocker.clear()
```
 */

class Clocker {
  /**
   * 构造器
   * @param countDown : number  剩余毫秒数
   * @param callback : function  回调
   * @param secCorrect : number  本地时间和服务器时间的差值 (本地 - 服务器)
   * @param interval : number  计时间隔 默认1000
   */
  constructor(params) {
    this.reset(params)
  }

  start() {
    this.clear()
    const me = this
    this.timer = setTimeout(() => {
      const diffSec = Date.now() - me.originTime
      const curCountSec = me.countSec - diffSec
      const returnObj = {
        curCountSec,
        curTime: Date.now() - me.secCorrect
      }
      me.callback && me.callback(returnObj)
      if (curCountSec > 0) {
        me.start()
      }
    }, this.interval)
  }

  clear() {
    clearTimeout(this.timer)
    this.timer = null
  }

  reset({ countSec = 60000, callback, secCorrect = 0, interval = 1000 }) {
    this.originTime = Date.now() // 记录开始时间
    this.countSec = countSec
    this.callback = callback
    this.interval = interval
    this.secCorrect = secCorrect
    this.start()
  }
}

export { Clocker }
