export function getValidImageUrl(imageUrl: string | null | undefined): string {
  const fallbackImage =
    "https://image.alhaymex.com/placeholder?width=1200&height=630";
  if (!imageUrl || !imageUrl.startsWith("http")) {
    return fallbackImage;
  }
  return imageUrl;
}
