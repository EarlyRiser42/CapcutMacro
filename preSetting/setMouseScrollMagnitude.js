import {mouse} from "@nut-tree/nut-js";
import {parseMousePosition, sleep} from "../functions/utils.js";
import robot from "robotjs";
import dotenv from "dotenv";
dotenv.config('');

sleep(3000)
let mousePosition = parseMousePosition(process.env['CAPTION_POSITION_Y']);
robot.moveMouse(mousePosition.x, mousePosition.y);
await mouse.scrollDown(300);
