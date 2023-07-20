import { Component, OnInit } from '@angular/core';
import {productList, productModel} from "../image.model";
import {Options} from "ng5-slider";
import {HttpClient} from "@angular/common/http";
import { AuthService } from 'src/app/account/auth/auth.service';
import { ImageModel } from 'src/app/core/models/auth.models';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit {


  breadCrumbItems: Array<{}>;
  pricevalue = 100;
  minVal = 100;
  maxVal = 500;

  priceoption: Options = {
    floor: 0,
    ceil: 800,
    translate: (value: number): string => {
      return '$' + value;
    },
  };
  log = '';
  discountRates: number[] = [];
  public products: productModel[] = [];
  public productTemp: productModel[] = [];
  public allImages: ImageModel[] = [];
  constructor(private http: HttpClient,private imageService : AuthService) { }

  ngOnInit() {
    // this.breadCrumbItems = [{ label: 'Ecommerce' }, { label: 'Products', active: true }];
    // this.products = Object.assign([], productList);

    // this.http.get<any>(`http://localhost:8000/api/products`)
    //   .subscribe((response) => {
    //     this.products = response.data;
    //   });

    this.imageService.getImages().subscribe((response:any) => {
      console.log(response);
        this.allImages = response.data;
      });
  }

  searchFilter(e) {
    const searchStr = e.target.value;
    this.products = productList.filter((product) => {
      return product.name.toLowerCase().search(searchStr.toLowerCase()) !== -1;
    });
  }

  discountLessFilter(e, percentage) {
    if (e.target.checked && this.discountRates.length === 0) {
      this.products = productList.filter((product) => {
        return product.discount < percentage;
      });
    }
    else {
      this.products = productList.filter((product) => {
        return product.discount >= Math.max.apply(null, this);
      }, this.discountRates);
    }
  }

  discountMoreFilter(e, percentage: number) {
    if (e.target.checked) {
      this.discountRates.push(percentage);
    } else {
      this.discountRates.splice(this.discountRates.indexOf(percentage), 1);
    }
    this.products = productList.filter((product) => {
      return product.discount >= Math.max.apply(null, this);
    }, this.discountRates);
  }

  valueChange(value: number, boundary: boolean): void {
    if (boundary) {
      this.minVal = value;
    } else {
      this.maxVal = value;
      this.products = productList.filter(function (product) {
        return product.disRate <= value && product.disRate >= this;
      }, this.minVal);
    }
  }

}