import io from "socket.io-client";

class Socket {
    constructor() {
        this.socket = io('https://dev.creatlie.com/', {
            forceNew: false,
        });
    }

    connect() {
        this.socket.connect();
    }

    disconnect() {
        this.socket.disconnect();
    }

    on(event, callback) {
        this.socket.on(event, callback);
    }

    off(event, callback) {
        this.socket.off(event, callback);
    }

    emit(event, ...args) {
        this.socket.emit(event, ...args);
    }
}

export const socket = new Socket();