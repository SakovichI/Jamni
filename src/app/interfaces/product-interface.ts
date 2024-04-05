export interface IProduct {
  id?: number;
  loadAdditionalImages?: string[];
  additionalImages: any;
  image?: string;
  coverImage: string;
  name: string;
  price?: number;
  categoryId?: number;
  availableColors?: [];
  enabled?: boolean;
  descriptions: TDescProduct[];
  specifications: IProductSpec[];
  deleteImageNames?: string[];
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
  values: TSpecValue[];
}

export type TDescProduct = {
  name: string;
  descriptionHtml: string;
};
export type TDetailProduct = {
  specValue?: TSpecValue[];
  specValueIds: number[];
  price: number;
};

export type TSpecValue = {
  id: number;
  specId: number;
  value: string;
  image: string;
  enabled?: boolean;
};

export interface IFillProduct {
  specValue?: TSpecValue[];
  itemId: number;
  specValueId: number[];
  detailed: TDetailProduct[];
  description: TDescProduct[];
}
