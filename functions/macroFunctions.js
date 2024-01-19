import clipboardy from "clipboardy";
import robot from "robotjs";
import {
    parseMousePosition,
    sleep,
    sleepTillExport,
    sleepTillCaptionAdded
} from "./utils.js";
import dotenv from "dotenv";
import {centerOf, imageResource, mouse, screen, straightTo} from "@nut-tree/nut-js";
import ("@nut-tree/template-matcher");
dotenv.config();
export const mouseClick = (x, y) => {
    robot.moveMouse(x, y);
    sleep(100)
    robot.mouseClick();
}

export const createNewVideo = () => {
    robot.keyTap('n', ['control']);
    sleep(500);
    const mousePosition = parseMousePosition(process.env['NEW_VIDEO_CONFIRM']);
    mouseClick(mousePosition.x, mousePosition.y);
}

export const getMediaFile = (path) => {
    robot.keyTap('i', ['control']);
    clipboardy.writeSync(path);
    sleep(500);
    robot.keyTap('v', ['control']);
    sleep(500);
    robot.keyTap('enter');
}

export const addToTimeLine = (number) => {
    let mousePosition = parseMousePosition(process.env['ADD_MEDIA_'+number.toString()]);
    mouseClick(mousePosition.x, mousePosition.y);
}



export const makeCaption = async () => {
    const keys = [
        'CAPCUT_TEXT', 'CAPCUT_AUTO_CAPTION', 'CAPCUT_AUTO_LANG_LIST', 'CAPCUT_AUTO_LANG_ENG',  'CAPCUT_AUTO_CAPTION_MAKE'];
    keys.forEach(key => {
        const mousePosition = parseMousePosition(process.env[key]);
        mouseClick(mousePosition.x, mousePosition.y);
        sleep(500);
    });
    await sleepTillCaptionAdded();
}

export const setVideoRatio = () => {
    let mousePosition = parseMousePosition(process.env['CAPTION_RATIO']);
    mouseClick(mousePosition.x, mousePosition.y);
    sleep(500);
    mousePosition = parseMousePosition(process.env['CAPTION_RATIO_MOBILE']);
    mouseClick(mousePosition.x, mousePosition.y);
}

export const setAudioLength = (length) => {
    let mousePosition = parseMousePosition(process.env['AUDIO_SPEED']);
    mouseClick(mousePosition.x, mousePosition.y);
    mousePosition = parseMousePosition(process.env['AUDIO_LENGTH']);
    mouseClick(mousePosition.x, mousePosition.y);
    clipboardy.writeSync(length);
    robot.keyTap('a', ['control']);
    sleep(500);
    robot.keyTap('v', ['control']);
    sleep(500);
    robot.keyTap('enter');
}

export const setVideoLength = (length) => {
    let mousePosition = parseMousePosition(process.env['VIDEO_SPEED']);
    mouseClick(mousePosition.x, mousePosition.y);
    mousePosition = parseMousePosition(process.env['VIDEO_LENGTH']);
    mouseClick(mousePosition.x, mousePosition.y);
    clipboardy.writeSync(length);
    robot.keyTap('a', ['control']);
    sleep(500);
    robot.keyTap('v', ['control']);
    sleep(500);
    robot.keyTap('enter');
}

export const changeCaptionFont = () => {
    let mousePosition = parseMousePosition(process.env['CAPTION_TEMPLATE']);
    mouseClick(mousePosition.x, mousePosition.y);
    mousePosition = parseMousePosition(process.env['CAPTION_WORDART']);
    mouseClick(mousePosition.x, mousePosition.y);
    sleep(3000);
    mousePosition = parseMousePosition(process.env['CAPTION_WORDART_FONT']);
    mouseClick(mousePosition.x, mousePosition.y);
    sleep(500);
}

export const changeCaptionSize = () => {
    let mousePosition = parseMousePosition(process.env['CAPTION_BASIC']);
    mouseClick(mousePosition.x, mousePosition.y);
    mousePosition = parseMousePosition(process.env['CAPTION_FONT_SIZE']);
    mouseClick(mousePosition.x, mousePosition.y);
    sleep(300);
    // 폰트 크기
    clipboardy.writeSync('16');
    robot.keyTap('a', ['control']);
    sleep(300);
    robot.keyTap('v', ['control']);
    sleep(300);
    robot.keyTap('enter');
    sleep(1000)
}

export const changeCaptionPosition = async () => {
    // 텍스트-기본의 스크롤바 클릭후 아래로 드래그
    let mousePosition = parseMousePosition(process.env['CAPTION_MIDDLE']);
    robot.moveMouse(mousePosition.x, mousePosition.y);
    await mouse.scrollDown(300);
    sleep(1000)
    // 위치 중 Y값 선택
    screen.config.confidence = 0.9
    await mouse.move(straightTo(centerOf(screen.find(imageResource("./public/capcutYPosition.png")))));
    robot.mouseClick();
    clipboardy.writeSync('0');
    robot.keyTap('a', ['control']);
    sleep(500);
    robot.keyTap('v', ['control']);
    sleep(500);
    robot.keyTap('enter');
    sleep(1000)
}

export const exportVideo = async (title) => {
    robot.keyTap('e', ['control']);
    sleep(500);
    clipboardy.writeSync(title);
    // 위치 중 Y값 선택
    const mousePosition = parseMousePosition(process.env['TITLE']);
    mouseClick(mousePosition.x, mousePosition.y)
    robot.keyTap('a', ['control']);
    sleep(500);
    robot.keyTap('v', ['control']);
    sleep(500);
    robot.keyTap('enter');
    await sleepTillExport();
}
