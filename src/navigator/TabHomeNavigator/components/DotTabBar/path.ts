// @ts-ignore
import * as shape from "d3-shape";
import { scale } from "react-native-utils-scale";

//** Path Line */
const line = (width: number, height: number) => {
  return (shape as any)
    .line()
    .x((d: { x: any }) => d.x)
    .y((d: { y: any }) => d.y)([
    { x: width / 2, y: 0 },
    { x: width, y: 0 },
    { x: width, y: height },
    { x: 0, y: height },
    { x: 0, y: 0 },
    { x: width / 2, y: 0 },
  ]);
};

//** Path Line Border Left Right Down */
const lineBorder = (width: number, height: number) => {
  return (shape as any)
    .line()
    .x((d: { x: any }) => d.x)
    .y((d: { y: any }) => d.y)
    .curve(shape.curveBasis)([
    // right
    { x: width / 2, y: 0 },
    { x: width - scale(20), y: 0 },
    { x: width - scale(10), y: scale(2) },
    { x: width - scale(2), y: scale(10) },
    { x: width, y: scale(20) },
    { x: width, y: height },
    { x: width, y: height },
    // bottom
    { x: width, y: height },
    { x: 0, y: height },
    // left
    { x: 0, y: height },
    { x: 0, y: height },
    { x: 0, y: scale(20) },
    { x: 0 + scale(2), y: scale(10) },
    { x: 0 + scale(10), y: scale(2) },
    { x: 0 + scale(20), y: 0 },
    { x: width / 2, y: 0 },
  ]);
};

//** Path Line Border Left Right Down */
const lineBorderLeft = (width: number, height: number) => {
  return (shape as any)
    .line()
    .x((d: { x: any }) => d.x)
    .y((d: { y: any }) => d.y)
    .curve(shape.curveBasis)([
    // right
    { x: width, y: 0 },
    { x: width, y: height },
    { x: width, y: height },
    // bottom
    { x: width, y: height },
    { x: 0, y: height },
    // left
    { x: 0, y: height },
    { x: 0, y: height },
    { x: 0, y: scale(20) },
    { x: 0 + scale(2), y: scale(10) },
    { x: 0 + scale(10), y: scale(2) },
    { x: 0 + scale(20), y: 0 },
    { x: width / 2, y: 0 },
  ]);
};

//** Path Line Border Left Right Down */
const lineBorderRight = (width: number, height: number) => {
  return (shape as any)
    .line()
    .x((d: { x: any }) => d.x)
    .y((d: { y: any }) => d.y)
    .curve(shape.curveBasis)([
    // right
    { x: width / 2, y: 0 },
    { x: width - scale(20), y: 0 },
    { x: width - scale(10), y: scale(2) },
    { x: width - scale(2), y: scale(10) },
    { x: width, y: scale(20) },
    { x: width, y: height },
    { x: width, y: height },
    // bottom
    { x: width, y: height },
    { x: 0, y: height },
    // left
    { x: 0, y: height },
    { x: 0, y: 0 },
  ]);
};

//** Path Curved Down Left */
const lineCurved = (iPosition: number, height: number, circle: number) => {
  const position = iPosition;
  const circleWidth = circle + position;
  const trim = (position + circleWidth) / 2;

  return (shape as any)
    .line()
    .x((d: { x: any }) => d.x)
    .y((d: { y: any }) => d.y)
    .curve(shape.curveBasis)([
    { x: position - scale(20), y: 0 }, // border center left
    { x: position - scale(10), y: scale(2) },
    { x: position - scale(2), y: scale(10) },
    { x: position, y: scale(17) },

    { x: trim - scale(25), y: height / 2 + scale(2) },
    { x: trim - scale(10), y: height / 2 + scale(10) },
    { x: trim, y: height / 2 + scale(10) },
    { x: trim + scale(10), y: height / 2 + scale(10) },
    { x: trim + scale(25), y: height / 2 + scale(2) },

    { x: circleWidth, y: scale(17) }, // border center right
    { x: circleWidth + scale(2), y: scale(10) },
    { x: circleWidth + scale(10), y: 0 },
    { x: circleWidth + scale(20), y: 0 },
  ]);
};

export const getPathDown = (
  width: number,
  iHeight: number,
  centerWidth: number,
  borderTopLeftRight = false
) => {
  const height = scale(iHeight);
  const circleWidth = scale(centerWidth) + scale(16);

  if (borderTopLeftRight) {
    return `${lineBorder(width, height)} ${lineCurved(
      width / 2 - circleWidth / 2,
      height,
      circleWidth
    )}`;
  }

  return `${line(width, height)} ${lineCurved(
    width / 2 - circleWidth / 2,
    height,
    circleWidth
  )}`;
};
