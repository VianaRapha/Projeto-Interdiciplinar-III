import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.mode';
import { ToastController, LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  user = {} as User;

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
  }

    async register(user: User) {
      if (this.formValidation()) {
        //show loader
        let loader = this.loadingCtrl.create({
          message: "Please wait..."
        });
        (await loader).present();

        try {
          await this.afAuth.auth
            .createUserWithEmailAndPassword(user.email, user.password)
            .then(data => {
              console.log(data);
            
              // redirect to homepage
              this.navCtrl.navigateRoot("home");
            });

        } catch (e) {
          this.showToast(e);
        }

        //dismiss loader
        (await loader).dismiss();
      }
    }

    formValidation() {
      if (!this.user.email){
        this.showToast("Insira um email");
        return false;
      }

      if (!this.user.password){
        this.showToast("Insira uma senha válida");
        return false;
      }

      return true;
    }

    showToast(message: string) {
      this.toastCtrl.create({
        message: message,
        duration: 3000
      }).then(toastData => toastData.present());
    }
}
