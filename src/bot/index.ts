/**
 * Telegram 适配层对外导出。
 */

export { typesetForTelegram, createTelegramHandler } from "./service";
export { TG_TEXT_LIMIT, normalizeChunkLen, splitTelegramText } from "./text";
export { createLruTtlStore, createTelegramChatCfgStore, chatKey } from "./store";

export type {
  BotMode,
  TelegramMeta,
  TelegramTypesetReq,
  TelegramTypesetRes,
  TelegramTypesetOk,
  TelegramTypesetErr,
  TelegramSendFn,
  TelegramHandlerOpt,
} from "./types";
export type { KvStore, LruTtlStoreOpt, TelegramChatCfg } from "./store";