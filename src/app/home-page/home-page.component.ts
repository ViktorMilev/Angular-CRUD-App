import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import moment from 'moment';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { CommonModule } from '@angular/common';
import { UserService } from '../users.service';

interface User {
  id: Number;
  firstName: String;
  lastName: String;
  occupation: String;
  gender: String;
  birthDate: string;
}

interface extendedUserData extends User {
  years: String;
}

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  styles: ['.container.mx-auto { height: 100vh; }']
})

export class HomePageComponent implements OnInit {
  users: extendedUserData[] = [];

  getUsersData() {
    this.userService.getUsers().subscribe(response => {
      this.users = response;
      console.log(response);
    })
  }

  deleteUser(user: any) {
    this.userService.deleteUser(user).subscribe(response => {
      console.log("Deleted", user);
    });

    this.getUsersData();
  };
 
  formatDate(params: string) {
    var newDate = params.split("-");
    return `${newDate[2]}.${newDate[1]}.${newDate[0]} г.`;
  };

  calculateYears(params: string) {
    console.log(typeof params)
    var years = moment().diff(params, 'years');
    return years;
  };

  constructor(public userService:UserService) {
  }

  ngOnInit(): void {
    this.getUsersData();
  }
}
