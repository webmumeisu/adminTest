
import EXIF from '@/utils/exif'
const imageConversion = require("image-conversion")
let Orientation = null
let base = ''
// let jg = ''

export function oriImg(file, callback) {
  if (file.file.size / 1024 > 2000) {
    console.log('大')
    imageConversion.compressAccurately(file.file, 500).then(res => {
      let a = new FileReader();
      a.onload = () => {
        base = a.result 
        file.content = base
        // console.log('con', file)
        // 旋转
        if (navigator.userAgent.match(/iphone/i) || navigator.userAgent.match(/Redmi/i)) {
          EXIF.getData(file.file, function () {
            EXIF.getAllTags(this)
            Orientation = EXIF.getTag(this, 'Orientation')
            console.log(Orientation)
            const oReader = new FileReader()
            oReader.onload = function (e) {
              const image = new Image()
              image.src = e.target.result
              console.log(image)
              image.onload = function () {
                const expectWidth = this.naturalWidth
                const expectHeight = this.naturalHeight
                const canvas = document.createElement('canvas')
                const ctx = canvas.getContext('2d')
                canvas.width = expectWidth;  
                canvas.height = expectHeight;  
                ctx.drawImage(this, 0, 0, expectWidth, expectHeight)
                let base64 = null
                if(Orientation != "" && Orientation != 1){
                  switch(Orientation){  
                    case 6://需要顺时针（向左）90度旋转
                      rotateImg(this,'left',canvas)
                      break;  
                    case 8://需要逆时针（向右）90度旋转
                      rotateImg(this,'right',canvas)
                      break;  
                    case 3://需要180度旋转  
                      rotateImg(this,'right',canvas)//转两次
                      rotateImg(this,'right',canvas)
                      break;  
                  }
                  base64 = canvas.toDataURL("image/jpeg", 0.8)
                  callback(base64)
                }  
              }
            }
            oReader.readAsDataURL(file.file)
          })
        } else {
          EXIF.getData(file.file, function () {
            EXIF.getAllTags(this)
            Orientation = EXIF.getTag(this, 'Orientation')
            switch(Orientation){  
              case 6://需要顺时针（向左）90度旋转
                break
              case 8://需要逆时针（向右）90度旋转
                break
              case 3://需要180度旋转  
                break
            }
          })
          callback(file.content)
        }
      }
      a.readAsDataURL(res);
    })
  } else {
    // 旋转
    if (navigator.userAgent.match(/iphone/i) || navigator.userAgent.match(/Redmi/i)) {
      EXIF.getData(file.file, function () {
        EXIF.getAllTags(this)
        Orientation = EXIF.getTag(this, 'Orientation')
        console.log(Orientation)
        const oReader = new FileReader()
        oReader.onload = function (e) {
          const image = new Image()
          image.src = e.target.result
          console.log(image)
          image.onload = function () {
            const expectWidth = this.naturalWidth
            const expectHeight = this.naturalHeight
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')
            canvas.width = expectWidth;  
            canvas.height = expectHeight;  
            ctx.drawImage(this, 0, 0, expectWidth, expectHeight)
            let base64 = null
            if(Orientation != "" && Orientation != 1){
              switch(Orientation){  
                case 6://需要顺时针（向左）90度旋转
                  rotateImg(this,'left',canvas)
                  break;  
                case 8://需要逆时针（向右）90度旋转
                  rotateImg(this,'right',canvas)
                  break;  
                case 3://需要180度旋转  
                  rotateImg(this,'right',canvas)//转两次
                  rotateImg(this,'right',canvas)
                  break;  
              }
              base64 = canvas.toDataURL("image/jpeg", 0.8)
              callback(base64)
            }  
          }
        }
        oReader.readAsDataURL(file.file)
      })
    } else {
      EXIF.getData(file.file, function () {
        EXIF.getAllTags(this)
        Orientation = EXIF.getTag(this, 'Orientation')
        switch(Orientation){  
          case 6://需要顺时针（向左）90度旋转
            break
          case 8://需要逆时针（向右）90度旋转
            break
          case 3://需要180度旋转  
            break
        }
      })
      callback(file.content)
    }
  }
  
}

function rotateImg(img, direction,canvas) {
  //alert(img);  
  //最小与最大旋转方向，图片旋转4次后回到原方向    
  var min_step = 0;    
  var max_step = 3;    
  //var img = document.getElementById(pid);    
  if (img == null)return;    
  //img的高度和宽度不能在img元素隐藏后获取，否则会出错    
  var height = img.height;    
  var width = img.width;    
  //var step = img.getAttribute('step');    
  var step = 2;    
  if (step == null) {    
      step = min_step;    
  }    
  if (direction == 'right') {    
      step++;    
      //旋转到原位置，即超过最大值    
      step > max_step && (step = min_step);    
  } else {    
      step--;    
      step < min_step && (step = max_step);    
  }
  //旋转角度以弧度值为参数    
  var degree = step * 90 * Math.PI / 180;    
  var ctx = canvas.getContext('2d');    
  switch (step) {    
      case 0:    
          canvas.width = width;    
          canvas.height = height;    
          ctx.drawImage(img, 0, 0);    
          break;    
      case 1:    
          canvas.width = height;    
          canvas.height = width;    
          ctx.rotate(degree);    
          ctx.drawImage(img, 0, -height);    
          break;    
      case 2:    
          canvas.width = width;    
          canvas.height = height;    
          ctx.rotate(degree);    
          ctx.drawImage(img, -width, -height);    
          break;    
      case 3:    
          canvas.width = height;    
          canvas.height = width;    
          ctx.rotate(degree);    
          ctx.drawImage(img, -width, 0);    
          break;    
  }  
}
