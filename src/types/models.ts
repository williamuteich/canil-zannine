export interface InstaEmbed {
  id: string;
  title: string;
  link: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
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
