// Credits to @wdebeaum, @nonopolarity for the functions polarToCartesian and all draw functions 
// Source on https://stackoverflow.com/questions/5736398/how-to-calculate-the-svg-path-for-an-arc-of-a-circle/5737245#5737245

const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
  let angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

const drawStroke = (x, y, radius, startAngle, endAngle) => {
  let start = polarToCartesian(x, y, radius, endAngle);
  let end = polarToCartesian(x, y, radius, startAngle);

  let largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  let d = [
    "M", start.x, start.y,
    "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
  ].join(" ");

  return d;
}

const drawFill = (x, y, radius, startAngle, endAngle) => {
  let start = polarToCartesian(x, y, radius, endAngle);
  let end = polarToCartesian(x, y, radius, startAngle);

  let largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  let d = [
    "M", start.x, start.y,
    "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
    "L", 0, 0,
    "L", start.x, start.y
  ].join(" ");

  return d;
}

const drawSeparator = (x, y, radius, startAngle) => {

  let start = polarToCartesian(x, y, radius, startAngle);
  let d = [
    "M", 0, 0,
    "L", start.x, start.y,
  ].join(" ");

  return d;
}

const onResize = (event, clientWidth, clientHeight, minRadius, maxRadius, part, stroke, fill, textPath) => {
  if (event.buttons === 1) {

    let screenCenter = {
      x: clientWidth / 2,
      y: clientHeight / 2,
    };

    let position = {
      x: event.layerX - screenCenter.x,
      y: event.layerY - screenCenter.y,
    };
    let radius = Math.max(
      minRadius,
      Math.min(maxRadius, Math.sqrt(position.x ** 2 + position.y ** 2))
    );

    stroke.setAttribute(
      "d",
      drawStroke(
        0,
        0,
        radius,
        part.startAngle,
        part.endAngle
      )
    );
    fill.setAttribute(
      "d",
      drawFill(
        0,
        0,
        radius,
        part.startAngle,
        part.endAngle
      )
    );
    textPath.textContent = `${part.members.filter(x => x < (radius - minRadius) / (maxRadius - minRadius)).length}/${part.members.length}`;

  }
};
