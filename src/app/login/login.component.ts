import { Component, OnInit } from '@angular/core';
import { GeneralServicesService } from '../general-services.service';
import { FormBuilder,FormGroup, Validators } from "@angular/forms"
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public wait = true;
  public timeLeft: number = 3;
  public interval:any;
//#######LOGIN area
public loginForm: FormGroup;
public signupForm : FormGroup;
public response:any;
public request:any;

public error_message ='';
public titleAlert1 :string ="This field is required"
// sign up variables 
public show_signup = false ;
  constructor(private router: Router,private fb: FormBuilder,private gen:GeneralServicesService) {
    this.loginForm = fb.group({
      "user_name":['',Validators.required],
      "password": ['', Validators.compose([Validators.required, Validators.minLength(8),Validators.maxLength(12)])],
      "validate": ''
    });
    this.signupForm = fb.group({
      "user_name":['',Validators.required],
      "password": ['', Validators.compose([Validators.required, Validators.minLength(8),Validators.maxLength(12)])],
      "password_confirm": ['', Validators.compose([Validators.required, Validators.minLength(8),Validators.maxLength(12)])],
      "email":["",Validators.compose([Validators.email,Validators.required])],
      "validate": ''
    });
   }

  ngOnInit(): void {
    this.startTimer()
  }
  //#####Login area
 //show message hub
 ShowSignup(){
   this.show_signup = true;
   this.error_message  ="";
 }
 HideSignup(){
   this.show_signup = false;
   this.error_message  ="";

 }
 // signup and login functions

 password_check(password_1:any,password_2:any){
   let final_password;
   if (password_2 == password_1){
     final_password = password_2
     return {"responce":1,"password":final_password}
   }
   else{
     return {"responce":0}
   }
 }
 Sign_up (post:any){
   let checked_password =this.password_check(post.password,post.password_confirm)
   if (checked_password["responce"] ==0){
     this.error_message = "Passwords don't match"

   }
   let final_payload = {
     "data":{
     "username":post.user_name ,
     "email":post.email,
     "password":checked_password["password"]
   }
 }
   this.request  = this.gen.SignUp(final_payload)
     .subscribe(
       (data)=>{  
       this.response = data; 
       if(this.response["token"]==0){
        localStorage.setItem('user_profile',JSON.stringify(post.user_name));
        this.router.navigate(["/messagehub"])
           
         } 
       else(this.response["token"] == "1")
       {
         
         this.error_message = data["message"]
       }
       }
     )


 }



 Login(post:any){

   let final_payload = {
     "data":{
       "username":post.user_name,
       "password":post.password}
   }
   this.request = this.gen.Login(final_payload)
 
     .subscribe(
       (data) => {
          
       this.response = data; 
       if(this.response["token"]== 0){
        localStorage.setItem('user_profile',JSON.stringify(post.user_name));
        this.router.navigate(["/messagehub"])
          
         } 
         
       else(this.response["token"] == "1")
       {
         
         this.error_message = data["message"] 
       }
        
      },
     )
  

 }

 startTimer() {
 
  this.interval = setInterval(() => {
    if(this.timeLeft > 0) {
      this.timeLeft--;
      
    } else {
      this.wait =false;
      

    }
  },1000)

}
pauseTimer() {
  clearInterval(this.interval);
}


}
