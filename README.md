# Typeseter

一个面向中文写作的小型排版工具，当前为纯静态版本（无 Umi、无 Ant、无 React）。

## 在线地址

- [https://tinysnow.github.io/Typeseter](https://tinysnow.github.io/Typeseter)

## 当前技术栈

- TypeScript
- Vite
- 原生 DOM
- 正则驱动排版规则

## 本地开发

仓库已内置 npm 镜像（`.npmrc`）：`https://registry.npmmirror.com/`。

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```

构建产物目录为 `dist/`，可直接部署到 GitHub Pages。

## GitHub 部署

仓库内置 GitHub Actions：推送到 `master` 后自动构建并发布 `dist/` 到 Pages。

## 兼容性说明

- 已加入高级正则能力探测。
- 不支持高级正则的浏览器会自动走兼容回退路径（避免语法级报错）。

## 已实现

### 纯文本模式

- 删除空行
- 段首缩进
- 中英文间加空格
- 删除中文与中文标点间空格
- 多项标点修正（逗号、句点、冒号、问号、叹号、分号、括号、书名号、破折号等）
- 段落间隔设置（含自定义分隔符）

### Markdown 模式（实验）

- 在纯文本规则基础上进行 Markdown 安全排版
- 跳过并保护以下范围：
  - 代码块（fenced code，支持反引号或波浪线）
  - 行内代码（`...`）
  - URL 与自动链接
  - 表格分隔线
  - HTML 注释块
- 支持“保护范围预览”开关，便于观察跳过区域

## 回归样例（请保留）

- `test-text.txt`（原始样例）
- `test-text-plain-regression.txt`（纯文本回归样例）
- `test-text-markdown-regression.md`（Markdown 回归样例）

## 待完善

- Markdown 规则继续细化（列表、引用、任务列表等）
- 更细粒度规则开关（按规则组启停）
- 更多可配置规则（如引号、间隔号、简繁转换）

## License

MIT