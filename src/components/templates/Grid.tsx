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
  const gridClassName = `grid gap-8 ${
    columns === 1
      ? "grid-cols-1"
      : columns === 2
      ? "grid-cols-1 md:grid-cols-2"
      : columns === 3
      ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
  }`;

  const renderBlogCard = (item: GridItem) => (
    <Card
      key={item.id}
      className="group hover:shadow-xl transition-all duration-300 bg-gradient-to-b from-amber-50 to-white border-amber-200 overflow-hidden"
      style={{
        clipPath:
          "polygon(5% 0%, 95% 0%, 100% 5%, 100% 95%, 95% 100%, 5% 100%, 0% 95%, 0% 5%)",
      }}
    >
      <CardHeader className="p-0">
        <div className="relative">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-amber-900/20 to-transparent" />
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <CardTitle className="text-amber-900">{item.title}</CardTitle>
        <CardDescription className="text-amber-700 mt-2">
          {item.description}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between bg-amber-50/50">
        <div className="flex items-center">
          <Avatar className="h-8 w-8 mr-2 ring-2 ring-amber-200">
            <AvatarImage
              src={`https://api.dicebear.com/6.x/initials/svg?seed=${item.author}`}
            />
            <AvatarFallback className="bg-amber-200 text-amber-900">
              {item.author?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm text-amber-700">{item.author}</span>
        </div>
        <span className="text-sm text-amber-600">{item.date}</span>
      </CardFooter>
    </Card>
  );

  const renderTestimonialCard = (item: GridItem) => (
    <Card
      key={item.id}
      className="group hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-amber-50 to-white border-amber-200"
      style={{
        clipPath:
          "polygon(5% 0%, 95% 0%, 100% 5%, 100% 95%, 95% 100%, 5% 100%, 0% 95%, 0% 5%)",
      }}
    >
      <CardContent className="pt-6">
        <div className="flex items-center mb-4">
          <Avatar className="h-12 w-12 mr-4 ring-2 ring-amber-200">
            <AvatarImage src={item.imageUrl} />
            <AvatarFallback className="bg-amber-200 text-amber-900">
              {item.author?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg text-amber-900">
              {item.author}
            </CardTitle>
            <CardDescription className="text-amber-700">
              {item.role}
            </CardDescription>
          </div>
        </div>
        <p className="text-amber-700 italic">
          &ldquo;{item.description}&rdquo;
        </p>
        <div className="mt-4 flex">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`h-5 w-5 ${
                i < (item.rating || 0) ? "text-amber-400" : "text-amber-200"
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
    <Card
      key={item.id}
      className="group hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-amber-50 to-white border-amber-200"
      style={{
        clipPath:
          "polygon(5% 0%, 95% 0%, 100% 5%, 100% 95%, 95% 100%, 5% 100%, 0% 95%, 0% 5%)",
      }}
    >
      <CardHeader>
        <div className="w-16 h-16 rounded-full bg-amber-100 ring-4 ring-amber-200 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300">
          <img
            src={item.imageUrl}
            alt={item.title + "'s image"}
            className="w-8 h-8"
          />
        </div>
        <CardTitle className="text-amber-900">{item.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-amber-700">
          {item.description}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2">
        {item.tags &&
          item.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="bg-amber-100 text-amber-800 hover:bg-amber-200"
            >
              {tag}
            </Badge>
          ))}
      </CardFooter>
    </Card>
  );

  return (
    <div className="max-w-6xl mx-auto my-12 px-4">
      <div className="relative">
        {/* Decorative hexagon patterns */}
        <div className="absolute -top-8 -left-8 w-16 h-16 bg-amber-100 opacity-20 rotate-45" />
        <div className="absolute -bottom-8 -right-8 w-16 h-16 bg-amber-200 opacity-20 rotate-45" />

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
    </div>
  );
}

export default Grid;
