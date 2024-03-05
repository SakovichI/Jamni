export interface IUsers {
  id?: number;
  firstname: string;
  middlename: string;
  surname: string;
  password?: string;
  phone: string;
  email: string;
  juridicalPerson?: string;
  site?: string;
  isAdvertisementNotifications?: boolean;
  workingWithUs?: string;
  designCollection?: string;
  isLocked?: boolean;
  isModerated?: string;
  userType?: string;
  userRole?: string;
}
export interface IUserBalance {
  balance: number;
}
