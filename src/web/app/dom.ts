/**
 * DOM 引用与查询工具：
 * - 统一页面元素获取；
 * - 提供模式单选框与设置勾选框查询函数。
 */

import type { BoolKey } from "./types";

type Refs = {
  editor: HTMLTextAreaElement;
  lineGapSel: HTMLSelectElement;
  lineBrkInput: HTMLInputElement;
  typesetBtn: HTMLButtonElement;
  resetBtn: HTMLButtonElement;
  copyBtn: HTMLButtonElement;
  modeSwitch: HTMLDivElement;
  modePreviewRow: HTMLDivElement;
  previewToggle: HTMLLabelElement;
  mdPreview: HTMLInputElement;
  profileSaveBtn: HTMLButtonElement;
  profilePanel: HTMLDetailsElement;
  profileToolbar: HTMLDivElement;
  profileSelect: HTMLSelectElement;
  profileMeta: HTMLSpanElement;
  profileApplyBtn: HTMLButtonElement;
  profileOverwriteBtn: HTMLButtonElement;
  profileDeleteBtn: HTMLButtonElement;
};

function initRefs(): Refs {
  return {
    editor: mustGet<HTMLTextAreaElement>("editor"),
    lineGapSel: mustGet<HTMLSelectElement>("line-gap-select"),
    lineBrkInput: mustGet<HTMLInputElement>("line-breaker-input"),
    typesetBtn: mustGet<HTMLButtonElement>("typeset-btn"),
    resetBtn: mustGet<HTMLButtonElement>("reset-btn"),
    copyBtn: mustGet<HTMLButtonElement>("copy-btn"),
    modeSwitch: mustGet<HTMLDivElement>("mode-switch"),
    modePreviewRow: mustGet<HTMLDivElement>("mode-preview-row"),
    previewToggle: mustGet<HTMLLabelElement>("preview-toggle"),
    mdPreview: mustGet<HTMLInputElement>("markdown-protection-preview"),
    profileSaveBtn: mustGet<HTMLButtonElement>("profile-save-btn"),
    profilePanel: mustGet<HTMLDetailsElement>("profile-panel"),
    profileToolbar: mustGet<HTMLDivElement>("profile-toolbar"),
    profileSelect: mustGet<HTMLSelectElement>("profile-select"),
    profileMeta: mustGet<HTMLSpanElement>("profile-meta"),
    profileApplyBtn: mustGet<HTMLButtonElement>("profile-apply-btn"),
    profileOverwriteBtn: mustGet<HTMLButtonElement>("profile-overwrite-btn"),
    profileDeleteBtn: mustGet<HTMLButtonElement>("profile-delete-btn"),
  };
}

function getModeRadios(): NodeListOf<HTMLInputElement> {
  return document.querySelectorAll<HTMLInputElement>('input[name="typeset-mode"]');
}

function findSettingCheckbox(key: BoolKey): HTMLInputElement | null {
  return document.querySelector<HTMLInputElement>(`input[data-key="${key}"]`);
}

function mustGet<T extends HTMLElement>(id: string): T {
  const node = document.getElementById(id);
  if (!node) {
    throw new Error(`Missing element: ${id}`);
  }
  return node as T;
}

export { initRefs, getModeRadios, findSettingCheckbox };
export type { Refs };
