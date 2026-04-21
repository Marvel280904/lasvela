"use client";

import { useEffect, useState } from "react";
import { 
  Eye, 
  ShoppingBag, 
  CreditCard, 
  TrendingUp, 
  Loader2, 
  Calendar, 
  User, 
  Truck, 
  MapPin, 
  Package, 
  Info,
  Pencil
} from "lucide-react";
import { OrderForm } from "@/components/admin/order-form";
import apiClient from "@/lib/axiosClient";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

// --- Interfaces ---

interface OrderStats {
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  ordersByStatus: Record<string, number>;
}

interface OrderItem {
  productId: string;
  productName: string;
  productSlug: string;
  price: number;
  quantity: number;
  image: string;
  variantId: string;
  variantName: string;
  variantAttributes: Record<string, string>;
  selectedMaterial: string;
  selectedDimension: string;
  selectedAddOns: {
    id: string;
    name: string;
    description: string;
    price: number;
  }[];
}

interface ShippingAddress {
  fullName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

interface Order {
  id: string;
  userId: string | null;
  customerEmail: string;
  customerName: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: string;
  referenceNumber: string;
  trackingNumber: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

// --- Helper Components ---

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-SG', {
    style: 'currency',
    currency: 'SGD',
  }).format(value);
};

const StatusBadge = ({ status }: { status: string }) => {
  const statusLower = status?.toLowerCase() || '';
  
  if (statusLower === 'completed' || statusLower === 'paid' || statusLower === 'success') {
    return <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-none capitalize">{status}</Badge>;
  }
  if (statusLower === 'pending' || statusLower === 'processing') {
    return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-none capitalize">{status}</Badge>;
  }
  if (statusLower === 'cancelled' || statusLower === 'failed') {
    return <Badge className="bg-red-100 text-red-700 hover:bg-red-200 border-none capitalize">{status}</Badge>;
  }
  
  return <Badge variant="secondary" className="capitalize">{status}</Badge>;
};

// --- Main Page ---

