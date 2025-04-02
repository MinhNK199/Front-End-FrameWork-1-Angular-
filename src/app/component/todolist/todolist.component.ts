import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todolist',
  imports: [CommonModule,FormsModule],
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.css'
})
export class TodolistComponent {
  job = ' '
  jobs = [
    "Ăn",
    "Ngủ",
    "Code"
  ]
  handleAddJob() {
  this.jobs.push(this.job)
  this.job = ''
}
handleDeleteJob(index:any) {
  this.jobs.splice(index, 1)
}

}
