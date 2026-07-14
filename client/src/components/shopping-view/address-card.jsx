import { CheckCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";

function AddressCard({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
  selectedId,
}) {
  const isSelected = selectedId?._id === addressInfo?._id;

  return (
    <Card
      onClick={
        setCurrentSelectedAddress
          ? () => setCurrentSelectedAddress(
              selectedId?._id === addressInfo?._id ? null : addressInfo
            )
          : null
      }
      className={`relative cursor-pointer transition-all duration-200 ${
        isSelected
          ? "ring-2 ring-primary shadow-md bg-primary/5"
          : "border-gray-200 hover:shadow-sm hover:border-gray-300"
      }`}
    >
      {isSelected && (
        <CheckCircle className="absolute top-2 right-2 w-5 h-5 text-primary" />
      )}
      <CardContent className="grid p-4 gap-4">
        <Label>Address: {addressInfo?.address}</Label>
        <Label>City: {addressInfo?.city}</Label>
        <Label>pincode: {addressInfo?.pincode}</Label>
        <Label>Phone: {addressInfo?.phone}</Label>
        <Label>Notes: {addressInfo?.notes}</Label>
      </CardContent>
      <CardFooter className="p-3 flex justify-between">
        <Button onClick={() => handleEditAddress(addressInfo)} className="cursor-pointer">Edit</Button>
        <Button onClick={() => handleDeleteAddress(addressInfo)} className="cursor-pointer">Delete</Button>
      </CardFooter>
    </Card>
  );
}

export default AddressCard;