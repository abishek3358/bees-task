import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { log } from 'console';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  statusForm!: FormGroup;
  filterForm!: FormGroup;
  products: any;
  date: any;
  newDate: any;
  d: any;
  obj: any;
  Obj: any;
  isEnable = false;
  isStsEnable = false;
  sts: any;
  isFilterEnable= false;
  cPro: any = [];

  cate:any=[];
  sub_cate: any=[];
  
  

  constructor(private service:ProductService,private route:Router,  private fb: FormBuilder) { }

  ngOnInit(): void {

    this.statusForm = this.fb.group({
      status:null,
      product_id:null
    })
    this.filterForm = this.fb.group({
       top_category_id:   null,
  category_id:  "0", 
 subcategory_id:  "0",
 product_name:  null,
quantity:  null,
 status:  null

    })



    this.service.category().subscribe(
      res =>{
        console.log(res);
        this.cPro = res

        
      }
    )

    

    this.getAllProduct()
  }
getAllProduct(){
  this.service.getAll().subscribe(res=>{
    this.products = res

   
  })
}
statusChange(id:any){
  this.isStsEnable = true;
  this.service.getAll().subscribe(res => {
    this.products = res

    this.products.forEach((x: any) => {

      if (x.product_id == id) {
        this.Obj = x
      }

    });
    console.log(this.obj);
    
})
}

filterClear(){
this.filterForm.reset({});
this.getAllProduct()
}

filterTable(){
  this.service.filterProd(this.filterForm.value).subscribe(
    res =>{
      console.log(res);
      
    }
  )
}



filter(){

  this.isFilterEnable = true;




}

filterClodse(){
  this.isFilterEnable = false;
  this.filterForm.reset({});

  this.getAllProduct();
}

sele(sts:any){
  this.sts = sts
  }
updateStatus(id:any){
  console.log(this.statusForm.value);
  
  this.statusForm.patchValue({
    product_id:id,
    
 
    
  })
  

  this.service.stsUpd(this.statusForm.value).subscribe(
    res =>{
      console.log(res);
      
    }
  )

console.log(id);

}

viewProduct(id:any){
  this.isEnable = true;
  this.service.getAll().subscribe(res => {
    this.products = res

    this.products.forEach((x: any) => {

      if (x.product_id == id) {
        this.obj = x
      }

    });
    console.log(this.obj);
    
})


}
editProduct(id:any){

  this.route.navigate(["/home/product-form/" + id])

}
deleteProduct(id:any){

console.log(id);
this.service.delProd(id).subscribe(
  res=>{
console.log(res);

  }
)

  
}

selected(obj:any){
  console.log(obj);
  


  this.cPro.forEach((x: any) => {
    if (x.top_category_id == obj) {
      let tId = x.top_category_id
      this.cate = x[tId]

    }
  });


 console.log(this.cate);
 

}
Cselected(obj:any){
  console.log(obj);

  this.cate.forEach((x: any) => {
    if (x.category_id == obj) {
      let tId = x.category_id
      this.sub_cate = x[tId]

    }
  });


 console.log(this.sub_cate);
 

}
}
