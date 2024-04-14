import { HttpClient } from "@angular/common/http"; 
import { Injectable } from "@angular/core";
//import { error } from "console";
import { Observable, of } from "rxjs";

@Injectable({
    providedIn: "root"
})

export class UserService {
    // Вземане на URL-адреса на JSON файла съдържащ примерните данни на потребителите
    public getUrl = "http://localhost:3000/users";
    
    constructor(public http: HttpClient) { }

    // Вземане на данните за потребителите
    getUsers(): Observable<any> {
        return this.http.get(this.getUrl);
    }

    // Вземане на данните за потребител по потребителски номер (id)
    getUserById(id: number): Observable<any> {
        return this.http.get(`${this.getUrl}?id=${id}`);
    }

    // Създаване на потребител
    addUser(user: any): Observable<any> {
        return this.http.post(this.getUrl, user);
    }

    // Модифициране на данни на потребител
    editItem(id: number, updatedItem: any): Observable<any> {
        return this.http.put(`${this.getUrl}?id=${id}`, updatedItem);
    }

    // Изтриване на потребител
    deleteUser(id: number): Observable<any> {
        console.log(`${this.getUrl}?id=${id}`);
        return this.http.delete(`${this.getUrl}?id=${id}`);
    }
}