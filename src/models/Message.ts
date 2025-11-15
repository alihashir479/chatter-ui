import type { AbstractModel } from "./abstractModel";
import type { User } from "./User";

export interface Message extends AbstractModel {
  content: string
  chatId: number
  createdAt: Date
  user: User
}