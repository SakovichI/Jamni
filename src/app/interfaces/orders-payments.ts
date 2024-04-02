export interface IOrder {
  id?: number;
  userId?: number;
  status?: string;
  items: [];
  email: string;
  address: any[];
  discountCode: string;
  deliveryType: string;
  payType: 'CASH' | 'CARD';
  totalCost?: number;
  createdAt: Date;
}
export interface IPayment {
  orderId: number;
  ipAddress: string;
  cardCryptogramPacket: string;
  name: string;
  email: string;
  description?: string;
}
