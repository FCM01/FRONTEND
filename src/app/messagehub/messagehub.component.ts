import { Component, OnInit } from '@angular/core';
import { ChatserviceService } from '../chatservice.service';
import { GeneralServicesService } from '../general-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-messagehub',
  templateUrl: './messagehub.component.html',
  styleUrls: ['./messagehub.component.scss']
})
export class MessagehubComponent implements OnInit {
//sessions
public data:any;

  
//#### Message area
public username:any; 


//navbar variables
 
error = ""
show_mu=false;
groupMemberaray:string[]=[];

//navigation varibales 
show_contacts = false
contact_error= ""
show_dash = true 
show_inchat = false

//socket varaibales 
userList :string[]=[];
socket :any
//public room variable is reusable make sure to make clear function
room =""
room_name =""
//membership arrays
chatList:any =[]
groupList :string[]=[]

public messageArray:Array<{user:String,message:String}> =[]
  constructor(private gen:GeneralServicesService,private chat:ChatserviceService,private router:Router) { 
    //########### message area
    this.chat.newUserJoined()
    .subscribe(
      data=>{this.messageArray.push(data)
       
      }
      
      
    )
    this.chat.userLeftRoom()
    .subscribe(
      data=>{this.messageArray.push(data)}
    )
    this.chat.newMessageRecieved()
    .subscribe(
      data=>{this.messageArray.push(data)}
    )
  
    //group refresh 
    this.chat.groupChatCreated()
    .subscribe(
      (data)=>{
        for(let i = 0 ; i < data["user"].length; i++){
          console.log(data["user"][i])
          if (this.username == data["user"][i]){
            this.groupList = []
            this.userList = []
            this.chatList= []
    
            this.contactRetrieve();
            this.Retrievememberships();
            this.RetrieveInduvidual();
          }
        }
        
      }
    )
  }

  ngOnInit(): void {
    
    const user_profile_recieved = (localStorage.getItem('user_profile'));
    this.data = user_profile_recieved
    this.username = JSON.parse(this.data);
    this.contactRetrieve();
    this.Retrievememberships();
    this.RetrieveInduvidual();
  }
  Retrievememberships(){
    //retrieve meberships 
    this.groupMemberaray = [];
    let payload  = {
      "data":{
        "username":this.username
      }
    }
    this.gen.RetriveMemberships(payload)
    .subscribe(
      (data)=>{
       
        for (let i  = 0 ; i< data["memberships"].length; i++){
          this.groupList.push(data["memberships"][i])
        }
       
      }
    )
  }

  //retrieve individual chats
  RetrieveInduvidual(){
    let payload  = {
      "data":{
        "username":this.username
      }
    }
    this.gen.retrieveChats(payload)
    .subscribe(
      (data)=>{
        
        for (let i  = 0 ; i< data["chats"].length; i++){
         
            this.chatList.push(data["chats"][i])
           
        }
       
      }
    ) 
  }

  //user name assign function
 
  contactRetrieve(){
    this.userList = []
    this.gen.getUsers()
    .subscribe(
      (data)=>
      {
        const index = data.indexOf (this.username,0)
        if (index >-1){
          data.splice(index,1);
        }
        this.userList = data;

        
      })    

  }
  // group chat function
  makeGroupChat(data:any){
    console.log(data)
    this.groupMemberaray.push(this.username)
    if (data != ""){

    
      let payload ={
        "data":{
        "group_name":data,
        "member_array":this.groupMemberaray
        }
      }

      this.gen.makeGroupchat(payload)
      .subscribe(
        (data)=>
        {
          
        }) 
        let payload2 ={
          room:data,
          user:this.username

        }
        
    //room assigning
      this.room = data
      this.room_name = data
      //sockect function call 
        this.chat.joinChatRoom(payload2);
        
        if (this.groupMemberaray != []){
          let refresh_array = this.groupMemberaray
          const index = refresh_array.indexOf (this.username,0)
          if (index >-1){
            refresh_array.splice(index,1);
          }
          this.chat.createGroupChat(refresh_array)
        }
        
        this.error =""
        
      //navigation function change
        this.show_dash = false;
        this.show_inchat =true;  
    }
    else {
      this.error = "No group name specified"
      this.groupMemberaray =[]
    }
  }

