import { NavController, Platform } from 'ionic-angular';
import { Http } from '@angular/http';
import { Component } from '@angular/core';
import { LoginService } from '../service/login-service';
import { OrderFormListComponent } from '../../orderForm/component/orderForm-list.component'

import {Auth, User, CloudSettings, provideCloud} from '@ionic/cloud-angular';
import { Camera } from 'ionic-native';


@Component({
    templateUrl: 'build/shared/template/login.component.html',
    providers: [LoginService]
})
export class LoginComponent {
    signingUp: boolean = true;
    name: string;
    email: string = 'graphicsxp@gmail.com';
    password: string = 'welcome1';
    confirmPassword: string;
    errorMessage: string;

    constructor(private _loginService: LoginService, private _navController: NavController, private _auth: Auth) { }


    login() {
        // this._loginService.login(this.username, this.password).subscribe(
        //     data => {
        //         if (data) {
        //             //Navigate to home page                             
        //             this._navController.setRoot(OrderFormListComponent);
        //         } else {
        //             this.errorMessage = 'username or password is not correct';
        //         }
        //     }
        // )

        this._auth.login("basic", { 'email': this.email, 'password': this.password }).then((res) => {
            this._navController.setRoot(OrderFormListComponent);
        }, (err) => {
            alert('Authentication failed.');
        });
    }

    signup() {
        this._auth.signup({ 'name': this.name, 'email': this.email, 'password': this.password }).then(() => {
            return this._auth.login('basic', { 'email': this.email, 'password': this.password }).then(() => {
                this._navController.setRoot(OrderFormListComponent);
            });
        }, (err) => {
            for (let e of err.details) {
                if (e === 'conflict_email') {
                    alert('Email already exists.');
                } else {
                    //handle other errors
                }
            }
        });
    }

    takePhoto(){
        Camera.getPicture().then(
            res => console.log("We have taken a picture!"),
            err => console.error("Error taking picture", err)
        );
    }
}