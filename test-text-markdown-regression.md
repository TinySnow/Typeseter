# Markdown 回归样例

普通段落：这是中文English混排,要检查空格与标点. 上涨了5%的利润。

行内代码不应改动：`const x=1,y=2; console.log("中文,English")`。

链接文本可排版：[中文English链接,测试](https://example.com/path?a=1,b=2)
图片文本可排版：![封面English中文,测试](https://example.com/image-name.png)
自动链接不应改动：<https://example.com/a,b?x=1&y=2>
裸 URL 不应改动：https://example.com/abc,def?x=1&y=2

| 列一 | Column2 |
| --- | ---: |
| 中文English,混排 | 5%利润 |

<!--
这个 HTML 注释块内部不应该被排版,
包括 punctuation, spaces, 和 URL https://example.com/a,b
-->

```ts
// fenced code block should stay intact
const msg = "中文,English. 5%";
function sum(a:number,b:number){return a+b;}
```

~~~python
# another fence style
text = "中文,English. 5%"
print(text)
~~~