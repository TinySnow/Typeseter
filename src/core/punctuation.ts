/**
 * 标点处理聚合导出层。
 * 只暴露当前规则链真正使用的函数，避免无效导出。
 */

export { enBr2CnBr } from "./punct/latin";

export { cnDash, foldCnDots, foldCnCommas, foldCnEll, fixGuil } from "./punct/misc";

export { enQ2CnQ } from "./punct/quote";
