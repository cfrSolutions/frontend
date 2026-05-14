import { io } from "socket.io-client";

const socket = io("https://api.inputify.io", {
  withCredentials: true,
});

export default socket;