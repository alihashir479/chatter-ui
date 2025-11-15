import type { AbstractModel } from "./abstractModel";
import type { Message } from "./Message";

export interface Chat extends AbstractModel {
  name?: string
  latestMessage?: Message
}