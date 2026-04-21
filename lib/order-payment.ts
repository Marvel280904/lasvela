import apiClient from "@/lib/axiosClient";

export interface OrderItem {
  productId: string;
  quantity: number;
  selectedMaterial: string;
  selectedDimension: string;
  selectedAddOnNames: string[];
}

export interface ShippingAddress {
  fullName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

export interface CreateOrderPayload {
  customerEmail: string;
  customerName: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  notes: string;
}

/**
 * Handles the logic for creating an order and then creating a payment session.
 * Finally redirects the user to Hitpay's payment URL.
 */
export const processCheckoutAndPayment = async (payload: CreateOrderPayload) => {
  try {
    // 1. Create Order
    const orderResponse = await apiClient.post('/api/orders', payload);
    console.log("Respond API Orders:", orderResponse.data);
    
    // Check if the response has the order id
    const orderId = orderResponse.data?.id || orderResponse.data?.data?.id;
    
    if (!orderId) {
      throw new Error("Failed to create order: Order ID not found in response");
    }
    
    // 2. Create Payment
    const paymentResponse = await apiClient.post('/api/payments/create', { 
      orderId: orderId 
    });
    console.log("Respond API Payment:", paymentResponse.data);
    
    const paymentUrl = paymentResponse.data?.paymentUrl || paymentResponse.data?.data?.paymentUrl;
    
    if (!paymentUrl) {
      throw new Error("Failed to create payment: Payment URL not found in response");
    }
    
    // 3. Redirect to paymentUrl (Hitpay)
    if (typeof window !== "undefined") {
      window.location.href = paymentUrl;
    }
    
  } catch (error: any) {
    // Extract error message from API response if available
    const apiErrorMessage = error.response?.data?.message || error.response?.data?.error || error.message;
    console.error("Payment Process Error:", apiErrorMessage, error.response?.data);
    
    // Throw error with descriptive message
    throw new Error(apiErrorMessage);
  }
};
