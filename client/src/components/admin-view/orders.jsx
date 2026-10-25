import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import AdminOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  resetOrderDetails,
  deleteOrderForAdmin,
} from "@/store/admin/order-slice";
import { Badge } from "../ui/badge";
import { Trash2 } from "lucide-react";

function AdminOrdersView() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { orderList, orderDetails } = useSelector((state) => state.adminOrder);
  const dispatch = useDispatch();

  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetailsForAdmin(getId));
  }

  function handleDeleteOrder(id) {
    dispatch(deleteOrderForAdmin(id)).then(() =>
      dispatch(getAllOrdersForAdmin())
    );
  }

  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>All Orders</CardTitle>
      </CardHeader>
      <CardContent>
        {/* The container below forces a width constraint based on the viewport, 
            which triggers the overflow-x-auto scrollbar. */}
        <div className="w-[calc(100vw-40px)] md:w-full overflow-x-auto">
          <Table className="min-w-[800px]">
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Order Status</TableHead>
                <TableHead>Order Price</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderList && orderList.length > 0
                ? orderList.map((orderItem) => (
                    <TableRow key={orderItem?._id}>
                      <TableCell>{orderItem?._id}</TableCell>
                      <TableCell>{orderItem?.orderDate ? orderItem.orderDate.split("T")[0] : ""}</TableCell>
                      <TableCell>
                        <Badge
                          className={`py-1 px-3 text-white ${
                            orderItem?.orderStatus === "delivered"
                              ? "bg-green-500 hover:bg-green-500"
                              : orderItem?.orderStatus === "rejected"
                              ? "bg-red-600 hover:bg-red-600"
                              : orderItem?.orderStatus === "inProcess"
                              ? "bg-blue-600 hover:bg-blue-600"
                              : orderItem?.orderStatus === "inShipping"
                              ? "bg-amber-600 hover:bg-amber-600"
                              : "bg-black hover:bg-black"
                          }`}
                        >
                          {orderItem?.orderStatus
                            ? orderItem.orderStatus.charAt(0).toUpperCase() + orderItem.orderStatus.slice(1)
                            : "Pending"}
                        </Badge>
                      </TableCell>
                      <TableCell>${orderItem?.totalAmount}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleFetchOrderDetails(orderItem?._id)}
                            className="cursor-pointer"
                          >
                            View Details
                          </Button>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => handleDeleteOrder(orderItem?._id)}
                            className="cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <Dialog
        open={openDetailsDialog}
        onOpenChange={(isOpen) => {
          setOpenDetailsDialog(isOpen);
          if (!isOpen) {
            setTimeout(() => {
              dispatch(resetOrderDetails());
            }, 250);
          }
        }}
      >
        <AdminOrderDetailsView orderDetails={orderDetails} />
      </Dialog>
    </Card>
  );
}

export default AdminOrdersView;