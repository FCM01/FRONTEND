import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { observable, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatserviceService {
  private socket = io.io("http://167.99.207.199:3000");
  // private socket = io.io("http://localhost:3000");

  constructor() { }

  userOnline(data:any){
    this.socket.emit("connection",data)
  }
  
  joinChatRoom(data:any){
    this.socket.emit("join",data);


  }
  newUserJoined(){
    let observable = new Observable<{user:String,message:String}>(observable=>{
      this.socket.on("new user has joined",data =>{
        observable.next(data);
      })
      return()=>{this.socket.disconnect};
    });
    return observable
  }

  leaveRoom(data:any){
    this.socket.emit("leave",data)
  }

  // individual chat refresh socket 
  createChat(data:any){
    this.socket.emit("chat created",data)
  }
  // group chat socket refresh
  createGroupChat(data:any){
    this.socket.emit("group chat created",data)
  }
  groupChatCreated(){
    let observable = new Observable<{user:String,message:String}>(observable=>{
      this.socket.on("group chat made",data =>{
        observable.next(data);
      })
      return()=>{this.socket.disconnect};
    });
    return observable

  }
  userLeftRoom(){
    let observable = new Observable<{user:String,message:String}>(observable=>{
      this.socket.on("left room",data =>{
        observable.next(data);
      })
      return()=>{this.socket.disconnect};
    });
    return observable

  }
  sendMessage(data:any){
    this.socket.emit("message",data)
  }

  newMessageRecieved(){
    let observable = new Observable<{user:String,message:String}>(observable=>{
      this.socket.on("new message",data =>{
        observable.next(data);
      })
      return()=>{this.socket.disconnect};
    });
    return observable

  }
}
