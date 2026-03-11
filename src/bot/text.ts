/**
 * Telegram 文本工具：
 * - 处理单条消息长度上限（4096）；
 * - 优先在换行处分片，减少阅读割裂。
 */

const TG_TEXT_LIMIT = 4096;
const DEF_CHUNK_LEN = 3900;

function normalizeChunkLen(maxLen?: number): number {
  if (!Number.isFinite(maxLen)) {
    return DEF_CHUNK_LEN;
  }

  const len = Math.floor(maxLen as number);
  if (len < 200) {
    return 200;
  }

  if (len > TG_TEXT_LIMIT) {
    return TG_TEXT_LIMIT;
  }

  return len;
}

function splitTelegramText(text: string, maxLen?: number): string[] {
  const lim = normalizeChunkLen(maxLen);
  if (text.length <= lim) {
    return [text];
  }

  const out: string[] = [];
  let start = 0;

  while (start < text.length) {
    let end = Math.min(start + lim, text.length);

    if (end < text.length) {
      const cut = text.lastIndexOf("\n", end - 1);
      // 至少保留一半窗口，避免被非常密集换行切得太碎。
      if (cut >= start + Math.floor(lim / 2)) {
        end = cut + 1;
      }
    }

    if (end <= start) {
      end = Math.min(start + lim, text.length);
    }

    out.push(text.slice(start, end));
    start = end;
  }

  return out;
}

export { TG_TEXT_LIMIT, normalizeChunkLen, splitTelegramText };