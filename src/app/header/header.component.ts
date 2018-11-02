import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faKey, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuth: boolean;
  faUserAlt = faUserAlt;
  public unsafeUrl: string;
  public urlImg: SafeUrl;

  constructor(private authService: AuthService, private router: Router, private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if(user) {
          this.isAuth = true;
        } else {
          this.isAuth = false;
        }
      }
    );
    //https://www.everypixel.com/stock-photos/kids-playing image libre de droit
    this.unsafeUrl = 'https://firebasestorage.googleapis.com/v0/b/blog-78134.appspot.com/o/Resources%2FImages%2FTemplate%2Fimg_kids_2.jpg?alt=media&token=07d5efab-938f-4ae3-8d20-51b45d0a6064';
    this.urlImg = this.sanitizer.bypassSecurityTrustUrl(this.unsafeUrl);
  }

  ngOnDestroy() {

  }

  onSignOut() {
    this.authService.signOutUser();
    this.router.navigate(['/authentication', 'signin']);
  }

}
