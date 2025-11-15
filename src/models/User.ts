import type { AbstractModel } from "./abstractModel";

export interface User extends AbstractModel {
  username: string
  email: string
  imageUrl: string
}