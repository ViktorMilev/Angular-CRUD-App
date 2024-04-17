import { Component, Input, OnInit } from '@angular/core';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import moment from 'moment';
import { Subscription, interval } from 'rxjs';
import { CommonModule } from '@angular/common';
import { UserService } from '../users.service';

interface User {
  id: Number;
  firstName: String;
  lastName: String;
  occupation: String;
  gender: String;
  birthDate: string;
  profilePicture: String;
}

interface extendedUserData extends User {
  years: String;
}

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, NgbToastModule, NgbPaginationModule, RouterModule, HttpClientModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  styles: ['.container.mx-auto { height: 100vh; padding: 10px; }']
})

export class HomePageComponent implements OnInit {
  @Input('PageHeader') PageHeader = '';
  subscription: Subscription;

  show: boolean = false;
  firstDate: any = new Date();
  mins: number = 0;

  page = 4;
  pageSize = 6;

  calculatePassedTime() {
    const secondDate = new Date();
    const milliDiff = secondDate.getTime() - this.firstDate.getTime();
    const totalSeconds = Math.floor(milliDiff / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    this.mins = totalMinutes;
  }

	close() {
		this.show = false;
		this.subscription.unsubscribe();
	}
 
  users: extendedUserData[] = [];

  getUsersData() {
    this.userService.getUsers().subscribe(response => {
      this.users = response;
    })
  }

  deleteUser(userId: any) {
    var id = parseInt(userId);

    if (id <= 2) {
      this.firstDate = new Date();
      this.show = true;
    } else {
      this.userService.deleteUser(userId).subscribe(response => {
      });

      this.getUsersData();
    }
  };
 
  formatDate(params: string) {
    var newDate = params.split("-");
    return `${newDate[2]}.${newDate[1]}.${newDate[0]} г.`;
  };

  calculateYears(params: string) {
    var years = moment().diff(params, 'years');
    return years;
  };

  constructor(public userService: UserService) {
    const source = interval(1000);
    this.subscription = source.subscribe(val => this.calculatePassedTime());
    this.show = false;
  }

  ngOnInit(): void {
    this.getUsersData();
  }
}
