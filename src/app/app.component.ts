import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = ' Student Portal';
  @ViewChild('ModalCreate') model: ElementRef | undefined;
  studentObj: student = new student();


  openModel() {
    const model = document.getElementById("ModalCreate");
    if (model != null) {
      model.style.display = 'block';
    }
  }



  closeModel() {
    if (this.model != null) {
      this.model.nativeElement.style.display = 'none';
    }
  }

  SaveStudent() {
    const isLocalPresent = localStorage.getItem("Angular17CRUD");
    if (isLocalPresent != null) {
      const oldArr = JSON.parse(isLocalPresent);
      oldArr.push(this.studentObj);
      localStorage.setItem('Angular17CRUD', JSON.stringify(oldArr));
    }
    else {
      const newArr = [];
      newArr.push(this.studentObj);

      localStorage.setItem('Angular17CRUD', JSON.stringify(newArr));
    }
  }

}



export class student {
  name: string;
  mobileNo: string;
  email: string;
  city: string;
  state: string;
  code: string;
  address: string;

  constructor() {
    this.name = '';
    this.mobileNo = '';
    this.email = '';
    this.city = '';
    this.state = '';
    this.code = '';
    this.address = '';
  }
}
