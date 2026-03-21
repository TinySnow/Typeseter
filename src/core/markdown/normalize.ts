/**
 * Markdown 结构规范化（轻量版）：
 * - 覆盖一批低风险、可自动修复的结构规则；
 * - 跳过受保护区域（围栏代码块、HTML 注释块、表格分隔线）。
 */

import { lineGuard } from "./line-guard";
import { initGuard } from "./shared";

type MarkdownNormalizeSwitches = {
  trimTrailingSpaces: boolean;
  headingSpaceAfterHash: boolean;
  headingSingleSpaceAfterHash: boolean;
  blankLineAroundHeadings: boolean;
  listMarkerSpace: boolean;
  blankLineAroundFences: boolean;
  blankLineAroundLists: boolean;
  ensureSingleTrailingNewline: boolean;
};

function applyMarkdownNormalizeRules(text: string, opt: MarkdownNormalizeSwitches): string {
  const source = text.replace(/\r\n/g, "\n");
  let lines = source.split("\n");
  const protectedLines = markProtected(lines);

  for (let i = 0; i < lines.length; i += 1) {
    if (protectedLines[i]) {
      continue;
    }

    let curr = lines[i];

    if (opt.headingSpaceAfterHash || opt.headingSingleSpaceAfterHash) {
      const noSpaceHeading = curr.match(/^(\s{0,3}#{1,6})([^#\s].*)$/);
      if (noSpaceHeading && opt.headingSpaceAfterHash) {
        curr = `${noSpaceHeading[1]} ${noSpaceHeading[2]}`;
      } else {
        const multiSpaceHeading = curr.match(/^(\s{0,3}#{1,6})[ \t]{2,}(\S.*)$/);
        if (multiSpaceHeading && opt.headingSingleSpaceAfterHash) {
          curr = `${multiSpaceHeading[1]} ${multiSpaceHeading[2]}`;
        }
      }
    }

    if (opt.listMarkerSpace) {
      const noSpaceList = curr.match(/^([ \t]{0,3})([-+*]|\d+[.)])(\S.*)$/);
      if (noSpaceList) {
        const indent = noSpaceList[1];
        const marker = noSpaceList[2];
        const content = noSpaceList[3];
        if (shouldNormalizeNoSpaceList(marker, content)) {
          curr = `${indent}${marker} ${content}`;
        }
      } else {
        const multiSpaceList = curr.match(/^([ \t]{0,3}(?:[-+*]|\d+[.)]))[ \t]{2,}(\S.*)$/);
        if (multiSpaceList) {
          curr = `${multiSpaceList[1]} ${multiSpaceList[2]}`;
        }
      }
    }

    if (opt.trimTrailingSpaces) {
      curr = curr.replace(/[ \t]+$/g, "");
    }

    lines[i] = curr;
  }

  lines = fixStructuralBlankLines(lines, protectedLines, opt);

  let out = lines.join("\n");
  if (opt.ensureSingleTrailingNewline) {
    out = out.replace(/\n*$/g, "\n");
  }
  return out;
}

function fixStructuralBlankLines(
  lines: string[],
  protectedLines: boolean[],
  opt: MarkdownNormalizeSwitches
): string[] {
  const out: string[] = [];

  for (let i = 0; i < lines.length; i += 1) {
    const curr = lines[i];
    const prevOut = out.length > 0 ? out[out.length - 1] : null;
    const next = i + 1 < lines.length ? lines[i + 1] : null;

    const currFence = isFenceLine(curr);
    const currHeading = !protectedLines[i] && isAtxHeadingLine(curr);
    const currList = !protectedLines[i] && isListLine(curr);

    if (prevOut !== null && !isBlankLine(prevOut)) {
      if (currHeading && opt.blankLineAroundHeadings) {
        out.push("");
      } else if (currFence && opt.blankLineAroundFences) {
        out.push("");
      } else if (
        currList &&
        opt.blankLineAroundLists &&
        !isListLine(prevOut) &&
        !isListContinuationLine(prevOut)
      ) {
        out.push("");
      }
    }

    out.push(curr);

    if (next !== null && !isBlankLine(next)) {
      if (currHeading && opt.blankLineAroundHeadings) {
        out.push("");
      } else if (currFence && opt.blankLineAroundFences) {
        out.push("");
      } else if (
        currList &&
        opt.blankLineAroundLists &&
        !isListLine(next) &&
        !isListContinuationLine(next)
      ) {
        out.push("");
      }
    }
  }

  return out;
}

function markProtected(lines: string[]): boolean[] {
  const state = initGuard();
  const out = new Array<boolean>(lines.length);

  for (let i = 0; i < lines.length; i += 1) {
    const reason = lineGuard(lines[i], state);
    out[i] = reason !== null;
  }

  return out;
}

function isBlankLine(line: string): boolean {
  return line.trim().length === 0;
}

function isAtxHeadingLine(line: string): boolean {
  return /^[ \t]{0,3}#{1,6}(?:\s|$)/.test(line);
}

function isListLine(line: string): boolean {
  return /^[ \t]{0,3}(?:[-+*]|\d+[.)])\s+/.test(line);
}

function isListContinuationLine(line: string): boolean {
  return /^\s{2,}\S/.test(line);
}

function isFenceLine(line: string): boolean {
  return /^\s*([`~])\1{2,}/.test(line);
}

function shouldNormalizeNoSpaceList(marker: string, content: string): boolean {
  if (marker !== "*") {
    return true;
  }

  const firstToken = content.match(/^\S+/)?.[0] ?? "";
  return !firstToken.includes("*");
}

export { applyMarkdownNormalizeRules };
export type { MarkdownNormalizeSwitches };
