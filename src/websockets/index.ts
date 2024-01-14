import {Server} from "socket.io";
import type {Server as _S} from "node:http"
import { session } from "../session";

export function initSocketIO(server: _S) {
    const io = new Server({});

    //// will be created later
}