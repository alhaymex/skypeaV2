export const getValidImageUrl = (
  imageUrl: string | null | undefined
): string => {
  const fallbackImage =
    "https://image.alhaymex.com/placeholder?width=1200&height=630";
  if (!imageUrl || !imageUrl.startsWith("http")) {
    return fallbackImage;
  }
  return imageUrl;
};

export const isIcoFile = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, { method: "HEAD" });
    const contentType = response.headers.get("content-type");

    return (
      contentType?.includes("icon") || contentType?.includes("ico") || false
    );
  } catch (error) {
    console.error("Error checking file type:", error);
    return false;
  }
};
