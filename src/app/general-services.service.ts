import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GeneralServicesService {

  //public usrname
  
  //http varaibles
  public user_profile : any;
  public url = "http://167.99.207.199:5000/"
  // public url = "http://127.0.0.1:5000/"
  public payload={};
  public response :any;
  public data:any;
  public user_login = false;
  constructor(public http: HttpClient) { }

sign_in_user(){
this.user_login = true;
return this.user_login;
}
sign_out_user(){
  this.user_login = false;
  return this.user_login;

}
SignUp(final_payload:any)
  {
    const requestOptions: Object = {
      //If your response is text not json
      responseType: 'json'
    }   
    console.log(final_payload)
    return this.http.post<any>(this.url+"/User/signup",final_payload,requestOptions).pipe(map((data: any,error: any) => {
      if(data){
        return data;
      }
      else{
        return error;
      }
    })
    );

  }

  Login(final_payload:any){
    const requestOptions: Object = {
      //If your response is text not json
      responseType: 'json'
    }   
    return this.http.post<any>(this.url+"/User/Login",final_payload,requestOptions).pipe(map((data: any,error: any) => {
      if(data){
        return data;
      }
      else{
        return error;
      }
    })
    );

  }

  makeGroupchat(final_payload:any){
    const requestOptions: Object = {
      //If your response is text not json
      responseType: 'json'
    }   
    return this.http.post<any>(this.url+"/Make/group_chat",final_payload,requestOptions).pipe(map((data: any,error: any) => {
      if(data){
        return data;
      }
      else{
        return error;
      }
    })
    );

  }

  RetriveMemberships(final_payload:any){
    const requestOptions: Object = {
      //If your response is text not json
      responseType: 'json'
    }   
    return this.http.post<any>(this.url+"/Retrive/Memberships",final_payload,requestOptions).pipe(map((data: any,error: any) => {
      if(data){
        return data;
      }
      else{
        return error;
      }
    })
    );

  }

  
  //individual user functions
  makeIndividualChat(final_payload:any){
    const requestOptions: Object = {
      //If your response is text not json
      responseType: 'json'
    }   
    return this.http.post<any>(this.url+"/Make/individual_chat",final_payload,requestOptions).pipe(map((data: any,error: any) => {
      if(data){
        return data;
      }
      else{
        return error;
      }
    })
    );

  }

  retrieveChats(final_payload:any){
    const requestOptions: Object = {
      //If your response is text not json
      responseType: 'json'
    }   
    return this.http.post<any>(this.url+"/Retrive/Chats",final_payload,requestOptions).pipe(map((data: any,error: any) => {
      if(data){
        return data;
      }
      else{
        return error;
      }
    })
    );
  }

  getUsers(){
    
    const requestOptions: Object = {
      //If your response is text not json
      responseType: 'json'
    }   
    return this.http.get<any>(this.url+"/Retrieve/Users",requestOptions).pipe(map((data: any,error: any) => {
      if(data){
        return data;
      }
      else{
        return error;
      }
    })
    );
  }

DeleteChat(final_payload:any){

  const requestOptions: Object = {
    //If your response is text not json
    responseType: 'json'
  }   
  return this.http.post<any>(this.url+"/Delete/Chat",final_payload,requestOptions).pipe(map((data: any,error: any) => {
    if(data){
      return data;
    }
    else{
      return error;
    }
  })
  );
}
DeleteGroupChat(final_payload:any){

  const requestOptions: Object = {
    //If your response is text not json
    responseType: 'json'
  }   
  return this.http.post<any>(this.url+"/Delete/Groupchat",final_payload,requestOptions).pipe(map((data: any,error: any) => {
    if(data){
      return data;
    }
    else{
      return error;
    }
  })
  );

}
}