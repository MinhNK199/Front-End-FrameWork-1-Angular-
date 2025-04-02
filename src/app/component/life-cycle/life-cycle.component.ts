import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-life-cycle',
  imports: [],
  templateUrl: './life-cycle.component.html',
  styleUrl: './life-cycle.component.css'
})
export class LifeCycleComponent {
  @Input() data!: string;
  child = "abc";
  handleChild() {
    this.child = "xyz";
  }

  constructor() {
    console.log('constructor called');
  }
  ngOnChanges() {
    console.log('ngOnChanges called');
  }
  ngOnInit() {
    console.log('ngOnInit called');
  }
  ngDoCheck() {
    console.log('ngDoCheck called');
  }
  ngAfterContentInit() {
    console.log('ngAfterContentInit called');
  }
  ngAfterContentChecked() {
    console.log('ngAfterContentChecked called');
  }
  ngAfterViewInit() {
    console.log('ngAfterViewInit called');
  }
  ngAfterViewChecked() {
    console.log('ngAfterViewChecked called');
  }
  ngOnDestroy() {
    console.log('ngOnDestroy called');
  }
}
