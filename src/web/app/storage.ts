/**
 * 本地存储层：
 * - 持久化排版配置、当前模式、Markdown 预览开关；
 * - 在 localStorage 不可用时静默降级。
 */

import { defaultPTS } from "../../core/models/default-pure-setting";
import type { Option } from "../../core/models/option";
import type { ConfigProfile, Mode } from "./types";

const CFG_KEY = "pure-text-config";
const MODE_KEY = "typeset-mode";
const PREVIEW_KEY = "markdown-preview-enabled";
const PROFILE_KEY = "typeset-config-profiles";

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

function loadProfiles(): ConfigProfile[] {
  const raw = getItem(PROFILE_KEY);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.map(normalizeProfile).filter((item): item is ConfigProfile => item !== null);
  } catch {
    return [];
  }
}

function saveProfiles(profiles: ReadonlyArray<ConfigProfile>) {
  setItem(PROFILE_KEY, JSON.stringify(profiles));
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

function normalizeProfile(raw: unknown): ConfigProfile | null {
  if (!raw || typeof raw !== "object") {
    return null;
  }

  const data = raw as Partial<ConfigProfile>;
  const id = typeof data.id === "string" && data.id.trim().length > 0 ? data.id : null;
  const name = typeof data.name === "string" && data.name.trim().length > 0 ? data.name.trim() : null;
  if (!id || !name) {
    return null;
  }

  return {
    id,
    name,
    cfg: {
      ...defaultPTS,
      ...(isObject(data.cfg) ? (data.cfg as Partial<Option>) : {}),
    },
    mode: data.mode === "markdown" ? "markdown" : "plain",
    preview: data.preview === true,
    updatedAt: Number.isFinite(data.updatedAt) ? Number(data.updatedAt) : Date.now(),
  };
}

function isObject(val: unknown): val is Record<string, unknown> {
  return val !== null && typeof val === "object";
}

export {
  loadCfg,
  saveCfg,
  loadMode,
  saveMode,
  loadPreview,
  savePreview,
  loadProfiles,
  saveProfiles,
};
