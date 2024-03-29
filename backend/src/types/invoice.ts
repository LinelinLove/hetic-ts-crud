interface Invoice {
  id?: number;
  type: string;
  date: Date;
  firstname: string;
  lastname: string;
  address: string;
  country: string;
  town: string;
  postal_code: number;
  name: string;
  price: number;
  quantity: number;
  tva: number;
}

export default Invoice;
