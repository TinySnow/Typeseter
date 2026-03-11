/**
 * core 层公共导出：
 * - 面向 Web、Bot、CLI 等多端复用。
 */

export type { Option } from "./models/option";

export { defaultPTS } from "./models/default-pure-setting";
export { typeset } from "./typeset";
export { typesetMarkdown } from "./markdown-typeset";
export { supportsAdvancedRegex } from "./regex-support";
