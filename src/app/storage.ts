/**
 * 本地存储层：
 * - 持久化排版配置、当前模式、Markdown 预览开关；
 * - 在 localStorage 不可用时静默降级。
 */

import { defaultPTS } from "../models/default-pure-setting";
import type { Option } from "../models/option";
import type { Mode } from "./types";

const CFG_KEY = "pure-text-config";
const MODE_KEY = "typeset-mode";
const PREVIEW_KEY = "markdown-preview-enabled";

function loadCfg(): Option {
  const raw = getItem(CFG_KEY);
  if (!raw) {
    return { ...defaultPTS };
  }

  try {
    const parsed = JSON.parse(raw) as Partial<Option>;
    return {
      ...defaultPTS,
      ...parsed,
    };
  } catch {
    return { ...defaultPTS };
  }
}

function saveCfg(cfg: Option) {
  setItem(CFG_KEY, JSON.stringify(cfg));
}

function loadMode(): Mode {
  return getItem(MODE_KEY) === "markdown" ? "markdown" : "plain";
}

function saveMode(mode: Mode) {
  setItem(MODE_KEY, mode);
}

function loadPreview(): boolean {
  return getItem(PREVIEW_KEY) === "1";
}

function savePreview(enabled: boolean) {
  setItem(PREVIEW_KEY, enabled ? "1" : "0");
}

function getItem(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function setItem(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // 忽略持久化失败（隐私模式或 file 协议限制）。
  }
}

export { loadCfg, saveCfg, loadMode, saveMode, loadPreview, savePreview };
