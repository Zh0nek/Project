import { Injectable, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Product } from './interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class CartService implements OnInit {
  BASE_URl = "http://127.0.0.1:8000/";
  CART_URL = "http://127.0.0.1:8000/"
  items: Product[];

  constructor(private http: HttpClient) {}
  ngOnInit(){
    this.items = this.getItems();
  }
  addToCart(product:Product):void{
    this.items = this.getItems();
    this.items.push(product);
    this.saveCart();
  }
  getItems(){
    if(this.items){
      return this.items;
    }
    if(localStorage.getItem('cart')){
      return JSON.parse(localStorage.getItem('cart')||'');
    }
  }
  saveCart():void{
    localStorage.setItem('cart', JSON.stringify(this.items));
  }
  clearCart() {
    this.items = [];
    return this.saveCart();
  }
  removeProduct(id:number):void{
    this.items.splice(id, 1);
    this.saveCart();
  }
  getShippingPrices() {
    return this.http.get('/assets/shipping.json');
  }
}