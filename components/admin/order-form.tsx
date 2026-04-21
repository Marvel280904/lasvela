"use client";

import { useState } from "react";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import apiClient from "@/lib/axiosClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface OrderFormProps {
  order: {
    id: string;
    status: string;
    trackingNumber?: string;
    notes?: string;
  };
  onSuccess: () => void;
  onCancel: () => void;
}

export function OrderForm({ order, onSuccess, onCancel }: OrderFormProps) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(order.status);
  const [trackingNumber, setTrackingNumber] = useState(order.trackingNumber || "");
  const [notes, setNotes] = useState(order.notes || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const payload = {
        status,
        trackingNumber,
        notes,
      };

      const response = await apiClient.put(`/api/orders/admin/${order.id}`, payload);

      if (response.data?.success) {
        toast.success("Order updated successfully");
        onSuccess();
      } else {
        toast.error(response.data?.message || "Failed to update order");
      }
    } catch (error: any) {
      console.error("Update Order Error:", error);
      toast.error(error.response?.data?.message || "An error occurred while updating the order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        {/* Status Select */}
        <div className="space-y-2">
          <Label htmlFor="status" className="text-xs font-bold uppercase tracking-wider text-gray-500">Order Status</Label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger id="status" className="w-full bg-gray-50 border-gray-200">
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-200">
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tracking Number */}
        <div className="space-y-2">
          <Label htmlFor="tracking" className="text-xs font-bold uppercase tracking-wider text-gray-500">Tracking Number</Label>
          <Input
            id="tracking"
            placeholder="e.g. SG123456789"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            className="bg-gray-50 border-gray-200"
          />
        </div>

        {/* Delivery Notes */}
        <div className="space-y-2">
          <Label htmlFor="notes" className="text-xs font-bold uppercase tracking-wider text-gray-500">Delivery Notes</Label>
          <Textarea
            id="notes"
            placeholder="Extra instructions for delivery..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="bg-gray-50 border-gray-200 min-h-[100px] resize-none"
          />
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={loading}
          className="flex-1 border-gray-200 text-gray-500 hover:bg-gray-50 font-michroma text-[10px] tracking-widest uppercase"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={loading}
          className="flex-1 bg-[#2C3E50] text-[#FCF9EE] hover:bg-[#34495e] font-michroma text-[10px] tracking-widest uppercase"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Update Order
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
