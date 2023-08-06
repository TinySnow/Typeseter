# Typeseter

## Premise and Most Important　/　特别提醒

- This project **ONLY** completes **most of the functions of the plain text part**, all the rest are WIP(Working In Progress).　/　本项目**只完成了纯文本部分的大部分功能**，其余的都在进行中。
- **For most users, the current project status is sufficient for daily use.　/　对于大部分用户，目前的项目状态已经足够日常使用。**

## Purpose　/　目的

- This repo aims to help people, who usually writing articles in Chinese, to tidy the typeset.　/　此仓库用于帮助经常用中文写文章的人整理文章排版。

## Use　/　使用

### Entry Point　/　项目入口

- [Click Here/项目地址](https://tinysnow.github.io/Typeseter)

### Example　/　使用示例

![](https://raw.githubusercontent.com/TinySnow/GithubImageHosting/main/project/typeseter/typeseter-demonstrate-1.gif)

## Attention　/　注意

- This project names "Typeseter", not "Typesetter" (**has no double t**) in case of mistaking with other typesetting project.　/　该项目名称为“Typesetter”，而不是“Typesetter”（**没有双写 t**），以防止与其他排版项目弄错。
- Comments in code ONLY written in Chinese.　/　代码注释只有中文。
- After clearing the broswer local storage, the config will be reset to default, since all the custom settings are saved at local storage of broswer.　/　清除站点本地存储之后，设置会被重置为默认设置，所有偏好设置全部存在浏览器的本地设置。
- For this project, maybe some lower version browers don't work due to the advanced regex grammar(*e.g.* positive lookbehind, positive lookahead).　/　这个项目可能在低版本的浏览器上无法工作，因为使用了高级正则表达式语法（例如：肯定性前视，肯定性后视）。
- The project comes with test text for testing.　/　项目内自带测试文本以供测试。

## Feature　/　特性

- Highly Self-custom　/　高度自定义

## TODO　/　待开发

- [x] 段首插入两个全角空格缩进　/　Insert two full-width space indent at the head of each paragraph
- [x] 自定义段落间空行数量　/　Custom the number of blank lines between former paragraph and latter paragraph
- [x] 中英文之间插入半角空格「盤古之白」　/　Insert half-width space in Chinese characters and English
- [x] 自定义是否删除原始空行　/　Custom whether delete the blank lines of the origin text
- [x] 删除中文之间的空白字符　/　Delete white characters between Chinese Characters
- [x] 修正标点　/　Fix wrong punctuations
    - [x] 修正中文间的英文**逗号**　/　Fix the English **comma** between Chinese Characters
    - [x] 修正中文间的英文**句点**　/　Fix the English **dot** between Chinese Characters
    - [x] 修正中文间的英文**冒号**　/　Fix the English **colon** between Chinese Characters
    - [x] 修正中文间的英文**分号**　/　Fix the English **semicolon** between Chinese Characters
    - [x] 修正中文间的英文**问号**　/　Fix the English **question mark** between Chinese Characters
    - [x] 修正包含中文的英文**括号**　/　Fix the English **brackets** including Chinese Characters
    - [x] 修正中文间的英文**感叹号**　/　Fix the English **bang** between Chinese Characters
    - [x] 修正不规范的**书名号**　/　Fix the non-standard **guillemet**
    - [x] 修正不规范的**破折号**　/　Fix the non-standard **chinese dashes**
    - [x] 删除多余的中文逗号　/　Delete the redundent Chinese comma
    - [x] 删除多余的中文省略号　/　Delete the redundent Chinese ellipsis
    - [x] 多个中文句号转换为省略号　/　Convert multiple Chinese periods to Chinese ellipsis
- [ ] 折行处理（Shift Enter）　/　Wrapping paragraph
- [ ] 【重要】能够撤销（Ctrl+Z）和重做（Ctrl+Shift+Z&Ctrl+Y）　/　【Important】Can undo(Ctrl+Z) and redo(Ctrl+Shift+Z&Ctrl+Y)
- [ ] 【重要】排版后自动全选文本　/　【Important】Automatic select all the text after typesetted
- [ ] 简繁中文转换　/　Conversion of Simplified Chinese and Traditional Chinese
- [ ] 【困难】中文文章内的不规范引号规范化　/　【Hard】Normalize the non-standard quotation marks in Chinese articles 
    - [ ] 半角英文双引号 `"`　/　Half-width English double quotes
    - [ ] 全角英文双引号 `＂`　/　Full-width English double quotes
    - [ ] 半角英文单引号 `'`　/　Half-width English single quotes
    - [ ] 全角英文单引号 `＇`　/　Full-width English single quotes
- [ ] 标准中文引号转换为日式直角引号　/　Convert standard Chinese quotation marks to Japanese right-angle quotation marks
    - [ ] 中文双引号 `“”`　/　Chinese double quotes
    - [ ] 中文单引号 `‘’`　/　Chinese single quotes
- [ ] 统一间隔号　/　Unify the spacer
    - [ ] 日式全角片假名中点 `・`　/　Japanese full-width katakana midpoint 
    - [ ] 标准中文间隔号 `·`　/　Standard Chinese spacer
    - [ ] 无序列表序号用作间隔号 `•`　/　Unordered list sign using for spacer
- [ ] 自定义间隔号两旁是否加半角空格　/　Custom whether add half-width space at both sides of spacer
- [ ] 纯英文文本标点符号后添加空格　/　Add half-width space after the punctuations of plain English text
- [ ] Markdown 文章排版　/　Typesetting for Markdown passages
    - [ ] 三个以上空行自动转 `\n<br />\n`　/　More than three blank lines can be automatically converted to `\n<br />\n`
    - [ ] 单关键词段落自动转相应 Header（例如：`正文` => `## 正文`）　/　Single-keyword paragraphs can be automatically converted to the corresponding Header (for example: `text` => `## text`)
- [ ] 导出偏好配置文件　/　Can export the prefer configuration
- [ ] 列出规范参考来源　/　List the reference of specification
- [ ] 在页面上添加项目地址　/　Add the project address at page
- [x] 写出 Github Actions 配置文件并部署到 Github Pages　/　Write a Github Actions profile and deploy to Github Pages

## Framework　/　框架

- Web Framework: [Umi](https://v3.umijs.org) Framework(Based on [React](https://react.dev)).　/　[Umi](https://v3.umijs.org) 框架（基于 [React](https://react.dev)）。
- UI Framework: [Ant Design](https://ant.design/index-cn).

## Contribution　/　参与项目

- Contributions and Pull Request are always welcome.　/　欢迎参与贡献提交 PR。

## License　/　许可证

- MIT License.