import { getBlog } from "@/actions/blogs-actions";
import { getValidImageUrl } from "@/utils/view-blog";

export const generateMetadata = async ({
  params,
}: {
  params: { blogSlug: string };
}) => {
  const blogSlug = params.blogSlug;
  const blog = await getBlog(blogSlug);
  const postImage = getValidImageUrl(blog.data?.openGraph);
  const faviconUrl = getValidImageUrl(blog.data?.favicon); // Get favicon URL

  return {
    title: blog.data?.name,
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
