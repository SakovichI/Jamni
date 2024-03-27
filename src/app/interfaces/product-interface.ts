export interface IProduct {
  id: number;
  loadAdditionalImages?: string[];
  image?: string;
  coverImage?: string | null;
  name: string;
  price?: number;
  categoryId?: number;
  availableColors?: [];
  enabled?: boolean;
}

export interface ICategory {
  id: number;
  name: string;
  image: string;
  items: IProduct[];
  childCategoryIds: number[] | ICategory[] | any[];
  parentCategoryId?: number;
  childCategories?: ICategory[];
}

export interface IProductSpec {
  id: number;
  name: string;
  valueType: string;
  selectType: string;
  filtered: boolean;
  values: [
    {
      id: number;
      specId: number;
      value: string;
      image: string;
    }
  ];
}

export interface IFillProduct {
  itemId: number;
  specValueId: number[];
  detailed: TDetailProduct[];
  description: TDescProduct[];
}

export type TDescProduct = {
  name: string;
  descriptionHtml: string;
};
export type TDetailProduct = {
  specValueIds: number[];
  price: number;
};
