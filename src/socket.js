import { io } from "socket.io-client";

const socket = io("https://api.inputify.io", {
  transports: ["websocket"],
  withCredentials: true,
});

export default socket;