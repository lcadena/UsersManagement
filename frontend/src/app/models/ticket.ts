import { Product } from './product';

export class Ticket {
    _id: string;
    name: string;
    cif: string;
    foto: string;
    expedicion: Date;
    products: Product[];

    constructor(_id='', name='',cif='',foto='',expedicion:Date ,products=[] ){
        this._id = _id;
        this.name = name;
        this.cif = cif;
        this.foto = foto;
        this.expedicion = expedicion;
        this.products = products;
    }
}