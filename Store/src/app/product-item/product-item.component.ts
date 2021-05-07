import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {CartService} from '../cart.service';
import {ProductListService} from '../product-list.service'

import { CommentService} from '../comment.service'
import { Product } from '../interfaces/product';
import { Comment } from '../interfaces/comment';


@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  product: Product;
  comments: Comment[] = [];
  public title = ""
  public body = ""
  public user_id=0
  public post:boolean;
  public comment_to_change:Comment;
  
  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private productListService: ProductListService,
    private commentService: CommentService
  ) { }

  ngOnInit(): void {
    this.post = true;
    const token = localStorage.getItem('token');
    this.user_id = +localStorage.getItem('user_id'); //convert to number 
    this.route.paramMap.subscribe(params => {
      this.productListService.getProduct(+params.get('productId')).subscribe((data)=>{
        this.product = data;
        this.getComments();
      })
    });
    
  }

  addToCart(product) {
    if(this.user_id == 0) {
      window.alert('You need to login.');
      return;
    }
    this.cartService.addToCart(product);
    window.alert('This item has been added to your cart!');
  }
  
  addComment(): void{// +"3" = 3, undefined, None, + => 0
    if(this.user_id == 0) {
      window.alert('You need to login.');
      return;
    }
    this.commentService.addComment(this.title,this.body,this.product.id,this.user_id).
    subscribe(comments => {window.location.reload();}) 
  }
  
  getComments(){
    this.commentService.getCommentsByProductId(this.product.id).
    subscribe((data) => {this.comments = data;},
    (error)=>{console.log(error);});
  }

  deleteComment(comment:Comment){
    if(this.user_id != comment.user_id){
      alert("This is not your comment");
      return;
    }
    else if(this.user_id == comment.user_id){
      this.commentService.deleteComment(comment.id).
      subscribe((data)=>{alert("Deleted");
        window.location.reload();})
    }
  }

  changeComment(){
    this.comment_to_change['title'] = this.title;
    this.comment_to_change['body'] = this.body;
    this.commentService.updateComment(this.comment_to_change).
    subscribe((data)=>{alert("Chaged");
      window.location.reload();})
  }

  fromPostToChange(comment:Comment):void{
    if(comment.user_id != this.user_id){
      alert('Not your comment');
      return;
    }
    this.post = false;
    this.comment_to_change = comment;
    this.title = comment.title;
    this.body = comment.body;
  }
  fromChangeToPost():void{
    this.post = true;
    this.comment_to_change = undefined;
    this.title = '';
    this.body = '';
  }
}