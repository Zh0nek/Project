import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ProductListComponent } from './product-list/product-list.component';
import { NavigationComponent } from './navigation/navigation.component';
import { CategoriesComponent } from './categories/categories.component';
import {ProductItemComponent} from './product-item/product-item.component';
import { CartComponent } from './cart/cart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import { TestComponent } from './test/test.component';
import {MatButtonModule} from '@angular/material/button';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthentificationService } from './authentification.service';
import { AuthInterceptor } from './auth.intercept';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    RouterModule.forRoot([
      {path: '', component: CategoriesComponent},
      {path: 'category/:categoryId/products', component: CategoriesComponent},
      {path: 'products/:productId', component: ProductItemComponent},
      {path: 'cart', component: CartComponent},
      {path: 'login', component: LoginComponent},
      {path: 'aboutus', component: AboutUsComponent },
    ]),
    BrowserAnimationsModule,
    MatButtonModule,
    FormsModule,
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    ProductListComponent,
    NavigationComponent,
    CategoriesComponent,
    ProductItemComponent,
    CartComponent,
    TestComponent,
    FooterComponent,
    LoginComponent,
    AboutUsComponent,
  ],
  bootstrap: [ AppComponent ], 
  entryComponents: [TestComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true 
    }
  ],
})
export class AppModule { }

