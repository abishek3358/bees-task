import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { error, log } from 'console';
import { first } from 'rxjs';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  productForm!: FormGroup
  id: any;
  obj: any = {};
  products: any = [];
  cPro: any = [];
  tId: any;
  cate: any = [];
  sub_cate: any = [];
  validation = false;
  constructor(
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private service: ProductService
  ) { }

  ngOnInit(): void {
    this.id = this.activeRoute.snapshot.params['id']
    this.service.category().subscribe(
      res => {
        console.log(res);
        this.cPro = res
      }
    )
    this.service.getAll().subscribe(res => {
      this.products = res
      this.products.forEach((x: any) => {
        if (x.product_id == this.id) {
          this.obj = x
        }
      });
      this.productForm.patchValue({
        top_category_id: this.obj.top_category_name,
        category_id: this.obj.category_name,
        subcategory_id: this.obj.subcategory_id,
        product_name: this.obj.product_name,
        quantity: this.obj.quantity,
        price: this.obj.price,
        description: this.obj.description,
        file: this.obj.file,
        image: this.obj.image,
        status: this.obj.status,
      })
      console.log(this.obj);
    })
    this.productForm = this.fb.group({
      top_category_id: [null, Validators.required],
      category_id: [null, Validators.required],
      subcategory_id: [null, Validators.required],
      product_name: [null, Validators.required],
      quantity: [null, Validators.required],
      price: [null, Validators.required],
      description: [null, Validators.required],
      file: [null, Validators.required],
      image: [null, Validators.required],
      status: [null, Validators.required],
    })
  }

  get f() {
    return this.productForm.controls
  }
  onSubmit() {
    this.validation = true
    if (this.productForm.invalid) {
      return
    }

    if (this.id) {
      this.service.updateProd(this.productForm.value).pipe(first()).subscribe(
        res => {
          alert()
        }
      )
    } else {
      this.service.addForm(this.productForm.value).pipe(first()).subscribe(res => {
        alert("k")
      }, error => {
        alert("KL")
      }
      )
    }

  }

  selected(obj: any) {
    this.cPro.forEach((x: any) => {
      if (x.top_category_id == obj) {
        let tId = x.top_category_id
        this.cate = x[tId]

      }
    });
    console.log(this.cate);
  }
  Cselected(obj: any) {
    this.cate.forEach((x: any) => {
      if (x.category_id == obj) {
        let tId = x.category_id
        this.sub_cate = x[tId]

      }
    });
    console.log(this.sub_cate);
  }
}
