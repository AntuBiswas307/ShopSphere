import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import { addFeatureImage, getFeatureImages, deleteFeatureImage } from "@/store/common-slice";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminDashboard() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.commonFeature);

  console.log(uploadedImageUrl, "uploadedImageUrl");

  function handleDeleteFeatureImage(id) {
    dispatch(deleteFeatureImage(id));
  }

  function handleUploadFeatureImage() {
    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedImageUrl("");
      }
    });
  }

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  console.log(featureImageList, "featureImageList");

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-lg mx-auto">
        <ProductImageUpload
          imageFile={imageFile}
          setImageFile={setImageFile}
          uploadedImageUrl={uploadedImageUrl}
          setUploadedImageUrl={setUploadedImageUrl}
          setImageLoadingState={setImageLoadingState}
          imageLoadingState={imageLoadingState}
          isCustomStyling={true}
        />
        <Button onClick={handleUploadFeatureImage} disabled={!uploadedImageUrl} className="mt-5 w-full cursor-pointer">
          Upload
        </Button>
      </div>
      <div className="flex flex-col gap-4 mt-5 w-full max-w-4xl mx-auto">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((featureImgItem) => (
              <div className="relative group">
                <img
                  src={featureImgItem.image}
                  className="w-full h-[300px] object-cover rounded-t-lg"
                />
                <Button
                  onClick={() => handleDeleteFeatureImage(featureImgItem._id)}
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

export default AdminDashboard;