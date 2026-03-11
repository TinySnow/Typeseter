/**
 * Bot 侧状态存储工具：
 * - 提供有上限 + TTL 的内存存储，避免聊天会话无限增长导致内存泄漏；
 * - 与具体 Telegram 框架解耦，调用方可替换为 Redis/数据库实现。
 */

import type { Option } from "../core/models/option";
import type { BotMode, TelegramMeta } from "./types";

type LruTtlStoreOpt = {
  maxEntries?: number;
  ttlMs?: number;
  now?: () => number;
};

type StoreEntry<T> = {
  value: T;
  ts: number;
};

type KvStore<T> = {
  get: (key: string) => T | undefined;
  set: (key: string, value: T) => void;
  delete: (key: string) => void;
  clear: () => void;
  sweep: () => number;
  size: () => number;
};

type TelegramChatCfg = {
  mode?: BotMode;
  preview?: boolean;
  opt?: Partial<Option>;
  updatedAt: number;
};

const DEF_MAX = 5000;
const DEF_TTL = 30 * 24 * 60 * 60 * 1000;

function createLruTtlStore<T>(opt?: LruTtlStoreOpt): KvStore<T> {
  const maxEntries = Number.isFinite(opt?.maxEntries) ? Math.max(1, Math.floor(opt!.maxEntries!)) : DEF_MAX;
  const ttlMs = Number.isFinite(opt?.ttlMs) ? Math.max(1, Math.floor(opt!.ttlMs!)) : DEF_TTL;
  const now = opt?.now ?? Date.now;
  const map = new Map<string, StoreEntry<T>>();

  function isExpired(item: StoreEntry<T>, ts: number): boolean {
    return ts - item.ts > ttlMs;
  }

  function trimOverflow() {
    while (map.size > maxEntries) {
      const key = map.keys().next().value as string | undefined;
      if (!key) {
        break;
      }
      map.delete(key);
    }
  }

  function get(key: string): T | undefined {
    const item = map.get(key);
    if (!item) {
      return undefined;
    }

    const ts = now();
    if (isExpired(item, ts)) {
      map.delete(key);
      return undefined;
    }

    // 访问即刷新 LRU + TTL 时间戳。
    map.delete(key);
    map.set(key, { value: item.value, ts });
    return item.value;
  }

  function set(key: string, value: T): void {
    const ts = now();
    if (map.has(key)) {
      map.delete(key);
    }

    map.set(key, { value, ts });
    sweep();
  }

  function del(key: string): void {
    map.delete(key);
  }

  function clear(): void {
    map.clear();
  }

  function sweep(): number {
    const ts = now();
    let removed = 0;

    for (const [key, item] of map) {
      if (isExpired(item, ts)) {
        map.delete(key);
        removed += 1;
      }
    }

    const before = map.size;
    trimOverflow();
    return removed + (before - map.size);
  }

  function size(): number {
    return map.size;
  }

  return {
    get,
    set,
    delete: del,
    clear,
    sweep,
    size,
  };
}

/**
 * 从 meta 生成 chat 级 key。
 * chatId 缺失时返回 null（调用方可降级为无状态模式）。
 */
function chatKey(meta?: TelegramMeta): string | null {
  if (meta?.chatId == null) {
    return null;
  }
  return `chat:${String(meta.chatId)}`;
}

function createTelegramChatCfgStore(opt?: LruTtlStoreOpt): KvStore<TelegramChatCfg> {
  return createLruTtlStore<TelegramChatCfg>(opt);
}

export type { KvStore, LruTtlStoreOpt, TelegramChatCfg };
export { createLruTtlStore, createTelegramChatCfgStore, chatKey };