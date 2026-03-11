/**
 * Telegram 适配层对外导出。
 */

export { typesetForTelegram, createTelegramHandler } from "./service";
export type {
  BotMode,
  TelegramMeta,
  TelegramTypesetReq,
  TelegramTypesetRes,
  TelegramTypesetOk,
  TelegramTypesetErr,
} from "./types";