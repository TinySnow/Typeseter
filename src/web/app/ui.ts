/**
 * UI 渲染与状态同步：
 * - 渲染设置复选框；
 * - 同步配置、模式和段落分隔符输入框状态。
 */

import type { Option } from "../../core/models/option";
import { findSettingCheckbox, getModeRadios } from "./dom";
import type { Mode, BoolKey, ConfigProfile, SettingDef } from "./types";
import type { Refs } from "./dom";

function renderCks(defs: ReadonlyArray<SettingDef>, cfg: Option, onCheck: (key: BoolKey, checked: boolean) => void) {
  for (const def of defs) {
    const boxWrap = mustGet<HTMLDivElement>(def.containerId);
    const label = document.createElement("label");
    const ck = document.createElement("input");
    ck.type = "checkbox";
    ck.dataset.key = def.key;
    ck.checked = cfg[def.key];

    if (def.mdOnly) {
      label.dataset.mdOnly = "1";
      label.style.display = "none";
    }

    ck.addEventListener("change", () => {
      onCheck(def.key, ck.checked);
    });

    const parsed = parseInlineHint(def.label);
    const useInlineHint = def.containerId === "other-settings" && def.mdOnly && parsed !== null;
    const text = useInlineHint ? parsed.main : def.label;

    label.append(ck, document.createTextNode(text));
    if (useInlineHint) {
      const hint = document.createElement("span");
      hint.className = "inline-help";
      hint.textContent = "i";
      hint.title = parsed.hint;
      hint.setAttribute("aria-label", parsed.hint);
      hint.setAttribute("tabindex", "0");
      hint.addEventListener("click", (e) => {
        e.stopPropagation();
        showTooltip(hint, parsed.hint);
      });
      label.appendChild(hint);
    }
    boxWrap.appendChild(label);
  }
}

function syncCfgUi(defs: ReadonlyArray<SettingDef>, cfg: Option, refs: Refs) {
  for (const def of defs) {
    const ck = findSettingCheckbox(def.key);
    if (ck) {
      ck.checked = cfg[def.key];
    }
  }

  refs.lineGapSel.value = String(cfg.lineGap);
  refs.lineBrkInput.value = cfg.customedLineBreaker;
  syncBrkInput(refs);
}

function syncModeRadios(mode: Mode) {
  const radios = getModeRadios();
  for (const radio of radios) {
    radio.checked = radio.value === mode;
  }
}

function syncModeUi(mode: Mode, refs: Refs, mdOffKeys: ReadonlyArray<BoolKey>) {
  const isMd = mode === "markdown";

  for (const key of mdOffKeys) {
    const ck = findSettingCheckbox(key);
    if (ck) {
      ck.disabled = isMd;
    }
  }

  syncMdOnly(isMd);

  refs.modePreviewRow.style.display = isMd ? "flex" : "none";
  refs.previewToggle.style.display = isMd ? "inline-flex" : "none";

  if (isMd) {
    refs.lineGapSel.disabled = true;
    refs.lineBrkInput.disabled = true;
    return;
  }

  syncBrkInput(refs);
}

function syncMdOnly(enabled: boolean) {
  const nodes = document.querySelectorAll<HTMLElement>("[data-md-only=\"1\"]");
  for (const node of nodes) {
    node.style.display = enabled ? "inline-flex" : "none";
    const ck = node.querySelector<HTMLInputElement>("input[type=\"checkbox\"]");
    if (ck) {
      ck.disabled = !enabled;
    }
  }
}

function syncBrkInput(refs: Refs) {
  const custom = Number(refs.lineGapSel.value) === -1;
  refs.lineBrkInput.disabled = !custom;
}

function syncBrkInputByPreserve(refs: Refs, preserve: boolean) {
  refs.lineGapSel.disabled = preserve;
  if (preserve) {
    refs.lineBrkInput.disabled = true;
  } else {
    syncBrkInput(refs);
  }
}

function syncProfileUi(
  profiles: ReadonlyArray<ConfigProfile>,
  selectedId: string | null,
  refs: Refs
) {
  refs.profilePanel.style.display = profiles.length > 0 ? "" : "none";

  refs.profileSelect.innerHTML = "";
  for (const profile of profiles) {
    const opt = document.createElement("option");
    opt.value = profile.id;
    opt.textContent = profile.name;
    refs.profileSelect.appendChild(opt);
  }

  const hasProfiles = profiles.length > 0;
  refs.profileApplyBtn.disabled = !hasProfiles;
  refs.profileOverwriteBtn.disabled = !hasProfiles;
  refs.profileDeleteBtn.disabled = !hasProfiles;
  refs.profileSelect.disabled = !hasProfiles;

  if (!hasProfiles) {
    refs.profileMeta.textContent = "";
    return;
  }

  const targetId = selectedId && profiles.some((p) => p.id === selectedId) ? selectedId : profiles[0].id;
  refs.profileSelect.value = targetId;
  const target = profiles.find((p) => p.id === targetId) ?? profiles[0];
  refs.profileMeta.textContent = `最近更新：${new Date(target.updatedAt).toLocaleString()}`;
}

function mustGet<T extends HTMLElement>(id: string): T {
  const node = document.getElementById(id);
  if (!node) {
    throw new Error(`Missing element: ${id}`);
  }
  return node as T;
}

function parseInlineHint(label: string): { main: string; hint: string } | null {
  const m = label.match(/^(.*?)[（(]([^）)]+)[）)]\s*$/);
  if (!m) {
    return null;
  }

  const main = m[1].trimEnd();
  const hint = m[2].trim();
  if (!main || !hint) {
    return null;
  }

  return { main, hint };
}

function showTooltip(anchor: HTMLElement, text: string) {
  const existing = document.querySelector<HTMLElement>(".inline-tooltip");
  if (existing) {
    existing.remove();
  }

  const tip = document.createElement("div");
  tip.className = "inline-tooltip";
  tip.textContent = text;

  document.body.appendChild(tip);

  const rect = anchor.getBoundingClientRect();
  const tipH = tip.offsetHeight;
  const spaceBelow = window.innerHeight - rect.bottom;
  const top = spaceBelow >= tipH + 6 ? rect.bottom + 6 : rect.top - tipH - 6;

  tip.style.position = "fixed";
  tip.style.left = `${Math.min(rect.left, window.innerWidth - tip.offsetWidth - 12)}px`;
  tip.style.top = `${Math.max(4, top)}px`;

  const dismiss = () => {
    tip.remove();
    document.removeEventListener("click", dismiss);
  };

  setTimeout(() => {
    document.addEventListener("click", dismiss);
  }, 0);

  setTimeout(() => {
    tip.remove();
    document.removeEventListener("click", dismiss);
  }, 3000);
}

export { renderCks, syncCfgUi, syncModeRadios, syncModeUi, syncBrkInput, syncBrkInputByPreserve, syncProfileUi };
