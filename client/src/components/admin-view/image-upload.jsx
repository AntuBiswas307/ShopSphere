import { FileIcon, UploadCloudIcon, XIcon, Loader2, CheckCircle2 } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { toast } from "sonner";

function ProductImageUpload({
  imageFile,
  setImageFile,
  imageLoadingState,
  uploadedImageUrl,
  setUploadedImageUrl,
  setImageLoadingState,
  isEditMode,
  isCustomStyling = false,
}) {
  const inputRef = useRef(null);

  function handleImageFileChange(event) {
    if (isEditMode) return;
    const selectedFile = event.target.files?.[0];
    if (selectedFile) setImageFile(selectedFile);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    if (isEditMode) return;
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  }

  function handleRemoveImage() {
    if (isEditMode) return;
    setImageFile(null);
    setUploadedImageUrl("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function uploadImageToCloudinary() {
    setImageLoadingState(true);
    try {
      const data = new FormData();
      data.append("my_file", imageFile);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/admin/products/upload-image`,
        data
      );

      if (response?.data?.success) {
        setUploadedImageUrl(response.data.result.url);
        toast.success("Image uploaded successfully!");
      } else {
        toast.error("Failed to upload image. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Image upload failed. Please check backend connection.");
    } finally {
      setImageLoadingState(false);
    }
  }

  useEffect(() => {
    if (imageFile !== null) uploadImageToCloudinary();
  }, [imageFile]);

  return (
    <div className={`w-full mt-4 ${isCustomStyling ? "" : "max-w-md mx-auto"}`}>
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`${
          isEditMode ? "opacity-60 cursor-not-allowed bg-gray-50 select-none" : ""
        } border-2 border-dashed rounded-lg p-4 transition-all`}
      >
        <Input
          id="image-upload"
          type="file"
          accept="image/*"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={isEditMode || imageLoadingState}
        />
        {!imageFile ? (
          <Label
            htmlFor={isEditMode ? undefined : "image-upload"}
            className={`${
              isEditMode ? "cursor-not-allowed pointer-events-none" : "cursor-pointer"
            } flex flex-col items-center justify-center h-32 hover:bg-muted/30 rounded transition-colors`}
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span className={isEditMode ? "cursor-not-allowed" : "font-medium text-sm text-muted-foreground"}>
              Drag & drop or click to upload image
            </span>
          </Label>
        ) : imageLoadingState ? (
          <div className="flex flex-col items-center justify-center py-6 gap-2">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-sm font-semibold text-foreground">Uploading image to cloud...</p>
            <p className="text-xs text-muted-foreground">Please wait while the image is processing</p>
          </div>
        ) : (
          <div className={`flex items-center justify-between gap-3 p-2 bg-muted/40 rounded-md ${isEditMode ? "cursor-not-allowed" : ""}`}>
            <div className="flex items-center gap-3 min-w-0">
              {uploadedImageUrl ? (
                <img
                  src={uploadedImageUrl}
                  alt="Product preview"
                  className="w-12 h-12 rounded object-cover border shrink-0"
                />
              ) : (
                <FileIcon className="w-8 h-8 text-primary shrink-0" />
              )}
              <div className="min-w-0">
                <p className="text-sm font-medium truncate select-none">{imageFile.name}</p>
                <div className="flex items-center gap-1 text-xs text-green-600 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Ready to add</span>
                </div>
              </div>
            </div>
            {!isEditMode && (
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-destructive cursor-pointer shrink-0"
                onClick={handleRemoveImage}
              >
                <XIcon className="w-4 h-4" />
                <span className="sr-only">Remove File</span>
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductImageUpload;