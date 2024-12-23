export type TitleType = "text" | "image";
export type LayoutType = "default" | "centered" | "split";
export type NavLink = {
  id: string;
  text: string;
  href: string;
  target: "_self" | "_blank";
  variant: "default" | "primary" | "secondary";
};

export type NavbarState = {
  titleType: TitleType;
  title: string;
  logoUrl: string;
  links: NavLink[];
  layout: LayoutType;
  backgroundColor: string;
  textColor: string;
};

export type HeroState = {
  title: string;
  subtitle: string;
  backgroundImage: string;
  ctaText: string;
  ctaLink: string;
};

export type GridItem = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  author: string;
  date: string;
  tags: string[];
  rating: number;
  role: string;
};

export type GridTemplate = "blog" | "testimonial" | "feature";

export type GridState = {
  items: GridItem[];
  columns: number;
  template: GridTemplate;
  isDynamic: boolean;
};

export type FormField = {
  id: string;
  label: string;
  type: "text" | "email" | "textarea" | "checkbox";
  placeholder?: string;
  required: boolean;
};

export type FormState = {
  title: string;
  description: string;
  fields: FormField[];
  submitButtonText: string;
  textColor: string;
  isNewsletter: boolean;
  buttonTextColor?: string;
  buttonBackgroundColor?: string;
  buttonBorderRadius?: string;
};

export type FooterLink = {
  text: string;
  url: string;
};

type FooterColumn = {
  title: string;
  links: FooterLink[];
};

export type FooterDesign = "simple" | "multicolumn" | "newsletter";

export type FooterState = {
  columns: FooterColumn[];
  backgroundColor: string;
  textColor: string;
  showNewsletter: boolean;
  design: FooterDesign;
  companyName: string;
};

export type PageState = {
  backgroundColor: string;
  fontFamily: string;
};

type CarouselImage = {
  id: string;
  src: string;
  alt: string;
};

export type CarouselState = {
  images: CarouselImage[];
  autoplay: boolean;
  interval: number;
  showArrows: boolean;
  showDots: boolean;
};
