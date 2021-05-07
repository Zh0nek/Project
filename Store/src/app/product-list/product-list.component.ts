import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ProductListService} from '../product-list.service';
import {Category} from '../interfaces/category';
import {Subject} from 'rxjs';
import { CategoriesService } from '../categories.service';
import { Product } from '../interfaces/product';



@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<undefined>();
  products: Product[] = [];
  category: Category;
  loaded : boolean=false;
  params: number;
  constructor(
    private route: ActivatedRoute, private service: ProductListService,
    private CategoriesService: CategoriesService

  ) {
    this.route.paramMap.subscribe(params => {
      this.params =+params.get('categoryId')
      console.log(this.params)
      this.CategoriesService.getCategories().subscribe((data)=>{
        this.category=data.find(x=>x.id==this.params)
        this.ngOnInit();
      });
    });
  }

  ngOnInit(): void {
    this.getCategoryProducts(this.category);
  }
  getProduct() {
    const a = this.service.getProducts();
    a.subscribe(cat => {this.products = cat;});
  }
  getCategoryProducts(category: Category) {
    const a = this.service.getCategoryProduct(category);
    a.subscribe(cat => {this.products = cat});
    this.loaded = true; 
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  sort(){
    const a = this.service.sort(this.products);
    a.subscribe(cat => this.products = cat );
  }
}