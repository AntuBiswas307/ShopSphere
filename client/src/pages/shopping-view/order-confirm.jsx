import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCartItems } from "@/store/shop/cart-slice";

function OrderConfirmPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  function handleContinueShopping() {
    dispatch(clearCartItems(user?.id));
    navigate("/shopping/home");
  }

  return (
    <div className="flex items-center justify-center min-h-[70vh] px-4">
      <Card className="p-10 text-center max-w-md w-full">
        <CardHeader className="p-0 mb-6">
          <CardTitle className="text-4xl font-bold text-green-600">
            Order Confirmed!
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <p className="text-muted-foreground mb-8">
            Thank you for your order. You will pay upon delivery.
          </p>
          <Button onClick={handleContinueShopping} className="w-full cursor-pointer">
            Continue Shopping
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default OrderConfirmPage;