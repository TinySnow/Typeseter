import { Paras } from "./types";

function mapP(paras: Paras, fn: (s: string) => string): Paras {
  for (let i = 0; i < paras.length; i += 1) {
    const s = paras[i];
    if (s != null) {
      paras[i] = fn(s);
    }
  }
  return paras;
}

function fixLat(
  on: boolean,
  paras: Paras,
  to: string,
  advRe: RegExp | null,
  leftFb: RegExp,
  rightFb: RegExp
): Paras {
  if (!on) {
    return paras;
  }

  if (advRe) {
    return mapP(paras, (s) => s.replaceAll(advRe, to));
  }

  return mapP(paras, (s) => s.replace(leftFb, `$1${to}`).replace(rightFb, `${to}$1`));
}

export { mapP, fixLat };
