import { Paras } from "./types";

/**
 * 对段落数组执行原地 map。
 * 说明：
 * - 采用原地修改，减少中间数组分配；
 * - 上层规则链本身就是顺序变换流程，适合这种写法。
 */
function mapP(paras: Paras, fn: (s: string) => string): Paras {
  for (let i = 0; i < paras.length; i += 1) {
    const s = paras[i];
    if (s != null) {
      paras[i] = fn(s);
    }
  }
  return paras;
}

export { mapP };
