export type MyOrderStatus =
    | "PENDING"
    | "PREPARING"
    | "READY"
    | "COMPLETED"
    | "CANCELLED";

export interface MyOrderItem {
    id: string;
    orderId: string;
    menuItemId: string;
    itemName: string;
    itemPrice: string;
    quantity: number;
    lineTotal: string;
    createdAt: string;
}

export interface MyOrder {
    id: string;
    orderNumber: string;
    userId: string;
    status: MyOrderStatus;
    customerName: string;
    customerEmail: string;
    deliveryAddress: string;
    subtotal: string;
    total: string;
    placedAt: string;
    items: MyOrderItem[];
    createdAt: string;
    updatedAt: string;
}