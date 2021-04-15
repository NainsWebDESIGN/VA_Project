import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Console',
  templateUrl: './Console.component.html',
  styleUrls: ['./Console.component.css']
})
export class ConsoleComponent implements OnInit {
  Menu: boolean = false;
  constructor(private router: Router) { }
  menuEffect() {
    this.Menu = !this.Menu;
  }
  logout() {
    localStorage.removeItem('login');
    this.router.navigate(['/Valleys_Awesome']);
  }
  ngOnInit() {
  }

}
