export interface Film {
  id: number;
  name: string;
}

export interface SubCategory {
  id: number | null;
  name: string;
  filmIds: number[];
  isNew?: boolean;
  deleted?: boolean;
}

export interface Category {
  id: number | null;
  name: string;
  subCategories: SubCategory[];
  updated?: boolean;
  deleted?: boolean;
  isNew?: boolean;
}

export interface InitialData {
  films: Film[];
  categories: Category[];
}
