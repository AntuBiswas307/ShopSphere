import { Button } from "@/components/ui/button";
import bannerOne from "../../assets/banner-1.jpg";
import bannerTwo from "../../assets/banner-2.jpg";
import bannerThree from "../../assets/banner-3.jpg";
import bannerFour from "../../assets/banner-4.jpg";
import {
  Airplay,
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
  Heater,
  Images,
  Mars,
  Venus,
  SportShoe,
  UmbrellaIcon,
  WashingMachine,
  WatchIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { toast } from "sonner";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { getFeatureImages } from "@/store/common-slice";

function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails } = useSelector((state) => state.shopProducts);
  const { featureImageList } = useSelector((state) => state.commonFeature);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = { [section]: [getCurrentItem.id] };
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shopping/listing`);
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId) {
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast.success("Product is added to cart");
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featureImageList]);

  function handlePrevSlide() {
    setCurrentSlide((prev) =>
      prev === 0 ? featureImageList.length - 1 : prev - 1
    );
  }

  function handleNextSlide() {
    setCurrentSlide((prev) =>
      prev === featureImageList.length - 1 ? 0 : prev + 1
    );
  }

  useEffect(() => {
    dispatch(fetchAllFilteredProducts({ filterParams: {}, sortParams: "price-lowtohigh" }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden group">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((slide, index) => (
              <img
                src={slide?.image}
                key={index}
                className={`${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
              />
            ))
          : null}
        {featureImageList.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full cursor-pointer"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full cursor-pointer"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </Button>
          </>
        )}
      </div>

      <section className="py-12 px-6 lg:px-20">
        <div className="flex flex-col items-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Shop by Category</h2>
          <p className="text-muted-foreground mt-2">
            Browse our curated categories
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {[
            { id: "men", label: "Men", icon: Mars },
            { id: "women", label: "Women", icon: Venus },
            { id: "kids", label: "Kids", icon: BabyIcon },
            { id: "accessories", label: "Accessories", icon: WatchIcon },
            { id: "footwear", label: "Footwear", icon: SportShoe },
          ].map(({ id, label, icon: Icon }) => (
            <Card
              key={id}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleNavigateToListingPage({ id }, "category")}
            >
              <CardContent className="flex flex-col items-center justify-center p-6">
                <Icon className="w-12 h-12 mb-4 text-primary" />
                <span className="font-semibold text-lg">{label}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="py-12 px-6 lg:px-20 bg-gray-50">
        <div className="flex flex-col items-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Featured Products</h2>
          <p className="text-muted-foreground mt-2">
            Check out our latest products
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productList && productList.length > 0
            ? productList.map((productItem) => (
                <ShoppingProductTile
                  key={productItem?._id || productItem?.id}
                  handleGetProductDetails={handleGetProductDetails}
                  product={productItem}
                  handleAddtoCart={handleAddtoCart}
                />
              ))
            : null}
        </div>
      </section>

      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingHome;