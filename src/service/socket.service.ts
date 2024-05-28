import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socket: any;
  
  constructor() {
    this.socket = io('http://192.168.1.9:3000');
   }

   RoomAdminUser(roomName: any) {
    this.socket.emit('join-room', roomName);
  }

}
