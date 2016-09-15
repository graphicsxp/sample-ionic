import {Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import {Auth, User, CloudSettings, provideCloud} from '@ionic/cloud-angular';
import { Nav, MenuController } from 'ionic-angular';
import { OrderFormListComponent } from '../../orderForm/component/orderForm-list.component';
import { LoginComponent } from './login.component';

@Component({
    templateUrl: 'build/shared/template/menu.component.html',
    selector: 'cdt-menu'
})
export class MenuComponent {
    @Input() nav: Nav;
    @Input() content: string;
    @Output() menuClicked: EventEmitter<string> = new EventEmitter<string>();
    pages: Array<{ title: string, component: any }>;

    constructor(private _auth: Auth, private _user: User, private _menuCtrl: MenuController) {

        let menu: any;

        if (this._auth.isAuthenticated()) {
            menu = { title: 'Welcome ' + this._user.details.name + ' (Logout)', component: null }
        } else {
            menu = { title: 'Login', component: LoginComponent }
        }

        // used for an example of ngFor and navigation 
        this.pages = [
            menu,
            { title: 'Order Forms', component: OrderFormListComponent }
        ];
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        if (page.component) {
            this.nav.setRoot(page.component);
        } else {
            this._menuCtrl.close();
        }
    }
}