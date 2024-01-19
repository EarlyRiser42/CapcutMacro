import { promises as fs } from 'fs';
import { MovieParser } from 'node-video-lib';
import {Point, RGBA, screen} from "@nut-tree/nut-js";
import dotenv from "dotenv";
dotenv.config();
export const getVideoLength = async (path) => {
    let fileHandle;

    try {
        fileHandle = await fs.open(path, 'r');
        const fd = fileHandle.fd; // 파일 디스크립터 추출
        const movie = MovieParser.parse(fd); // 파일 디스크립터 사용
        return movie.relativeDuration().toFixed(1); // 소수점 첫째 자리까지
    } catch (ex) {
        console.error('Error:', ex);
        throw ex;
    } finally {
        if (fileHandle) {
            await fileHandle.close();
        }
    }
};


export function sleep(ms) {
    const wakeUpTime = Date.now() + ms;
    while (Date.now() < wakeUpTime) {}
}

export async function returnTrueWhenColorDifferent(envName, number, rgba) {
    const coord = parseMousePosition(process.env[envName + number.toString()]);
    const point = new Point(coord.x, coord.y);
    const color = await screen.colorAt(point);
    const compareColor = new RGBA(rgba.R, rgba.G, rgba.B, rgba.A);
    // 색이 다르면 true 반환, sleep 함수 끝나게 됌
    const isMatch = (color.R !== compareColor.R) && (color.G !== compareColor.G) && (color.B !== compareColor.B)
    return isMatch
}

export async function returnTrueWhenColorSame(envName, rgba) {
    const coord = parseMousePosition(process.env[envName]);
    const point = new Point(coord.x, coord.y);
    const color = await screen.colorAt(point);
    const compareColor = new RGBA(rgba.R, rgba.G, rgba.B, rgba.A);
    // 색이 같으면 true 반환, sleep 함수 끝나게 됌
    const isMatch = (color.R === compareColor.R) && (color.G === compareColor.G) && (color.B === compareColor.B)
    return isMatch
}

export const sleepTillProjectAdded = async () => {
    let isAdded = false;
    while (!isAdded) {
        isAdded = await returnTrueWhenColorSame('NEW_VIDEO_CONFIRM', {R:27, G: 27, B: 28, A: 255});
        if (!isAdded) {
            await new Promise(resolve => setTimeout(resolve, 500));
        }
    }
};

export const sleepTillFileAdded = async (number) => {
    let isAdded = false;
    while (!isAdded) {
        isAdded = await returnTrueWhenColorDifferent('ADD_MEDIA_',number,{R:27, G: 27, B: 28, A: 255});
        if (!isAdded) {
            await new Promise(resolve => setTimeout(resolve, 500));
        }
    }
};

export const sleepTillExport = async () => {
    let isAdded = false;
    while (!isAdded) {
        isAdded = await returnTrueWhenColorDifferent('EXPORT_CANCEL','',{R:12, G: 12, B: 12, A: 255});
        if (!isAdded) {
            await new Promise(resolve => setTimeout(resolve, 500));
        }
    }
};

export const sleepTillCaptionAdded = async () => {
    let isAdded = false;
    while (!isAdded) {
        isAdded = await returnTrueWhenColorDifferent('CAPCUT_AUTO_CAPTION_CANCEL','',{R:79, G:79,B:86,A:255});
        if (!isAdded) {
            await new Promise(resolve => setTimeout(resolve, 500));
        }
    }
    sleep(500);
}

export const parseMousePosition = (envValue) => {
    const matches = envValue.match(/\{x: (\d+), y: (\d+)\}/);
    return matches ? { x: parseInt(matches[1], 10), y: parseInt(matches[2], 10) } : null;
};


export const getVideoTitlesFromDir = async (videoDirectory) => {
    try {
        const files = await fs.readdir(videoDirectory);
        const titles = files.filter(file => file.endsWith('.m4a'));
        return titles;
    } catch (err) {
        console.error('Error reading directory:', err);
        return [];
    }
};

