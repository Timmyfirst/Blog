import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;

import { User } from '../models/user.model';
import { Profile } from '../models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  profilesSubject = new Subject<Profile[]>();
  private profiles: Profile[] = [];

  constructor() {
    this.getProfiles();
  }

  createNewUser(user: User) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password).then(
          (authData) => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
        /*
        var user = firebase.auth().currentUser;
        user.updateProfile({
          displayName: "Jane Q. User",
          photoURL: "https://example.com/jane-q-user/profile.jpg"
        }).then(function() {
          // Update successful.
        }).catch(function(error) {
          // An error happened.
        });*/

      }
    );
  }

  uploadUserImage(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const uploadTask = firebase.storage().ref()
          .child('Resources/Images/UsersImages' + almostUniqueFileName + file.name).put(file);
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement…');
          },
          (error) => {
            console.log('Erreur de chargement ! : ' + error);
            reject();
          },
          () => {
            console.log('Téléchargé !')
            /*uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
              console.log('File available at', downloadURL);
            });*/
            resolve(uploadTask.snapshot.ref.getDownloadURL());
          }
        );
      }
    );
  }

  emitProfileSubject() {
    this.profilesSubject.next(this.profiles.slice());
  }

  getProfiles() {
    firebase.database().ref('/profiles')
      .on('value', (data: DataSnapshot) => {
          this.profiles = data.val() ? data.val() : [];
          this.emitProfileSubject();
        }
      );
  }


}
