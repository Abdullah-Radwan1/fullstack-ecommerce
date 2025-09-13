"use client";
import { Input } from "@/components/ui/input";
import { useImageStore } from "@/zustand/store";
import {
  CldUploadButton,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import Image from "next/image";
import React from "react";

export default function CloudinaryUpload() {
  const { setImageUrl } = useImageStore();
  const { imageUrl } = useImageStore();
  const { setImageName, imageName } = useImageStore();
  const handleImageChange = (result: CloudinaryUploadWidgetResults) => {
    if (
      result.event === "success" &&
      typeof result.info !== "string" &&
      result.info !== undefined
    ) {
      const imageUrl = result.info.secure_url; // This is the URL of the uploaded image
      setImageName(result.info.display_name || "");

      setImageUrl(imageUrl);
    }
  };

  return (
    <CldUploadButton
      className=" hover:opacity-75 transition w-full"
      uploadPreset="products" // Replace with your Cloudinary upload preset
      onSuccess={handleImageChange} // Use onSuccess instead of onUpload
    >
      <Input
        onChange={(e) => setImageName(e.target.value)}
        value={imageName}
        required
        className="text-center cursor-pointer mb-4"
        placeholder={imageName || "Upload Image"}
      ></Input>
      {imageUrl && (
        <Image
          className="mx-auto my-2"
          src={imageUrl}
          alt={imageName || ""}
          width={200}
          height={200}
        />
      )}
    </CldUploadButton>
  );
}
