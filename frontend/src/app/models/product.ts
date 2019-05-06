export class Product {
  _id: string;
  name: string;
  picture: string;
  price: number;
















  
  category: string;
  garantia: Date;
  devolucion: Date;
  description: string;

  constructor(_id = '', name = '', picture = '', price = 0, category = '', garantia = null, devolucion = null, description = ''){
    this._id = _id;
    this.name = name;
    this.picture = picture;
    this.price = price;
    this.category = category;
    this.garantia = garantia;
    this.devolucion = devolucion;
    this.description = description;
  }
}
