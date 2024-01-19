import { screen, Point, RGBA } from "@nut-tree/nut-js";

async function getColorAt(x, y) {
    try {
        const point = new Point(x, y);
        const color = await screen.colorAt(point);
        const compareColor = new RGBA(13, 41, 62, 255);
        console.log(color)
        // RGBA 객체의 각 속성을 비교
        const isMatch = (color.R === compareColor.R) &&
            (color.G === compareColor.G) &&
            (color.B === compareColor.B) &&
            (color.A === compareColor.A);

    } catch (err) {
        console.error('오류 발생:', err);
    }
}

// 1초마다 색상을 조회
setInterval(() => getColorAt(811, 543), 1000);
