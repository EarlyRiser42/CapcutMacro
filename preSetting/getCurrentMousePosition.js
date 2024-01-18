import robot from "robotjs";

// 1초마다 마우스 위치 조회
setInterval(() => {
    var mouse = robot.getMousePos();
    console.log("Mouse is at x:" + mouse.x + " y:" + mouse.y);
}, 1000);
