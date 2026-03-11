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

引号边界样例（英文引号输入）
我昨天在街上遇见了他。一见面，他便滔滔不绝起来。
"我跟你说，昨天我遇见他了，他一见面就跟我说：'你猜我昨天赢了多少钱？'我心想这我哪知道，就说不知道。
"他跟我说赢了五万块！整整五万！我打工要打几年才能赚到这么多啊。
"当时我恨得牙痒痒，就把他揍了一顿。"
