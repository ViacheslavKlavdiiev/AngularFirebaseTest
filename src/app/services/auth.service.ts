import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase';
import {User} from 'firebase';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  constructor( public  afAuth: AngularFireAuth, public router: Router ) {
      this.afAuth.authState.subscribe(user => {
        if (user) {
          this.user = user;
          localStorage.setItem('user', JSON.stringify(this.user));
        } else {
          localStorage.setItem('user', null);
        }
      });
  }

  async login(email: string, password: string) {
    return await this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then( () => {
      this.router.navigate(['']);
      return null;
    })
    .catch((error: firebase.FirebaseError) => {
        return error;
    });
  }
  async register(email: string, password: string) {
    return await this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigate(['']);
        return null;
      })
      .catch((error: firebase.FirebaseError) => {
        return error;
      });
    // this.sendEmailVerification();
  }

  // async sendEmailVerification() {
  //   await this.afAuth.auth.currentUser.sendEmailVerification();
  //   this.router.navigate(['verify-email']);
  // }

  // async sendPasswordResetEmail(passwordResetEmail: string) {
  //   return await this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail);
  // }

  async logout() {
    await this.afAuth.auth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }

  get isLoggedIn(): boolean {
    const  user  =  JSON.parse(localStorage.getItem('user'));
    return  user ? user : user !==  null;
  }


}
