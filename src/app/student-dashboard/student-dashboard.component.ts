import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { StudentModel } from './student.module';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {

  studentValue!:FormGroup

  studentObj:StudentModel = new StudentModel;

  studentList : any=[];

  btnUpdateShow : boolean = false;
  btnSaveShow : boolean = true;

  constructor(private formBuilder:FormBuilder, private api:ApiService) { }

  ngOnInit(): void {
    this.studentValue = this.formBuilder.group({
      name:[''],
      class:[''],
      email:[''],
      mobile:['']
    })
    this.getStudent();
  }
//for Adding the record of students
  AddStudent(){

    this.studentObj.name = this.studentValue.value.name;
    this.studentObj.class = this.studentValue.value.class;
    this.studentObj.email = this.studentValue.value.email;
    this.studentObj.mobile = this.studentValue.value.mobile;
    this.api.postStudent(this.studentObj).subscribe({next:(v) =>{
      console.log(v)
    },
    error:(e) =>{
      console.log(e)
      alert("Error")
    },
    complete:() => {
      console.log("Student record added!")
      alert("Student record added!")
      this.getStudent();
      this.studentValue.reset();
    }})
  }
  getStudent(){
    this.api.getStudent().subscribe(res =>{
      this.studentList = res;
    })
  }
//for deleting the record of students
  deleteStudent(data:any){
    this.api.deleteStudent(data.id).subscribe({next:(v) =>{
      console.log(v)
    },
    error:(e) =>{
      console.log(e)
      alert("Error")
    },
    complete:() => {
      console.log("Student record deleted!")
      alert("Student record deleted!")
      this.getStudent();
    }})
  }
//for editing the record of students
  editStudent(data:any){
    this.studentValue.controls["name"].setValue(data.name);
    this.studentValue.controls["class"].setValue(data.class);
    this.studentValue.controls["email"].setValue(data.email);
    this.studentValue.controls["mobile"].setValue(data.mobile);
    this.studentObj.id = data.id;
    this.showUpdate();
  }
//for updating the record of students
  updateStudent(){
    this.studentObj.name = this.studentValue.value.name;
    this.studentObj.class = this.studentValue.value.class;
    this.studentObj.email = this.studentValue.value.email;
    this.studentObj.mobile = this.studentValue.value.mobile;
    this.api.putStudent(this.studentObj, this.studentObj.id).subscribe({next:(v) =>{
      console.log(v)
    },
    error:(e) =>{
      console.log(e)
      alert("Error")
    },
    complete:() => {
      console.log("Student record updated!")
      alert("Student record updated!")
      this.getStudent();
      this.studentValue.reset();
      this.showSave();
      this.studentObj.id = 0;
    }})
  }

  showSave(){
    this.btnSaveShow = true;
    this.btnUpdateShow = false;
  }
  showUpdate(){
    this.btnSaveShow = false;
    this.btnUpdateShow = true;
  }
}
