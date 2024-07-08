import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = ' Student Portal';
  @ViewChild('ModalCreate') model: ElementRef | undefined;
  studentObj: student = new student();
  studentList: student[] = [];
  ngOnInit(): void {
    const localData = localStorage.getItem("Angular17CRUD");
    if (localData != null) {
      this.studentList = JSON.parse(localData);
    }
  }

  openModel() {
    const model = document.getElementById("ModalCreate");
    if (model != null) {
      model.style.display = 'block';
    }
  }



  closeModel() {
    this.studentObj = new student();
    if (this.model != null) {
      this.model.nativeElement.style.display = 'none';
    }
  }

  onEdit(item: student) {
    this.studentObj = item;
    this.openModel();
  }
  SaveStudent() {
    const isLocalPresent = localStorage.getItem("Angular17CRUD");
    if (isLocalPresent != null) {
      const oldArr = JSON.parse(isLocalPresent);
      oldArr.push(this.studentObj);
      this.studentObj.id = oldArr.length;
      this.studentList = oldArr;
      localStorage.setItem('Angular17CRUD', JSON.stringify(oldArr));
    }
    else {
      const newArr = [];
      newArr.push(this.studentObj);
      this.studentObj.id = 1;
      this.studentList = newArr;
      localStorage.setItem('Angular17CRUD', JSON.stringify(newArr));
    }

    this.closeModel();
  }

  updateStudent() {
    const currentStd = this.studentList.find(m => m.id === this.studentObj.id);

    if (currentStd != undefined) {
      currentStd.name = this.studentObj.name;
      currentStd.mobileNo = this.studentObj.mobileNo;
      currentStd.email = this.studentObj.email;
      currentStd.code = this.studentObj.code;
      currentStd.city = this.studentObj.city;
      currentStd.state = this.studentObj.state;
      currentStd.address = this.studentObj.address;
    };

    localStorage.setItem('Angular17CRUD', JSON.stringify(this.studentList));
    this.closeModel();
  }


  onDelete(item: student) {
    const IsDelete = confirm("Are You Sure");

    if (IsDelete) {
      const currentStd = this.studentList.findIndex(m => m.id === this.studentObj.id);
      this.studentList.splice(currentStd, 1);
      localStorage.setItem('Angular17CRUD', JSON.stringify(this.studentList));
    }



  }
}



export class student {
  id: number;
  name: string;
  mobileNo: string;
  email: string;
  city: string;
  state: string;
  code: string;
  address: string;

  constructor() {
    this.id = 0;
    this.name = '';
    this.mobileNo = '';
    this.email = '';
    this.city = '';
    this.state = '';
    this.code = '';
    this.address = '';
  }
}
