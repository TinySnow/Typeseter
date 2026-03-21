/**
 * Web 层启动器：
 * - 初始化 DOM 引用与本地配置；
 * - 绑定 UI 事件；
 * - 调用 core 层排版能力。
 */

import "./style.css";
import { defaultSettings } from "../core/models/default-setting";
import { defs, mdOffKeys } from "./app/defs";
import { initRefs } from "./app/dom";
import {
  loadCfg,
  saveCfg,
  loadMode,
  saveMode,
  loadPreview,
  savePreview,
  loadProfiles,
  saveProfiles,
} from "./app/storage";
import { renderCks, syncCfgUi, syncModeRadios, syncModeUi, syncBrkInput, syncProfileUi } from "./app/ui";
import { supportsAdvancedRegex } from "../core/regex-support";
import type { ConfigProfile, Mode } from "./app/types";

function startWebApp() {
  const refs = initRefs();
  let cfg = loadCfg();
  let mode: Mode = loadMode();
  let profiles = loadProfiles();
  let profileId: string | null = profiles[0]?.id ?? null;

  lockSummaryToggle(refs.modeSwitch);
  lockSummaryToggle(refs.profileToolbar);

  renderCks(defs, cfg, (key, checked) => {
    cfg[key] = checked;
    saveCfg(cfg);
  });

  syncCfgUi(defs, cfg, refs);
  syncModeRadios(mode);
  refs.mdPreview.checked = loadPreview();
  syncModeUi(mode, refs, mdOffKeys);
  refreshProfileUi();

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

  refs.profileSaveBtn.addEventListener("click", () => {
    const suggested = suggestProfileName(mode, profiles);
    const nameRaw = window.prompt("请输入配置文件名称", suggested);
    if (nameRaw == null) {
      return;
    }

    const name = nameRaw.trim();
    if (!name) {
      alert("配置文件名称不能为空。");
      return;
    }

    const sameName = profiles.find((p) => p.name === name);
    if (sameName) {
      const overwrite = window.confirm(`已存在同名配置「${name}」，是否覆盖？`);
      if (!overwrite) {
        return;
      }

      saveOrUpdateProfile(name, sameName.id);
      alert(`已覆盖配置「${name}」。`);
      return;
    }

    saveOrUpdateProfile(name);
    alert(`已保存配置「${name}」。`);
  });

  refs.profileSelect.addEventListener("change", () => {
    profileId = refs.profileSelect.value || null;
    refreshProfileUi();
  });

  refs.profileApplyBtn.addEventListener("click", () => {
    const profile = findSelectedProfile(profiles, refs.profileSelect.value || profileId);
    if (!profile) {
      return;
    }

    cfg = { ...defaultSettings, ...profile.cfg };
    saveCfg(cfg);
    syncCfgUi(defs, cfg, refs);

    mode = profile.mode;
    saveMode(mode);
    syncModeRadios(mode);
    syncModeUi(mode, refs, mdOffKeys);

    refs.mdPreview.checked = profile.preview;
    savePreview(profile.preview);

    profileId = profile.id;
    refreshProfileUi();
  });

  refs.profileOverwriteBtn.addEventListener("click", () => {
    const profile = findSelectedProfile(profiles, refs.profileSelect.value || profileId);
    if (!profile) {
      return;
    }

    saveOrUpdateProfile(profile.name, profile.id);
    alert(`已覆盖配置「${profile.name}」。`);
  });

  refs.profileDeleteBtn.addEventListener("click", () => {
    const profile = findSelectedProfile(profiles, refs.profileSelect.value || profileId);
    if (!profile) {
      return;
    }

    const ok = window.confirm(`确定删除配置「${profile.name}」吗？`);
    if (!ok) {
      return;
    }

    profiles = profiles.filter((item) => item.id !== profile.id);
    saveProfiles(profiles);
    profileId = profiles[0]?.id ?? null;
    refreshProfileUi();
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
        const mod = await import("../core/typeset");
        refs.editor.value = mod.typeset(raw, cfg);
        return;
      }

      const mod = await import("../core/markdown-typeset");
      refs.editor.value = mod.typesetMarkdown(raw, cfg, refs.mdPreview.checked);
    } catch (error) {
      console.error(error);
      alert("排版失败，请打开控制台查看错误信息。\n这通常与浏览器或运行环境兼容性有关。");
    }
  });

  refs.resetBtn.addEventListener("click", () => {
    cfg = { ...defaultSettings };
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

  function refreshProfileUi() {
    if (!profiles.some((p) => p.id === profileId)) {
      profileId = profiles[0]?.id ?? null;
    }
    syncProfileUi(profiles, profileId, refs);
  }

  function saveOrUpdateProfile(name: string, forcedId?: string) {
    const id = forcedId ?? createProfileId();
    const next: ConfigProfile = {
      id,
      name,
      cfg: { ...cfg },
      mode,
      preview: refs.mdPreview.checked,
      updatedAt: Date.now(),
    };

    const idx = profiles.findIndex((item) => item.id === id);
    if (idx >= 0) {
      profiles[idx] = next;
    } else {
      profiles.unshift(next);
    }

    if (idx > 0) {
      profiles.splice(idx, 1);
      profiles.unshift(next);
    }

    saveProfiles(profiles);
    profileId = id;
    refreshProfileUi();
  }
}

function findSelectedProfile(
  profiles: ReadonlyArray<ConfigProfile>,
  id: string | null | undefined
): ConfigProfile | null {
  if (!id) {
    return null;
  }
  return profiles.find((p) => p.id === id) ?? null;
}

function suggestProfileName(mode: Mode, profiles: ReadonlyArray<ConfigProfile>): string {
  const base = mode === "markdown" ? "md 配置" : "纯文本配置";
  if (!profiles.some((p) => p.name === base)) {
    return base;
  }

  let i = 2;
  while (profiles.some((p) => p.name === `${base} ${i}`)) {
    i += 1;
  }
  return `${base} ${i}`;
}

function createProfileId(): string {
  return `cfg_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

function lockSummaryToggle(node: HTMLElement) {
  const stop = (event: Event) => {
    event.stopPropagation();
  };
  node.addEventListener("click", stop);
  node.addEventListener("keydown", stop);
}

export { startWebApp };
