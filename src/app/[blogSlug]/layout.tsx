import { getBlog } from "@/actions/blogs-actions";
import { getValidImageUrl } from "@/utils/utils";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ blogSlug: string }>;
}) => {
  const ogTitle = "toonion";
  const title = ogTitle[0].toUpperCase() + ogTitle.slice(1);

  const { blogSlug } = await params;
  const blog = await getBlog(blogSlug);
  const postImage = getValidImageUrl(blog.data?.openGraph);
  const faviconUrl = getValidImageUrl(blog.data?.favicon);

  return {
    title: title,
    description: blog.data?.description,
    icons: {
      icon: faviconUrl, // Add favicon
      shortcut: faviconUrl, // For legacy browsers
      apple: faviconUrl, // For iOS devices
    },
    openGraph: {
      title: blog.data?.name,
      description: blog.data?.description,
      type: "article",
      publishedTime: blog.data?.createdAt?.toISOString(),
      modifiedTime: blog.data?.updatedAt?.toISOString(),
      url: `https://${blogSlug}.skypea.net`,
      images: [
        {
          url: postImage,
          width: 1200,
          height: 630,
          alt: blog.data?.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.data?.name,
      description: blog.data?.description || "A blog post on Skypea",
      images: [postImage],
    },
    alternates: {
      canonical: `https://${blogSlug}.skypea.net`,
    },
  };
};

const layout = ({ children }: { children: React.ReactNode }) => {
  return children;
};

export default layout;
