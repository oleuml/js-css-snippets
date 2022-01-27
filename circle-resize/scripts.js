
const changeRadius = (event, id) => {
  if (event.buttons === 1) {
    let circle = document.getElementById(id)
    let center = { x: circle.parentNode.clientWidth / 2, y: circle.parentNode.clientHeight / 2 }
    let position = { x: event.layerX - center.x, y: event.layerY - center.y }
    let radius = Math.sqrt((position.x) ** 2 + (position.y) ** 2);

    circle.setAttributeNS(null, 'r', Math.max(Math.min(160, radius), 20))
  }
}