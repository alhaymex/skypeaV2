export interface ComponentData {
  type: string;
  id: string;
  dbId?: string;
  data: any;
}

export interface NavLink {
  id: string;
  text: string;
  href: string;
  target: string;
  variant: "default" | "primary" | "secondary";
  dropdownItems?: NavLink[];
}

export interface GridItem {
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

export interface FormField {
  id: string;
  label: string;
  type: "text" | "email" | "textarea" | "checkbox";
  placeholder?: string;
  required?: boolean;
}

export interface UserMenuProps {
  name: string;
  email: string;
  avatar: string;
}

export interface Blog {
  id: string;
  userId: string;
  name: string | null;
  description: string | null;
  slug: string;
  icon: string | null;
  isLive: boolean;
  isPinned: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export interface FooterColumn {
  title: string;
  links: Array<{
    text: string;
    url: string;
  }>;
}
