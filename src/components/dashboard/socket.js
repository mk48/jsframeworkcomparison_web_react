import socketIOClient from "socket.io-client";

export default () => {
  return socketIOClient("http://localhost:3001/");
};
