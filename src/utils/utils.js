import { API_BASE_URL } from "./backendUrl";
import io from "socket.io-client";
export const socket = io(API_BASE_URL);
