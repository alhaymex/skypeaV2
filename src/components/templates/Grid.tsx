import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface GridItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  author?: string;
  date?: string;
  tags?: string[];
  rating?: number;
  role?: string;
}

interface GridProps {
  items: GridItem[];
  columns: number;
  template: "blog" | "testimonial" | "feature";
}

export function Grid({ items, columns, template }: GridProps) {
  const gridClassName = `grid gap-4 ${
    columns === 1
      ? "grid-cols-1"
      : columns === 2
      ? "grid-cols-1 md:grid-cols-2"
      : columns === 3
      ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
  }`;

  const renderBlogCard = (item: GridItem) => (
    <Card key={item.id}>
      <CardHeader>
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
      </CardHeader>
      <CardContent>
        <CardTitle>{item.title}</CardTitle>
        <CardDescription>{item.description}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex items-center">
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage
              src={`https://api.dicebear.com/6.x/initials/svg?seed=${item.author}`}
            />
            <AvatarFallback>{item.author?.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">{item.author}</span>
        </div>
        <span className="text-sm text-muted-foreground">{item.date}</span>
      </CardFooter>
    </Card>
  );

  const renderTestimonialCard = (item: GridItem) => (
    <Card key={item.id}>
      <CardContent className="pt-6">
        <div className="flex items-center mb-4">
          <Avatar className="h-10 w-10 mr-4">
            <AvatarImage src={item.imageUrl} />
            <AvatarFallback>{item.author?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">{item.author}</CardTitle>
            <CardDescription>{item.role}</CardDescription>
          </div>
        </div>
        <p className="text-muted-foreground">{item.description}</p>
        <div className="mt-4 flex">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`h-5 w-5 ${
                i < (item.rating || 0) ? "text-yellow-400" : "text-gray-300"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const renderFeatureCard = (item: GridItem) => (
    <Card key={item.id}>
      <CardHeader>
        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mb-4">
          <img src={item.imageUrl} alt="" className="w-6 h-6" />
        </div>
        <CardTitle>{item.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{item.description}</CardDescription>
      </CardContent>
      <CardFooter>
        {item.tags &&
          item.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="mr-2">
              {tag}
            </Badge>
          ))}
      </CardFooter>
    </Card>
  );

  return (
    <div className="max-w-6xl mx-auto my-12">
      <div className={gridClassName}>
        {items.map((item) => {
          switch (template) {
            case "blog":
              return renderBlogCard(item);
            case "testimonial":
              return renderTestimonialCard(item);
            case "feature":
              return renderFeatureCard(item);
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
}
