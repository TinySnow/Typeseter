import type { Option } from "../models/option";
import { findSettingCheckbox, getModeRadios } from "./dom";
import type { Mode, BoolKey, SettingDef } from "./types";
import type { Refs } from "./dom";

function renderCks(defs: ReadonlyArray<SettingDef>, cfg: Option, onCheck: (key: BoolKey, checked: boolean) => void) {
  for (const def of defs) {
    const boxWrap = mustGet<HTMLDivElement>(def.containerId);
    const label = document.createElement("label");
    const ck = document.createElement("input");
    ck.type = "checkbox";
    ck.dataset.key = def.key;
    ck.checked = cfg[def.key];

    ck.addEventListener("change", () => {
      onCheck(def.key, ck.checked);
    });

    label.append(ck, document.createTextNode(def.label));
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

  refs.previewToggle.style.display = isMd ? "inline-flex" : "none";

  refs.lineGapSel.disabled = isMd;
  if (isMd) {
    refs.lineBrkInput.disabled = true;
    return;
  }

  syncBrkInput(refs);
}

function syncBrkInput(refs: Refs) {
  const custom = Number(refs.lineGapSel.value) === -1;
  refs.lineBrkInput.disabled = !custom;
}

function mustGet<T extends HTMLElement>(id: string): T {
  const node = document.getElementById(id);
  if (!node) {
    throw new Error(`Missing element: ${id}`);
  }
  return node as T;
}

export { renderCks, syncCfgUi, syncModeRadios, syncModeUi, syncBrkInput };
