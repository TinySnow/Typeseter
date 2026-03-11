# Telegram 对接草案

本项目已在 `src/bot` 预留无框架绑定的接口层，可在独立 Bot 仓库复用。

## 推荐接法

1. 收到 Telegram 文本消息后，构造 `TelegramTypesetReq`。
2. 通过 `typesetForTelegram` 获取排版结果。
3. 发送前使用 `splitTelegramText` 做分片（或直接用 `createTelegramHandler`）。
4. 如果需要保存会话配置，使用 `createTelegramChatCfgStore`（LRU + TTL）。

## 示例（伪代码）

```ts
import { createTelegramHandler, chatKey, createTelegramChatCfgStore } from "./src/bot";

const store = createTelegramChatCfgStore({ maxEntries: 5000, ttlMs: 30 * 24 * 3600 * 1000 });

const handle = createTelegramHandler(async (meta, text) => {
  await botApi.sendMessage(meta?.chatId, text);
});

async function onMessage(ctx: Ctx) {
  const key = chatKey({ chatId: ctx.chat.id });
  const cfg = key ? store.get(key) : undefined;

  const res = await handle({
    text: ctx.message.text,
    mode: cfg?.mode ?? "plain",
    preview: cfg?.preview ?? false,
    opt: cfg?.opt,
    meta: {
      chatId: ctx.chat.id,
      userId: ctx.from?.id,
      messageId: ctx.message.message_id,
    },
  });

  if (key) {
    store.set(key, {
      mode: res.usedMode,
      preview: false,
      opt: res.ok ? res.usedOpt : cfg?.opt,
      updatedAt: Date.now(),
    });
  }
}
```