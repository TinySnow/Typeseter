/**
 * 浏览器入口：
 * - 初始化 DOM 引用与本地配置；
 * - 绑定 UI 事件；
 * - 在纯文本/Markdown 两种模式间调度排版实现。
 */

import "./style.css";
import { defaultPTS } from "./models/default-pure-setting";
import { defs, mdOffKeys } from "./app/defs";
import { initRefs } from "./app/dom";
import { loadCfg, saveCfg, loadMode, saveMode, loadPreview, savePreview } from "./app/storage";
import { renderCks, syncCfgUi, syncModeRadios, syncModeUi, syncBrkInput } from "./app/ui";
import { supportsAdvancedRegex } from "./utils/regex-support";
import type { Mode } from "./app/types";

const refs = initRefs();
let cfg = loadCfg();
let mode: Mode = loadMode();

renderCks(defs, cfg, (key, checked) => {
  cfg[key] = checked;
  saveCfg(cfg);
});

syncCfgUi(defs, cfg, refs);
syncModeRadios(mode);
refs.mdPreview.checked = loadPreview();
syncModeUi(mode, refs, mdOffKeys);

if (!supportsAdvancedRegex()) {
  console.warn("Advanced regex is unsupported. Typeseter is running in compatibility mode.");
}

refs.modeSwitch.addEventListener("change", (event) => {
  const target = event.target as HTMLInputElement | null;
  if (!target || target.name !== "typeset-mode") {
    return;
  }

  mode = target.value === "markdown" ? "markdown" : "plain";
  saveMode(mode);
  syncModeUi(mode, refs, mdOffKeys);
});

refs.mdPreview.addEventListener("change", () => {
  savePreview(refs.mdPreview.checked);
});

refs.lineGapSel.addEventListener("change", () => {
  cfg.lineGap = Number(refs.lineGapSel.value);
  syncBrkInput(refs);
  saveCfg(cfg);
});

refs.lineBrkInput.addEventListener("input", () => {
  cfg.customedLineBreaker = refs.lineBrkInput.value;
  saveCfg(cfg);
});

refs.typesetBtn.addEventListener("click", async () => {
  const raw = refs.editor.value;
  try {
    if (mode === "plain") {
      const mod = await import("./utils/typeset");
      refs.editor.value = mod.typeset(raw, cfg);
      return;
    }

    const mod = await import("./utils/markdown-typeset");
    refs.editor.value = mod.typesetMarkdown(raw, cfg, refs.mdPreview.checked);
  } catch (error) {
    console.error(error);
    alert("排版失败，请打开控制台查看错误信息。\n这通常与浏览器或运行环境兼容性有关。");
  }
});

refs.resetBtn.addEventListener("click", () => {
  cfg = { ...defaultPTS };
  syncCfgUi(defs, cfg, refs);
  saveCfg(cfg);
});

refs.copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(refs.editor.value);
    refs.copyBtn.textContent = "已复制";
    setTimeout(() => {
      refs.copyBtn.textContent = "复制结果";
    }, 1200);
  } catch {
    refs.editor.select();
    document.execCommand("copy");
  }
});
