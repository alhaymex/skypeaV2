"use client";
import { UploadButton } from "@uploadthing/react";
import React from "react";
import "@uploadthing/react/styles.css";

const page = () => {
  return (
    <div>
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={() => {}}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
    </div>
  );
};

export default page;
