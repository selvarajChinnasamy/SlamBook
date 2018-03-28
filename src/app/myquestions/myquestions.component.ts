import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-myquestions',
  templateUrl: './myquestions.component.html',
  styleUrls: ['./myquestions.component.css']
})
export class MyquestionsComponent implements OnInit {

  constructor(public snackBar: MatSnackBar, private service: ServiceService) { }
  questions;
  noData=true;
  loading=true;
  userid;
  ngOnInit() {
    this.userid = localStorage.getItem('userid');
    this.service.getquestion(this.userid).subscribe(res => {
      this.questions = res;
      if(this.questions.length>0){
        this.noData=false;
      }
      this.loading = false;
    });
  }
  DeletQuestions(i){
  this.service.deletQuestions(this.questions[i].qid).subscribe(res=>{
    this.snackBar.open(res.status, res.code, {
      duration: 2000,
    });
    if(res.code=='200'){
      this.questions.splice(i,1);
    }
  });
  }
}