  joinChat(data:any){
   //room assigning

    this.room = data
    this.room_name = data

    if (data != null){
      let payload ={
        room:data,
        user:this.username

      }
      //sockect function call 
      this.chat.joinChatRoom(payload);

    }
    //navigation function change
    this.show_dash = false;
    this.show_inchat =true;  


  }
   //single chat join function
   getRandomInt() {
    let min =1
    let max  = 9
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

 createSingleChat(data:any){
   let room_id :string =''
   for (let i  = 0  ; i < 12  ;i++){
    room_id = room_id + this.getRandomInt()
   }
   //room assigning
  this.room = room_id
  this.room_name = data
  if (data != null){
    let payload ={
      room:room_id,
      user:this.username,
      user2:data

    }

   
    //database saving payload 
    let final_payload={
      "data":{
        "user1":data,
        "user2": this.username,
        "room_id":room_id,
      }
    }
    this.gen.makeIndividualChat(final_payload)
    .subscribe(
      (data)=>{
        if(data["message"]=="chat has already been made"){

          this.contact_error = data["message"]
          
        }
        else{
           //sockect function call 
          this.chat.createChat(data)
          this.chat.joinChatRoom(payload);
        }

      }
    )
    //navigation function change
    this.show_dash = false;
    this.show_contacts = false;
    this.show_inchat =true;  


  }
   
  
}

joinIndividualChat(data:any){
  if (data != null){
    let payload ={
      room:data["room_id"],
      user:this.username,
      user2:data

    }
//room assigning
    this.room = data["room_id"]
    this.room_name  = data["user"]
    
    //sockect function call 
    this.chat.joinChatRoom(payload);
    //navigation function change
    this.show_dash = false;
    this.show_inchat =true;  


}
}



 
//in chat functions   
leave(){
    
    let payload ={
      room:this.room,
      user:this.username

    }
    //room assigning
    this.room =""
    this.room_name = ""
    //sockect function call 
    this.chat.leaveRoom(payload);
    this.messageArray = []

    //reload to message hub
    this.groupList = []
    this.userList = []
    this.chatList= []
    
    this.contactRetrieve();
    this.Retrievememberships();
    this.RetrieveInduvidual();

    //navigation function change
    this.show_dash = true;
    this.show_inchat =false;  




  }  
sendMessage(data:any){
    let payload ={
      room:this.room,
      user:this.username,
      message:data

    }
    //sockect function call 
    this.chat.sendMessage(payload);

  }

 //navbar functions
 showMakeUser(){
   this.show_mu =true;
 }
 setName(data:any){ 
   this.groupMemberaray.push(data)  
 }
   //navigation function change

 showContacts(){
   this.show_contacts= true
   this.show_dash = false
 }
 back(){
  this.show_contacts = false
  this.show_dash = true
}
//return to login

logOut(){

  this.username = ""
  localStorage.setItem('user_profile',JSON.stringify(""));
  this.router.navigate([""])
  
}
refresh(){
    this.groupList = []
    this.userList = []
    this.chatList= []
    this.error =""
    
    this.contactRetrieve();
    this.Retrievememberships();
    this.RetrieveInduvidual();
}

deletChat(data:any){
  let payload ={
    "data":{
      "room_id":data["room_id"]
    }
  }

this.gen.DeleteChat(payload)
.subscribe(
  (data)=>{
    if (data != ""){
    this.groupList = []
    this.userList = []
    this.chatList= []
    this.error =""
    
    this.contactRetrieve();
    this.Retrievememberships();
    this.RetrieveInduvidual();
    }
  }
)



}
deleteGroupChat(data:any){
  let payload ={
    "data":{
      "group_name":data
    }
  }
  this.gen.DeleteGroupChat(payload)
  .subscribe(
    (data)=>{
      if (data != ""){
        this.groupList = []
        this.userList = []
        this.chatList= []
        this.error =""
        
        this.contactRetrieve();
        this.Retrievememberships();
        this.RetrieveInduvidual();
      }
    }
  )
}



}
