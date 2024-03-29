import robot from "robotjs";
import dotenv from 'dotenv';
import {
    addToTimeLine,
    changeCaptionFont, changeCaptionPosition, changeCaptionSize, changeVoice, createNewVideo, disconnect, exportVideo,
    getMediaFile,
    makeCaption, mouseClick,
    setAudioLength,
    setVideoLength, setVideoRatio
} from "./functions/macroFunctions.js";
import {
    getVideoLength,
    getVideoTitlesFromDir,
    parseMousePosition,
    sleep,
    sleepTillFileAdded, sleepTillProjectAdded
} from "./functions/utils.js";
import {createTitleAndDescription} from "./functions/gpt.js";
import {writeToExcel} from "./functions/excel.js";
dotenv.config();

async function main(fileTitle) {
    sleep(3000);
    createNewVideo();
    await sleepTillProjectAdded();
    sleep(500);
    // 음성 파일 가져와서 타임라인에 추가
    getMediaFile(process.env.INPUT_DIR+fileTitle);
    sleep(500)
    const LENGTH = await getVideoLength(process.env.INPUT_DIR+fileTitle);
    await sleepTillFileAdded(1);
    addToTimeLine(1);
    sleep(500)
    // 음성변조
    changeVoice();
    // 화면 비율 9:16으로 조절
    setVideoRatio();
    // 자막 생성하고 기다리기
    await makeCaption();
    sleep(1000)
    // 자막 크기, 위치 조정
    changeCaptionFont()
    changeCaptionSize()
    await changeCaptionPosition()
    // 뒷배경 가져오기
    getMediaFile(process.env.BACKGROUND_DIR);
    await sleepTillFileAdded(2);
    addToTimeLine(2);
    sleep(500)
    // 연결 끊기
    await disconnect();
    sleep(2000)
    setVideoLength(LENGTH)

    /*
    // bgm 가져와서 음성 파일 길이에 맞게 편집
    getMediaFile(process.env.BGM);
    await sleepTillFileAdded(3);
    addToTimeLine(3);
    sleep(500);
    setAudioLength(LENGTH);
    */
    const [TITLE, DESCRIPTION] = await createTitleAndDescription(fileTitle);

    // 비율맞추기 ,엑셀에 쓰기 코드짜기
    await writeToExcel([{ originalName: fileTitle, modifiedName: TITLE, description: DESCRIPTION}]);
    // 내보내기
    await exportVideo(TITLE);
    let mousePosition = parseMousePosition(process.env['EXPORT_CANCEL']);
    mouseClick(mousePosition.x, mousePosition.y)
}

console.log('편집을 시작합니다. 캡컷을 전체화면으로 실행시켜주세요.')
robot.setMouseDelay(0);
robot.setKeyboardDelay(0);
const TITLES = await getVideoTitlesFromDir(process.env.INPUT_DIR);
for (const title of TITLES) {
    const index = TITLES.indexOf(title);
    console.log(`${title} 편집 시작 - ${index + 1}/${TITLES.length}`)
    await main(title).catch(console.error);
}

