import { Component, OnInit } from '@angular/core';
import {CategoriesService} from '../categories.service';
import {Category} from '../interfaces/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories;
  
  constructor(private service: CategoriesService) { }

  ngOnInit(): void {
    this.getCategories();
  }
  getCategories() {
    const a = this.service.getCategories();
    a.subscribe(cat => this.categories = cat );
  }
  onSelect(category: Category) {}
}
