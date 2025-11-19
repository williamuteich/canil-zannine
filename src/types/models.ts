export interface InstaEmbed {
  id: string;
  title: string;
  link: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SocialMedia {
  id: string;
  plataform: string;
  link: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RedesSociaisTableProps {
  socialMedia: SocialMedia[];
}

export interface Product {
  id: string;
  name: string;
  breed: string;
  gender: string;
  color?: string;
  ageMonths?: number;
  weight?: number;
  vaccinated: boolean;
  dewormed: boolean;
  about: string;
  characteristics?: string;
  careInstructions?: string;
  history?: string;
  status: boolean;
  primaryImage: string;
  createdAt: string;
  updatedAt: string;
}

export type tableRow = {
  id: string
  image?: string
  title: string
  age?: string
  weight?: string
  url?: string
  subtitle?: string
  description?: string
  price?: number
  status: boolean
}

export interface DeleteButtonProps {
  id: string
  apiUrl: string
}

export interface ShowInstaEmbedsProps {
  posts: InstaEmbed[];
  instagramUrl?: string;
}

export interface PuppyInfoPanelProps {
  name: string;
  emoji: string;
  age: string;
  breed: string;
  description: string;
  weight: string;
  price: number;
  priceOld?: number;
}

export interface Puppy {
  id: string;
  name: string;
  slug?: string;
  description: string;
  price: number;
  age?: string;
  weight?: string;
  status: string;
  primaryImage: string;
  images?: { id: string; url: string }[];
}

export type Filhote = Puppy;

export interface FilhotesTableProps {
  filhotes: Puppy[];
}

export interface InstagramTableProps {
  embeds: InstaEmbed[];
}
type FieldType = "text" | "number" | "email" | "password" | "tel" | "date" | "url" | "select"

export interface FieldConfig {
  name: string
  label: string
  type: FieldType
  required?: boolean
  placeholder?: string
  options?: { value: string; label: string }[]
}

export interface AddButtonProps {
  title: string
  description: string
  buttonLabel: string
  fields: FieldConfig[]
  apiUrl: string
}

export interface ImageGalleryProps {
  images: string[];
  name: string;
}