export type AdminOrderStatus =
  | "PENDING"
  | "PREPARING"
  | "READY"
  | "COMPLETED";

export interface AdminOrder {
  id: string;
  status: AdminOrderStatus;
  customerName: string;
  total: string;
  createdAt: string;
}

export interface AdminOrderItem {
  itemName: string;
  quantity: number;
  lineTotal: string;
}

export interface AdminOrderDetails {
  id: string;
  deliveryAddress: string;
  total: string;
  items: AdminOrderItem[];
}

export interface UpdateAdminOrderStatusResponse {
  id: string;
  message: string;
}