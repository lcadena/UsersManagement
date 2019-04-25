import { Product } from './product';

export class Tienda {
    _id: string;
    name: string;
    direccion: string;
    products: Product[];

    constructor(_id='', name='', direccion='', products=[]){
        this._id =_id;
        this.name = name;
        this.direccion = direccion;
        this.products = products;
    }
}