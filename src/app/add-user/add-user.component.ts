import { Component, Input } from '@angular/core';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { UserService } from '../users.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import moment from 'moment';
import { Subscription, interval } from 'rxjs';
import { FileUploadComponent } from '../file-upload/file-upload.component';

interface User {
  id: String;
  firstName: String;
  lastName: String;
  occupation: String;
  gender: String;
  birthDate: String;
  profilePicture: String;
}

@Component({
    selector: 'app-adduser',
    standalone: true,
    imports: [CommonModule, NgbToastModule, HttpClientModule, FormsModule, FileUploadComponent],
    templateUrl: './add-user.component.html',
    styleUrl: './add-user.component.scss',
    styles: ['.container.mx-auto { height: 100vh; padding: 10px; }']    
})

export class AddUserComponent {  
  subscription: Subscription;
  show: boolean = false;
  firstDate: any = new Date();
  mins: number = 0;
  errorMsg: string = "";
  
  user: User = {
    id: "",
    firstName: "",
    lastName: "",
    occupation: "",
    gender: "",
    birthDate: "",
    profilePicture: ""
  };

  users: User[] = [];
  lastUser: any = [];
  newID: string = "";
  upperCaseError: string = "";

  getUsers() {
    this.userService.getUsers().subscribe(response => {
      this.users = response;
    });
  }

  calculatePassedTime() {
    const secondDate = new Date();
    const milliDiff = secondDate.getTime() - this.firstDate.getTime();
    const totalSeconds = Math.floor(milliDiff / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    this.mins = totalMinutes;
  }

	close() {
		this.show = false;
	}

  invalidFieldMessage(error: any) {
    if (error.control.errors.pattern) {
      return '*Моля използвайте само букви';
    } else {
      return null;
    }
  }

  sendNewUserData(newUser: any) {
    const firstName = newUser.firstName;
    const lastName = newUser.lastName;
    var regex = /[A-ZЁА-Я]/g;
    var firstNameLowercase = firstName.match(regex);
    var lastNameLowercase = lastName.match(regex);

    if (this.user.gender === "") {
      this.setErrorMsg("Моля изберете пол!");
      this.firstDate = new Date();
      this.show = true;
      return;  
    }

    if (firstNameLowercase === null) {
      this.setErrorMsg("Първото име трябва да е с главна буква!");  
      this.firstDate = new Date();
      this.show = true;
    } else if (lastNameLowercase === null) {
      this.setErrorMsg("Фамилното име трябва да е с главна буква!");
      this.firstDate = new Date();
      this.show = true;
    } else {
      this.lastUser = this.users.slice(-1);
      this.newID = String(+this.lastUser[0].id + 1);
      newUser.id = this.newID;
  
      this.userService.addUser(newUser).subscribe((user) => {
      });

      this.getUsers();
    }
  }

  selectGender(event: any) {
    var gender = event?.target.dataset.value;
    this.user.gender = gender;
  }

  calculateYears(params: string) {
    var years = moment().diff(params, 'years');
    return years;
  };

  addUser(newUser: any) {
    this.sendNewUserData(newUser);
  }

  clear() {
    this.user = {
      id: "",
      firstName: "",
      lastName: "",
      occupation: "",
      gender: "",
      birthDate: "",
      profilePicture: ""
    };
  }

  setErrorMsg(errorText: string) {
    this.errorMsg = errorText;
  }

  alertError() {
    return '*Не трябва да е празно!';
  }

  addItem(newItem: string) {
    this.user.profilePicture = newItem;
  }

  constructor(public userService:UserService) {
    const source = interval(1000);
    this.subscription = source.subscribe(val => this.calculatePassedTime());
    this.show = false;
  }

  ngOnInit(): void {
    this.getUsers();
  }
}
