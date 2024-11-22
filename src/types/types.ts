export interface ComponentData {
  type: string;
  id: string;
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
