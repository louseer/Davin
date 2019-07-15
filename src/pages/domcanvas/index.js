import Dcanvas from './CanvasScene/CanvasScene'
export default class scene {
  constructor(stage, canvas) {
    this.stage = new Dcanvas.Stage(stage)
    this.canvas = new Dcanvas.Canvas(canvas)
  }
 
  selectNode(className, callback) {
    let mouseStopId
    let startX = 0
    let startY = 0
    let selectContainer = this.stage.el

    window.onresize = () => {
      console.log('变化了', '')
      this.stage.pos = GetPosition(this.stage.el)
      this.autoZoom()
    }

    if (this.stage.mode !== 'select') return
    this.stage.stageOnmousedown(e => {
      mouseStopId = setTimeout(() => {
        this.stage.mouseOn = true
        startX = e.clientX - this.stage.pos.left + selectContainer.scrollLeft
        startY = e.clientY - this.stage.pos.top + selectContainer.scrollTop
        let selDiv = document.createElement('div')
        selDiv.style.cssText =
          'position:absolute;width:0;height:0;margin:0;padding:0;border:1px dashed #eee;z-index:1000;opacity:0.6;display:none;'
        selDiv.id = 'selectDiv'
        selectContainer.appendChild(selDiv)
        selDiv.style.left = startX + 'px'
        selDiv.style.top = startY + 'px'
        
      }, 0)
    })
    this.stage.stageOnmousemove(e => {
      let _x = e.clientX - this.stage.pos.left + selectContainer.scrollLeft
      let _y = e.clientY - this.stage.pos.top + selectContainer.scrollTop
      let _H = selectContainer.clientHeight

      if (_y >= _H && selectContainer.scrollTop <= _H) {
        selectContainer.scrollTop += _y - _H
      }
      // 向上拖拽
      if (e.clientY <= this.stage.pos.top && selectContainer.scrollTop > 0) {
        selectContainer.scrollTop = Math.abs(e.clientY - this.stage.pos.top)
      }

      let selDiv = document.getElementById('selectDiv')
      selDiv.style.display = 'block'
      selDiv.style.left = Math.min(_x, startX) + 'px'
      selDiv.style.top = Math.min(_y, startY) + 'px'
      selDiv.style.width = Math.abs(_x - startX) + 'px'
      selDiv.style.height = Math.abs(_y - startY) + 'px'
      selDiv.style.cursor='crosshair'
    })
    //TODO:node
    this.stage.domcumentOnmouseup(e => {
      let selDiv = document.getElementById('selectDiv')
      let fileDivs = document.getElementsByClassName(className)
      let selectedEls = []
      let l = selDiv.offsetLeft
      let t = selDiv.offsetTop
      let w = selDiv.offsetWidth
      let h = selDiv.offsetHeight
      console.log('tag@@@@', this.canvas.canvasZoom)
      for (let i = 0; i < fileDivs.length; i++) {
        let sl =
          (fileDivs[i].offsetWidth + fileDivs[i].offsetLeft) *
          this.canvas.canvasZoom
        let st =
          (fileDivs[i].offsetHeight + fileDivs[i].offsetTop) *
          this.canvas.canvasZoom

        if (
          sl > l &&
          st > t &&
          fileDivs[i].offsetLeft * this.canvas.canvasZoom < l + w &&
          fileDivs[i].offsetTop * this.canvas.canvasZoom < t + h
        ) {
          selectedEls.push(fileDivs[i])
        }
      }
      console.log(selectedEls)
      selDiv.style.display = 'none'
      selDiv.remove()
      this.stage.mouseOn = false
      callback && typeof callback === 'function' && callback(selectedEls)
    })
  }

  autoZoom(){   
      const sizeW=this.canvas.canvasWidth/this.stage.el.offsetWidth
      const sizeH=this.canvas.canvasHeight/this.stage.el.offsetHeight
      this.canvas.canvasZoom=1/sizeW
      console.log(sizeW)    
   }
}
function GetPosition(obj) {
  let left = 0
  let top = 0
  while (obj.offsetParent) {   
    left += obj.offsetLeft
    top += obj.offsetTop
    obj = obj.offsetParent
  }
  return { left, top }
}
