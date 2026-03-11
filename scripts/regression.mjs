#!/usr/bin/env node
/**
 * 回归基线脚本（无第三方测试框架版本）。
 *
 * 用法：
 * - node scripts/regression.mjs           // 对比基线
 * - node scripts/regression.mjs --update  // 更新基线
 *
 * 思路：
 * 1) 先用 TypeScript 编译核心模块到临时 CJS 目录；
 * 2) 直接 require 编译产物执行 plain / markdown 排版；
 * 3) 与 tests/baseline 下快照文件做对比。
 */

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";

const root = process.cwd();
const tmpDir = path.join(root, ".tmp-reg-cjs");
const update = process.argv.includes("--update");

const compileTargets = [
  "src/models/option.ts",
  "src/models/default-pure-setting.ts",
  "src/utils/chars.ts",
  "src/utils/flow.ts",
  "src/utils/typeset.ts",
  "src/utils/punctuation.ts",
  "src/utils/regex-support.ts",
  "src/utils/markdown-typeset.ts",
  "src/utils/plain/types.ts",
  "src/utils/plain/shared.ts",
  "src/utils/plain/space-rules.ts",
  "src/utils/plain/punct-rule.ts",
  "src/utils/plain/other-rules.ts",
  "src/utils/punct/types.ts",
  "src/utils/punct/shared.ts",
  "src/utils/punct/latin.ts",
  "src/utils/punct/misc.ts",
  "src/utils/punct/quote.ts",
  "src/utils/markdown/shared.ts",
  "src/utils/markdown/line-guard.ts",
  "src/utils/markdown/inline.ts",
];

const fixtures = [
  {
    name: "plain",
    input: "tests/case/test-text-plain-regression.txt",
    expected: "tests/baseline/plain.output.txt",
    run: (mods, text) => mods.typeset(text, mods.defaultPTS),
  },
  {
    name: "markdown",
    input: "tests/case/test-text-markdown-regression.md",
    expected: "tests/baseline/markdown.output.md",
    run: (mods, text) => mods.typesetMarkdown(text, mods.defaultPTS, false),
  },
];

main();

function main() {
  try {
    buildTempModules();
    const mods = loadModules();

    let hasDiff = false;
    for (const f of fixtures) {
      const inputText = readText(path.join(root, f.input));
      const outputText = normalizeLf(f.run(mods, inputText));
      const expectedPath = path.join(root, f.expected);

      if (update) {
        ensureDir(path.dirname(expectedPath));
        fs.writeFileSync(expectedPath, outputText, "utf8");
        console.log(`[update] ${f.name}: ${f.expected}`);
        continue;
      }

      if (!fs.existsSync(expectedPath)) {
        console.error(`[missing] ${f.name}: ${f.expected}`);
        hasDiff = true;
        continue;
      }

      const expectedText = readText(expectedPath);
      if (expectedText !== outputText) {
        hasDiff = true;
        const msg = firstDiff(expectedText, outputText);
        console.error(`[diff] ${f.name}: ${msg}`);
      } else {
        console.log(`[ok] ${f.name}`);
      }
    }

    if (!update && hasDiff) {
      process.exitCode = 1;
    }
  } finally {
    cleanupTmp();
  }
}

/**
 * 调用本地 TypeScript 编译器，把核心模块编译到临时目录。
 * 这里不走 npx，避免不同 shell/平台下命令解析差异。
 */
function buildTempModules() {
  cleanupTmp();

  const tscJs = path.join(root, "node_modules", "typescript", "lib", "tsc.js");
  if (!fs.existsSync(tscJs)) {
    throw new Error("缺少 TypeScript 编译器，请先执行 npm install。");
  }

  const args = [
    tscJs,
    "--module",
    "commonjs",
    "--target",
    "es2022",
    "--lib",
    "ES2022,DOM,DOM.Iterable",
    "--moduleResolution",
    "node",
    "--outDir",
    tmpDir,
    ...compileTargets,
  ];

  const ret = spawnSync(process.execPath, args, {
    cwd: root,
    stdio: "inherit",
    shell: false,
  });

  if (ret.error) {
    throw new Error(`tsc 启动失败：${ret.error.message}`);
  }

  if (ret.status !== 0) {
    throw new Error(`tsc 编译失败（exit=${ret.status}）`);
  }
}

/** 从临时 CJS 目录加载运行所需模块。 */
function loadModules() {
  const req = createRequire(path.join(tmpDir, "_entry.cjs"));
  const { typeset } = req(path.join(tmpDir, "utils", "typeset.js"));
  const { typesetMarkdown } = req(path.join(tmpDir, "utils", "markdown-typeset.js"));
  const { defaultPTS } = req(path.join(tmpDir, "models", "default-pure-setting.js"));
  return { typeset, typesetMarkdown, defaultPTS };
}

function cleanupTmp() {
  if (fs.existsSync(tmpDir)) {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

function readText(filePath) {
  return normalizeLf(fs.readFileSync(filePath, "utf8"));
}

function normalizeLf(text) {
  return text.replace(/\r\n/g, "\n");
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

/** 返回第一处差异，便于快速定位。 */
function firstDiff(a, b) {
  const max = Math.max(a.length, b.length);
  for (let i = 0; i < max; i += 1) {
    if (a[i] !== b[i]) {
      const line = a.slice(0, i).split("\n").length;
      return `line ${line}, index ${i}`;
    }
  }
  return "unknown diff";
}
