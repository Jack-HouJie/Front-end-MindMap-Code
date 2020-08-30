let drawing = document.getElementById('myCanvas')
if (drawing.getContext) {
  let ctx_2d = drawing.getContext('2d')
  ctx_2d.fillStyle = 'red'
  ctx_2d.fillRect(10, 0, 50, 50)
  ctx_2d.fillStyle = 'rgba(0, 0, 255, 0.5)'
  ctx_2d.fillRect(40, 30, 50, 50)
  ctx_2d.clearRect(45, 35, 10, 10) // 将矩形区域变为透明

  ctx_2d.lineWidth = 10 // 边框宽度
  ctx_2d.lineCap = 'butt' // 线条末端形状
  ctx_2d.lineJoin = 'round' // 线条相交方式
  ctx_2d.strokeStyle = 'red'
  ctx_2d.strokeRect(10, 100, 50, 50)
  ctx_2d.strokeStyle = 'rgba(0, 0, 255, 0.5)'
  ctx_2d.strokeRect(40, 130, 50, 50)

}

try {
  let gl = drawing.getContext('experimental-webgl')
} catch (err) {
  console.log(err)
}
if (gl) {
  // 使用gl
} else {
  alert('WebGL context could not be created.')
}
