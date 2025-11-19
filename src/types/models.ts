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
  title: string
  url: string
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