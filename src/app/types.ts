/**
 * 前端 UI 层类型定义。
 */

import type { Option } from "../models/option";

type BoolKey = {
  [K in keyof Option]: Option[K] extends boolean ? K : never;
}[keyof Option];

type Mode = "plain" | "markdown";

type SettingDef = {
  key: BoolKey;
  label: string;
  containerId: string;
};

export type { BoolKey, Mode, SettingDef };
