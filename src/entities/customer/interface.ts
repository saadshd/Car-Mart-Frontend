export interface CustomerType {
  _id: string;
  name: string;
  cnic: number;
  address: string;
  contact: string;
  purchaseHistory: { chasisNo: string }[];
}