export default function AdminOrdersPage() {
  const [stats, setStats] = useState<OrderStats | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedOrderForEdit, setSelectedOrderForEdit] = useState<Order | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [statsRes, ordersRes] = await Promise.all([
        apiClient.get('/api/orders/admin/stats'),
        apiClient.get('/api/orders/admin/all?limit=100')
      ]);

      if (statsRes.data?.success) {
        setStats(statsRes.data.data);
      }
      if (ordersRes.data?.success) {
        //console.log("Admin All Orders Respond:", ordersRes.data);
        setOrders(ordersRes.data.data);
      }
    } catch (error) {
      console.error("Error fetching admin orders data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetail = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailOpen(true);
  };

  const handleEditOrder = (order: Order) => {
    setSelectedOrderForEdit(order);
    setIsEditOpen(true);
  };

  const handleEditSuccess = () => {
    setIsEditOpen(false);
    fetchData(); // Refresh list and stats
  };

  if (loading && !stats) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 animate-spin text-[#2C3E50] mb-4" />
        <p className="text-gray-500 font-be-vietnam">Loading orders and statistics...</p>
      </div>
    );
  }

  return (
    <div className="p-2 space-y-8 font-be-vietnam max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-michroma font-bold text-[#2C3E50]">Order Management</h1>
        <p className="text-gray-500 mt-2">Manage and track your customer orders and sales performance.</p>
      </div>

      {/* --- KPI Cards --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none shadow-sm bg-white overflow-hidden transition-all hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-bold font-michroma text-gray-500 uppercase tracking-wider">Total Orders</CardTitle>
            <div className="bg-blue-50 p-2 rounded-lg">
              <ShoppingBag className="w-5 h-5 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#2C3E50]">{stats?.totalOrders || 0}</div>
            <p className="text-[10px] text-gray-400 mt-1">Confirmed orders in system</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-white overflow-hidden transition-all hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-bold font-michroma text-gray-500 uppercase tracking-wider">Total Revenue</CardTitle>
            <div className="bg-green-50 p-2 rounded-lg">
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#2C3E50]">{formatCurrency(stats?.totalRevenue || 0)}</div>
            <p className="text-[10px] text-gray-400 mt-1">Gross sales including taxes</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-white overflow-hidden transition-all hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-bold font-michroma text-gray-500 uppercase tracking-wider">Avg. Order Value</CardTitle>
            <div className="bg-purple-50 p-2 rounded-lg">
              <CreditCard className="w-5 h-5 text-purple-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#2C3E50]">{formatCurrency(stats?.averageOrderValue || 0)}</div>
            <p className="text-[10px] text-gray-400 mt-1">Average spent per transaction</p>
          </CardContent>
        </Card>
      </div>

      {/* --- Status Breakdown (Horizontal List) --- */}
      {stats?.ordersByStatus && (
        <div className="flex flex-wrap gap-3">
          {Object.entries(stats.ordersByStatus).map(([status, count]) => (
            <div key={status} className="bg-white px-4 py-2 rounded-full border border-gray-100 flex items-center shadow-sm">
              <span className="text-[10px] font-bold font-michroma text-gray-400 uppercase mr-2 tracking-tighter">{status}</span>
              <span className="text-sm font-bold text-[#2C3E50]">{count}</span>
            </div>
          ))}
        </div>
      )}

      {/* --- Orders Table --- */}
      <Card className="border-none shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-michroma font-bold text-[#2C3E50]">Recent Orders</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="rounded-md border-t border-gray-100 overflow-hidden">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="font-bold py-4 text-center">Customer</TableHead>
                  <TableHead className="font-bold hidden md:table-cell text-center">Email</TableHead>
                  <TableHead className="font-bold text-center">Total</TableHead>
                  <TableHead className="font-bold text-center">Status</TableHead>
                  <TableHead className="font-bold text-center">Created At</TableHead>
                  <TableHead className="font-bold text-center">Updated At</TableHead>
                  <TableHead className="text-right font-bold pr-6">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-48 text-center text-gray-400">
                      {loading ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : "No orders found."}
                    </TableCell>
                  </TableRow>
                ) : (
                  orders.map((order) => (
                    <TableRow key={order.id} className="hover:bg-gray-50/50 transition-colors text-center">
                      <TableCell className="font-bold py-4 text-[#2C3E50]">{order.customerName}</TableCell>
                      <TableCell className="text-gray-500 hidden md:table-cell text-xs">{order.customerEmail}</TableCell>
                      <TableCell className="font-bold text-[#2C3E50]">{formatCurrency(order.total)}</TableCell>
                      <TableCell>
                        <StatusBadge status={order.status} />
                      </TableCell>
                      <TableCell className="text-xs text-gray-500">
                        {format(new Date(order.createdAt), 'MMM dd, yyyy HH:mm')}
                      </TableCell>
                      <TableCell className="text-xs text-gray-500">
                        {format(new Date(order.updatedAt), 'MMM dd, yyyy HH:mm')}
                      </TableCell>
                      <TableCell className="text-right pr-6">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="hover:bg-blue-50 text-blue-600 rounded-full h-8 w-8"
                            onClick={() => handleViewDetail(order)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="hover:bg-amber-50 text-amber-600 rounded-full h-8 w-8"
                            onClick={() => handleEditOrder(order)}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* --- Detail Modal --- */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-4xl max-h-[92vh] flex flex-col p-0 gap-0 border-none bg-white font-be-vietnam overflow-hidden shadow-2xl">
          {selectedOrder && (
            <>
              {/* Sticky Header */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 border-b border-gray-100 bg-white shrink-0 relative">
                <DialogHeader className="flex flex-col items-start gap-1">
                  <DialogTitle className="text-2xl font-michroma font-bold text-[#2C3E50]">
                    Order Details
                  </DialogTitle>
                  <DialogDescription className="text-xs font-mono bg-gray-100 px-2 py-0.5 rounded text-gray-500">
                    Ref: {selectedOrder.referenceNumber}
                  </DialogDescription>
                </DialogHeader>
                <div className="flex items-center gap-3 pr-8">
                  <StatusBadge status={selectedOrder.status} />
                </div>
              </div>

              {/* Scrollable Body */}
              <div className="flex-1 overflow-y-auto p-8 custom-scrollbar space-y-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                  {/* Summary / Meta */}
                  <div className="lg:col-span-1 space-y-8">
                    <section className="space-y-4">
                      <div className="flex items-center gap-2 text-[#2C3E50] font-bold text-sm border-b pb-2">
                        <User className="w-4 h-4" /> Customer Information
                      </div>
                      <div className="space-y-1 text-sm">
                        <p className="font-bold text-[#2C3E50]">{selectedOrder.customerName}</p>
                        <p className="text-blue-600 underline font-medium">{selectedOrder.customerEmail}</p>
                        <p className="text-black">{selectedOrder.shippingAddress.phone}</p>
                      </div>
                    </section>
                    
                    <section className="space-y-4">
                      <div className="flex items-center gap-2 text-[#2C3E50] font-bold text-sm border-b pb-2">
                        <MapPin className="w-4 h-4" /> Shipping Address
                      </div>
                      <div className="text-sm text-black leading-relaxed">
                        <p>{selectedOrder.shippingAddress.addressLine1}</p>
                        {selectedOrder.shippingAddress.addressLine2 && <p>{selectedOrder.shippingAddress.addressLine2}</p>}
                        <p>{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.postalCode}</p>
                        <p className="mt-1 font-bold">{selectedOrder.shippingAddress.country}</p>
                      </div>
                    </section>

                    <section className="space-y-4">
                      <div className="flex items-center gap-2 text-[#2C3E50] font-bold text-sm border-b pb-2">
                        <Calendar className="w-4 h-4" /> Timestamps
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-[11px] text-black">
                        <div>
                          <p className="uppercase font-bold tracking-widest mb-1">Created</p>
                          <p className="text-[12px]">{format(new Date(selectedOrder.createdAt), 'MMM dd, yyyy HH:mm')}</p>
                        </div>
                        <div>
                          <p className="uppercase font-bold tracking-widest mb-1">Updated</p>
                          <p className="text-[12px]">{format(new Date(selectedOrder.updatedAt), 'MMM dd, yyyy HH:mm')}</p>
                        </div>
                      </div>
                    </section>
                  </div>

                  {/* Main Info */}
                  <div className="lg:col-span-2 space-y-10">
                    {/* Items */}
                    <section className="space-y-5">
                      <div className="flex items-center justify-between text-[#2C3E50] font-bold text-sm border-b pb-2">
                        <div className="flex items-center gap-2"><Package className="w-4 h-4" /> Order Items</div>
                        <span className="text-xs font-normal text-gray-400">{selectedOrder.items.length} Product(s)</span>
                      </div>
                      <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                        {selectedOrder.items.map((item, idx) => (
                          <div key={idx} className="flex gap-4 p-3 bg-gray-50 rounded-xl">
                            <div className="w-20 h-20 shrink-0 bg-white border border-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                              <img src={item.image} alt={item.productName} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                            </div>
                            <div className="flex-1 space-y-1">
                              <h5 className="text-sm font-bold text-[#2C3E50] line-clamp-1">{item.productName}</h5>
                              <p className="text-[10px] text-gray-400 mb-1">{item.variantName}</p>
                              <div className="flex flex-wrap gap-1.5 pt-1">
                                <Badge variant="outline" className="text-[9px] py-0 border-gray-200 text-gray-500 font-medium">MAT: {item.selectedMaterial}</Badge>
                                <Badge variant="outline" className="text-[9px] py-0 border-gray-200 text-gray-500 font-medium">DIM: {item.selectedDimension}</Badge>
                              </div>
                              {item.selectedAddOns?.length > 0 && (
                                <div className="pt-2">
                                  <p className="text-[9px] font-bold text-gray-400 uppercase mb-1">Add-ons:</p>
                                  <div className="flex flex-wrap gap-1">
                                    {item.selectedAddOns.map(addon => (
                                      <span key={addon.id} className="text-[9px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-sm font-medium">{addon.name}</span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                            <div className="text-right flex flex-col justify-between items-end">
                              <span className="text-xs font-bold text-[#2C3E50]">{formatCurrency(item.price)}</span>
                              <span className="text-[10px] text-gray-400 font-bold">x{item.quantity}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* Financial Summary */}
                    <section className="bg-[#2C3E50]/5 p-6 rounded-2xl space-y-4">
                      <div className="space-y-2 border-b border-[#2C3E50]/10 pb-4">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500">Subtotal</span>
                          <span className="font-bold text-[#2C3E50]">{formatCurrency(selectedOrder.subtotal)}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500">Shipping Fee</span>
                          <span className="font-bold text-[#2C3E50]">{formatCurrency(selectedOrder.shipping)}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500">Estimated Tax</span>
                          <span className="font-bold text-[#2C3E50]">{formatCurrency(selectedOrder.tax)}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-lg font-michroma font-bold text-[#2C3E50]">GRAND TOTAL</span>
                        <span className="text-2xl font-bold text-[#2C3E50]">{formatCurrency(selectedOrder.total)}</span>
                      </div>
                    </section>

                    {/* Logistics / Extra */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <section className="space-y-3">
                        <div className="flex items-center gap-2 text-[#2C3E50] font-bold text-sm">
                          <Truck className="w-4 h-4" /> Logistics Info
                        </div>
                        <div className="p-4 bg-white border border-gray-100 rounded-xl space-y-2">
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Tracking Number</p>
                          <p className="text-sm font-mono text-[#2C3E50] break-all">{selectedOrder.trackingNumber || "Not available yet"}</p>
                        </div>
                      </section>
                      <section className="space-y-3">
                        <div className="flex items-center gap-2 text-[#2C3E50] font-bold text-sm">
                          <Info className="w-4 h-4" /> Delivery Notes
                        </div>
                        <div className="p-4 bg-white border border-gray-100 rounded-xl">
                          <p className="text-xs text-gray-500 italic leading-relaxed">
                            "{selectedOrder.notes || "No special instructions provided by customer."}"
                          </p>
                        </div>
                      </section>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* --- Edit Modal --- */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-md p-0 border-none bg-white font-be-vietnam overflow-hidden shadow-2xl">
          {selectedOrderForEdit && (
            <>
              <DialogHeader className="px-6 py-3 border-b border-gray-300 bg-white shrink-0">
                <DialogTitle className="text-xl font-michroma font-bold text-[#2C3E50]">
                  Update Order
                </DialogTitle>
                <DialogDescription className="text-xs font-mono text-gray-400 mt-1">
                  Ref: {selectedOrderForEdit.referenceNumber}
                </DialogDescription>
              </DialogHeader>

              <div className="px-6 pb-6 bg-white">
                <OrderForm 
                  order={selectedOrderForEdit} 
                  onSuccess={handleEditSuccess} 
                  onCancel={() => setIsEditOpen(false)} 
                />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
