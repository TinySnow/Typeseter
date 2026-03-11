/**
 * Telegram 适配层服务：
 * - 只负责请求归一化、调用 core 排版、返回统一结果；
 * - 不绑定 grammy 或任何传输层，便于后续迁移到 bot/CLI/可执行文件。
 */

import { defaultPTS } from "../core/models/default-pure-setting";
import type { Option } from "../core/models/option";
import { typeset } from "../core/typeset";
import { typesetMarkdown } from "../core/markdown-typeset";
import { normalizeChunkLen, splitTelegramText } from "./text";
import type {
  BotMode,
  TelegramHandlerOpt,
  TelegramSendFn,
  TelegramTypesetReq,
  TelegramTypesetRes,
} from "./types";

function typesetForTelegram(req: TelegramTypesetReq): TelegramTypesetRes {
  const mode = normalizeMode(req.mode);
  const input = req.text.trim();

  if (!input) {
    return {
      ok: false,
      error: "输入为空",
      usedMode: mode,
      meta: req.meta,
    };
  }

  try {
    const opt = normalizeOpt(req.opt);
    const output =
      mode === "markdown"
        ? typesetMarkdown(input, opt, req.preview === true)
        : typeset(input, opt);

    return {
      ok: true,
      output,
      usedMode: mode,
      usedOpt: opt,
      meta: req.meta,
    };
  } catch (error) {
    return {
      ok: false,
      error: toErrorMsg(error),
      usedMode: mode,
      meta: req.meta,
    };
  }
}

/**
 * 预留给 grammy/telegraf 等框架的薄适配器。
 * 调用方只需要提供“如何发送消息”，这里统一封装排版与错误文案。
 */
function createTelegramHandler(send: TelegramSendFn, opt?: TelegramHandlerOpt) {
  const splitLongText = opt?.splitLongText !== false;
  const chunkLen = normalizeChunkLen(opt?.maxChunkLen);

  return async (req: TelegramTypesetReq): Promise<TelegramTypesetRes> => {
    const res = typesetForTelegram(req);
    const text = res.ok ? res.output : `排版失败：${res.error}`;
    const chunks = splitLongText ? splitTelegramText(text, chunkLen) : [text];

    for (const chunk of chunks) {
      await send(req.meta, chunk);
    }

    return res;
  };
}

function normalizeMode(mode?: BotMode): BotMode {
  return mode === "markdown" ? "markdown" : "plain";
}

/**
 * 归一化配置：
 * - 使用默认配置兜底；
 * - 仅做轻量校验，避免 bot 入参污染核心流程。
 */
function normalizeOpt(opt?: Partial<Option>): Option {
  const next: Option = {
    ...defaultPTS,
    ...opt,
  };

  if (!Number.isFinite(next.lineGap)) {
    next.lineGap = defaultPTS.lineGap;
  }

  if (next.lineGap < -1) {
    next.lineGap = defaultPTS.lineGap;
  }

  if (typeof next.customedLineBreaker !== "string") {
    next.customedLineBreaker = defaultPTS.customedLineBreaker;
  }

  return next;
}

function toErrorMsg(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return "unknown error";
}

export { typesetForTelegram, createTelegramHandler };