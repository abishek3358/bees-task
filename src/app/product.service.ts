import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = environment.api_url + 'product/'
  private categoryUrl = environment.api_url + 'category/gettopcategories/1'
  private productCreate = this.baseUrl + 'add_product'
  private allProduct = this.baseUrl + 'getall_products/0'
  private delProduct = this.baseUrl + 'deleteproduct'
  private updateProduct = this.baseUrl + 'update_product'
  private updateStatusProduct = this.baseUrl + 'update_productstatus'
  private filterProduct = this.baseUrl + 'filter_product'

  constructor(private http: HttpClient) { }

  addForm(data: any) {
    return this.http.post<any>(this.productCreate, data)
  }
  getAll() {
    return this.http.get<any>(this.allProduct)
  }
  delProd(id:any) {

    
    return this.http.post<any>(this.delProduct,{params:id })
  }
  updateProd(data: any) {
    return this.http.post<any>(this.updateProduct, data)
  }
  category(){
    return this.http.get<any>(this.categoryUrl)
  }
  stsUpd(data: any) {
    return this.http.post<any>(this.updateStatusProduct, {params:data})
  }
  filterProd(data:any){
    return this.http.post<any>(this.filterProduct, {params:data})
  }

}
