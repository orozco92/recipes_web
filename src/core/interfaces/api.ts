import { Roles } from "../enums";
import { MealType, RecipeDifficulty, WithAll } from "../interfaces";

export interface PagedRequest {
  page: number;
  pageSize: number;
}

export interface SortedRequest {
  sort: [string, string][];
}

export interface SerchRequest {
  search: string;
}

export type PagedAndSortedRequest = PagedRequest & Partial<SortedRequest>;

export type SearcheablePagedAndSortedRequest = Partial<SerchRequest> &
  PagedAndSortedRequest;

export interface RecipeListRequest extends SearcheablePagedAndSortedRequest {
  mealType: MealType | WithAll;
  difficulty: RecipeDifficulty | WithAll;
}

export interface UserListRequest extends SearcheablePagedAndSortedRequest {
  roles?: Roles[] | Roles;
}

export interface AuthData {
  accessToken: string;
}
