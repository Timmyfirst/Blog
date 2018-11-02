import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

import { User } from '../../models/user.model';
import { Profile } from '../../models/profile.model';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  createUserForm: FormGroup;
  errorMessage: string;
  defaultImageUrl: string;
  private imageUrl: string;
  imageIsUploading = false;
  imageUploaded = false;

  profiles: Profile[];
  profileSubscription: Subscription;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();

    this.profileSubscription = this.userService.profilesSubject.subscribe(
      (profiles: Profile[]) => {
        this.profiles = profiles;
      }
    );
    this.userService.emitProfileSubject();

    this.defaultImageUrl = 'https://firebasestorage.googleapis.com/v0/b/blog-78134.appspot.com/o/Resources%2FImages%2FTemplate%2Fdefault_user.png?alt=media&token=68b569da-3df5-4ec1-8c3b-b3307ec640a5';
  }

  initForm() {
    this.createUserForm = this.formBuilder.group({
      displayName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
      profileSelect: ['', Validators.required]
    });
  }

  onSubmitForm() {

    const userToCreate: User = {
      displayName: toString(this.createUserForm.get('displayName').value),
      password: toString(this.createUserForm.get('password').value),
      email: toString(this.createUserForm.get('email').value),
      emailVerified: false,
      photoURL: this.getImageURL() ? this.getImageURL() : this.defaultImageUrl
      /*profile: toString(this.createUserForm.get('profileId').value),*/
    }

    this.userService.createNewUser(userToCreate).then(
      () => {
        console.log('utilisateur créé');
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }

  onUploadImage(file: File) {
    this.imageIsUploading = true;
    this.userService.uploadUserImage(file).then(
      (url: string) => {
        this.setImageURL(url);
        this.imageIsUploading = false;
        this.imageUploaded = true;
      }
    );
  }

  detectFiles(event) {
    this.onUploadImage(event.target.files[0]);
  }

  getImageURL() {
    return this.imageUrl;
  }

  setImageURL(url: string) {
    this.imageUrl = url;
  }

}
