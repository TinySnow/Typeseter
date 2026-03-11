/**
 * Telegram 适配层类型定义（不依赖具体框架）。
 *
 * 目标：
 * - 让 bot 层只处理消息输入输出；
 * - 排版行为由 core 层统一提供。
 */

import type { Option } from "../core/models/option";

type BotMode = "plain" | "markdown";

type TelegramMeta = {
  chatId?: string | number;
  userId?: string | number;
  messageId?: string | number;
};

type TelegramTypesetReq = {
  text: string;
  mode?: BotMode;
  preview?: boolean;
  opt?: Partial<Option>;
  meta?: TelegramMeta;
};

type TelegramTypesetOk = {
  ok: true;
  output: string;
  usedMode: BotMode;
  usedOpt: Option;
  meta?: TelegramMeta;
};

type TelegramTypesetErr = {
  ok: false;
  error: string;
  usedMode: BotMode;
  meta?: TelegramMeta;
};

type TelegramTypesetRes = TelegramTypesetOk | TelegramTypesetErr;

/** Telegram 文本发送函数签名。 */
type TelegramSendFn = (
  meta: TelegramMeta | undefined,
  text: string
) => Promise<unknown> | unknown;

type TelegramHandlerOpt = {
  /** 长文本是否自动拆分发送。默认 true。 */
  splitLongText?: boolean;
  /** 单条消息最大长度（建议小于 4096，默认 3900）。 */
  maxChunkLen?: number;
};

export type {
  BotMode,
  TelegramMeta,
  TelegramTypesetReq,
  TelegramTypesetRes,
  TelegramTypesetOk,
  TelegramTypesetErr,
  TelegramSendFn,
  TelegramHandlerOpt,
};