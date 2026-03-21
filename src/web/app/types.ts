/**
 * 前端 UI 层类型定义。
 */

import type { Option } from "../../core/models/option";

type BoolKey = {
  [K in keyof Option]: Option[K] extends boolean ? K : never;
}[keyof Option];

type Mode = "plain" | "markdown";

type SettingDef = {
  key: BoolKey;
  label: string;
  containerId: string;
  mdOnly?: boolean;
};

type ConfigProfile = {
  id: string;
  name: string;
  cfg: Option;
  mode: Mode;
  preview: boolean;
  updatedAt: number;
};

export type { BoolKey, Mode, SettingDef, ConfigProfile };
