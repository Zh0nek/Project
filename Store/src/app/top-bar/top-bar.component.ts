import { UserService } from '../user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../interfaces/category';
import { CategoryService } from '../category.service';
import { Router } from '@angular/router';
import { User } from '../interfaces/User';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  user: User;

  constructor(private route: ActivatedRoute, private categoriesService: CategoryService, private router: Router,
     private userService: UserService) {}

  isLogin:boolean;
  categories: Category[];
  ngOnInit(): void {
    if(+localStorage.getItem("user_id") != 0){
      this.isLogin = true;
    } else this.isLogin = false;
  }
  reload() {
    location.reload();
  }
  logout() {
    this.router.navigate(['/login']);
    window.location.reload();
  }
}