"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[862],{57173:function(eu,g,t){t.d(g,{In:function(){return O}});var T=t(54306),s=t.n(T),i=t(93236),o=t(80244),N=t(62086),m=o.Z.TextArea,O=function(C){var x=C.typesetted,L=C.isProcessed,l=C.onChange,A=i.useState(x),c=s()(A,2),h=c[0],I=c[1],B=function(v){var d=v.target.value;I(d),l(d)};return(0,N.jsx)(m,{showCount:!0,value:L?x:h,rows:20,onChange:B})}},26782:function(eu,g,t){t.r(g),t.d(g,{default:function(){return Gu}});var T=t(54306),s=t.n(T),i=t(93236),o=t(4193),N=t(55057),m=t(75003),O=t(6696),V=t(41287),C={headerStyle:"headerStyle___xyel5",contentStyle:"contentStyle___PydwO",footerStyle:"footerStyle___e6efR",handleBotton:"handleBotton___qaZ2_",collapse:"collapse___yJty9"},x=t(57173),L=t(57213),l=t.n(L),A=t(90616),c=t(70656),h=t(89776),I={insertIndent:!0,lineGap:0,deleteBlankLines:!0,deleteSpaceInChineseCharacter:!0,insertSpaceInChineseAndEnglish:!0,deleteSpaceBetweenChineseCharactersAndChinesePunctuations:!0,fixPunctuation:!0,comma:!0,dots2ellipsis:!0,dot:!0,colon:!0,bang:!0,questionMark:!0,semicolon:!0,guillemet:!0,chineseDash:!0,chineseCommasFold:!0,chineseDotsFold:!0,chineseEllipsisesFold:!0,englishBrackets2ChineseBrackets:!0,fixOthers:!0,insertSpaceAfterPercentSign:!0},B=1,y=2,v=3,d=4,j=5,Z=101,M=102,_=103,R=104,G=105,H=106,b=107,X=108,K=109,U=110,W=111,J=112,z=113,$=113,a=t(62086),f=function(D){localStorage.setItem("pure-text-config",JSON.stringify(D))},nu=function(){return f(I),JSON.stringify(I)},e=JSON.parse(localStorage.getItem("pure-text-config")||nu()),tu=[{label:"\u5220\u9664\u539F\u59CB\u7A7A\u884C",value:B},{label:"\u63D2\u5165\u6BB5\u9996\u7F29\u8FDB",value:y},{label:"\u5220\u9664\u6C49\u5B57\u4E4B\u95F4\u7684\u7A7A\u683C",value:v},{label:"\u4E2D\u82F1\u6587\u4E4B\u95F4\u63D2\u5165\u7A7A\u683C",value:d},{label:"\u5220\u9664\u6C49\u5B57\u548C\u6807\u70B9\u4E4B\u95F4\u7684\u7A7A\u683C",value:j}],au=[{label:"\u9017\u53F7",value:Z},{label:"\u53E5\u70B9",value:M},{label:"\u5192\u53F7",value:R},{label:"\u53F9\u53F7",value:G},{label:"\u95EE\u53F7",value:H},{label:"\u5206\u53F7",value:b},{label:"\u62EC\u53F7",value:W},{label:"\u4E66\u540D\u53F7",value:J},{label:"\u7834\u6298\u53F7",value:z},{label:"\u5220\u9664\u91CD\u590D\u9017\u53F7",value:X},{label:"\u5220\u9664\u91CD\u590D\u53E5\u53F7",value:K},{label:"\u5220\u9664\u91CD\u590D\u7701\u7565\u53F7",value:U},{label:"\u8FDE\u7EED\u53E5\u70B9\u53D8\u4E3A\u7701\u7565\u53F7",value:_}],ru=[{label:"\u767E\u5206\u53F7\u540E\u52A0\u7A7A\u683C",value:$}],Q=function(){var D=[];return e.deleteBlankLines&&D.push(B),e.deleteSpaceBetweenChineseCharactersAndChinesePunctuations&&D.push(j),e.insertIndent&&D.push(y),e.deleteSpaceInChineseCharacter&&D.push(v),e.insertSpaceInChineseAndEnglish&&D.push(d),e.comma&&D.push(Z),e.dots2ellipsis&&D.push(_),e.dot&&D.push(M),e.colon&&D.push(R),e.bang&&D.push(G),e.questionMark&&D.push(H),e.semicolon&&D.push(b),e.guillemet&&D.push(J),e.chineseDash&&D.push(z),e.chineseCommasFold&&D.push(X),e.chineseDotsFold&&D.push(K),e.chineseEllipsisesFold&&D.push(U),e.englishBrackets2ChineseBrackets&&D.push(W),e.insertSpaceAfterPercentSign&&D.push($),D},lu=function(){var D=(0,i.useState)(e.lineGap),u=s()(D,2),F=u[0],E=u[1],p=function(r){E(r.target.value),e=l()(l()({},e),{},{lineGap:r.target.value}),f(e)},P=function(r){e=l()(l()({},e),{},{deleteBlankLines:r.includes(B),deleteSpaceBetweenChineseCharactersAndChinesePunctuations:r.includes(j),insertIndent:r.includes(y),deleteSpaceInChineseCharacter:r.includes(v),insertSpaceInChineseAndEnglish:r.includes(d)}),f(e)},k=function(r){e=l()(l()({},e),{},{comma:r.includes(Z),dots2ellipsis:r.includes(_),dot:r.includes(M),colon:r.includes(R),bang:r.includes(G),questionMark:r.includes(H),semicolon:r.includes(b),guillemet:r.includes(J),chineseDash:r.includes(z),chineseCommasFold:r.includes(X),chineseDotsFold:r.includes(K),chineseEllipsisesFold:r.includes(U),englishBrackets2ChineseBrackets:r.includes(W)}),f(e)},Y=function(r){e=l()(l()({},e),{},{insertSpaceAfterPercentSign:r.includes($)}),f(e)};return(0,a.jsxs)("div",{children:[(0,a.jsx)(A.Z,{plain:!0,children:"\u5E38\u89C4\u4FEE\u6B63"}),(0,a.jsx)("div",{children:(0,a.jsx)(c.Z.Group,{options:tu,defaultValue:Q(),onChange:P})}),(0,a.jsx)(A.Z,{plain:!0,children:"\u7A7A\u884C\u4FEE\u6B63"}),(0,a.jsx)("div",{children:(0,a.jsxs)(h.ZP.Group,{onChange:p,value:F,children:[(0,a.jsx)(h.ZP,{value:0,children:"\u6BB5\u843D\u95F4\u4E0D\u7A7A\u884C"}),(0,a.jsx)(h.ZP,{value:1,children:"\u6BB5\u843D\u95F4\u7A7A\u4E00\u884C"}),(0,a.jsx)(h.ZP,{value:2,children:"\u6BB5\u843D\u95F4\u7A7A\u4E24\u884C"})]})}),(0,a.jsx)(A.Z,{plain:!0,children:"\u6807\u70B9\u4FEE\u6B63\uFF08\u82F1\u53D8\u4E2D\uFF09"}),(0,a.jsx)("div",{children:(0,a.jsx)(c.Z.Group,{options:au,defaultValue:Q(),onChange:k})}),(0,a.jsx)(A.Z,{plain:!0,children:"\u5176\u4ED6\u53EF\u9009\u4FEE\u6B63"}),(0,a.jsx)(c.Z.Group,{options:ru,defaultValue:Q(),onChange:Y})]})},Eu=t(93525),Cu=t.n(Eu),su=t(21140),iu=t.n(su),ou=t(63466),Au=t.n(ou),cu=t(52510),hu=t.n(cu);function du(n,D){return n?D.map(function(u){return u==null?void 0:u.replaceAll(new RegExp("(?<=(?:[\\u2E80-\\u2E99\\u2E9B-\\u2EF3\\u2F00-\\u2FD5\\u3005\\u3007\\u3021-\\u3029\\u3038-\\u303B\\u3400-\\u4DBF\\u4E00-\\u9FFF\\uF900-\\uFA6D\\uFA70-\\uFAD9]|\\uD81B[\\uDFE2\\uDFE3\\uDFF0\\uDFF1]|[\\uD840-\\uD868\\uD86A-\\uD86C\\uD86F-\\uD872\\uD874-\\uD879\\uD880-\\uD883\\uD885-\\uD887][\\uDC00-\\uDFFF]|\\uD869[\\uDC00-\\uDEDF\\uDF00-\\uDFFF]|\\uD86D[\\uDC00-\\uDF39\\uDF40-\\uDFFF]|\\uD86E[\\uDC00-\\uDC1D\\uDC20-\\uDFFF]|\\uD873[\\uDC00-\\uDEA1\\uDEB0-\\uDFFF]|\\uD87A[\\uDC00-\\uDFE0]|\\uD87E[\\uDC00-\\uDE1D]|\\uD884[\\uDC00-\\uDF4A\\uDF50-\\uDFFF]|\\uD888[\\uDC00-\\uDFAF])),[\\t-\\r \\xA0\\u1680\\u2000-\\u200A\\u2028\\u2029\\u202F\\u205F\\u3000\\uFEFF]*(?=(?:[\\0-\\uD7FF\\uE000-\\uFFFF]|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]|[\\uD800-\\uDBFF](?![\\uDC00-\\uDFFF])|(?:[^\\uD800-\\uDBFF]|^)[\\uDC00-\\uDFFF])*)|(?<=(?:[\\0-\\t\\x0B\\f\\x0E-\\u2027\\u202A-\\uD7FF\\uE000-\\uFFFF]|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]|[\\uD800-\\uDBFF](?![\\uDC00-\\uDFFF])|(?:[^\\uD800-\\uDBFF]|^)[\\uDC00-\\uDFFF])),[\\t-\\r \\xA0\\u1680\\u2000-\\u200A\\u2028\\u2029\\u202F\\u205F\\u3000\\uFEFF]*(?=(?:[\\u2E80-\\u2E99\\u2E9B-\\u2EF3\\u2F00-\\u2FD5\\u3005\\u3007\\u3021-\\u3029\\u3038-\\u303B\\u3400-\\u4DBF\\u4E00-\\u9FFF\\uF900-\\uFA6D\\uFA70-\\uFAD9]|\\uD81B[\\uDFE2\\uDFE3\\uDFF0\\uDFF1]|[\\uD840-\\uD868\\uD86A-\\uD86C\\uD86F-\\uD872\\uD874-\\uD879\\uD880-\\uD883\\uD885-\\uD887][\\uDC00-\\uDFFF]|\\uD869[\\uDC00-\\uDEDF\\uDF00-\\uDFFF]|\\uD86D[\\uDC00-\\uDF39\\uDF40-\\uDFFF]|\\uD86E[\\uDC00-\\uDC1D\\uDC20-\\uDFFF]|\\uD873[\\uDC00-\\uDEA1\\uDEB0-\\uDFFF]|\\uD87A[\\uDC00-\\uDFE0]|\\uD87E[\\uDC00-\\uDE1D]|\\uD884[\\uDC00-\\uDF4A\\uDF50-\\uDFFF]|\\uD888[\\uDC00-\\uDFAF]))","g"),"\uFF0C")}):D}function Bu(n,D){return n?D.map(function(u){return u==null?void 0:u.replaceAll(new RegExp("(?<=(?:[\\u2E80-\\u2E99\\u2E9B-\\u2EF3\\u2F00-\\u2FD5\\u3005\\u3007\\u3021-\\u3029\\u3038-\\u303B\\u3400-\\u4DBF\\u4E00-\\u9FFF\\uF900-\\uFA6D\\uFA70-\\uFAD9]|\\uD81B[\\uDFE2\\uDFE3\\uDFF0\\uDFF1]|[\\uD840-\\uD868\\uD86A-\\uD86C\\uD86F-\\uD872\\uD874-\\uD879\\uD880-\\uD883\\uD885-\\uD887][\\uDC00-\\uDFFF]|\\uD869[\\uDC00-\\uDEDF\\uDF00-\\uDFFF]|\\uD86D[\\uDC00-\\uDF39\\uDF40-\\uDFFF]|\\uD86E[\\uDC00-\\uDC1D\\uDC20-\\uDFFF]|\\uD873[\\uDC00-\\uDEA1\\uDEB0-\\uDFFF]|\\uD87A[\\uDC00-\\uDFE0]|\\uD87E[\\uDC00-\\uDE1D]|\\uD884[\\uDC00-\\uDF4A\\uDF50-\\uDFFF]|\\uD888[\\uDC00-\\uDFAF]))\\.[\\t-\\r \\xA0\\u1680\\u2000-\\u200A\\u2028\\u2029\\u202F\\u205F\\u3000\\uFEFF]*(?=(?:[\\0-\\uD7FF\\uE000-\\uFFFF]|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]|[\\uD800-\\uDBFF](?![\\uDC00-\\uDFFF])|(?:[^\\uD800-\\uDBFF]|^)[\\uDC00-\\uDFFF])*)|(?<=(?:[\\0-\\t\\x0B\\f\\x0E-\\u2027\\u202A-\\uD7FF\\uE000-\\uFFFF]|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]|[\\uD800-\\uDBFF](?![\\uDC00-\\uDFFF])|(?:[^\\uD800-\\uDBFF]|^)[\\uDC00-\\uDFFF]))\\.[\\t-\\r \\xA0\\u1680\\u2000-\\u200A\\u2028\\u2029\\u202F\\u205F\\u3000\\uFEFF]*(?=(?:[\\u2E80-\\u2E99\\u2E9B-\\u2EF3\\u2F00-\\u2FD5\\u3005\\u3007\\u3021-\\u3029\\u3038-\\u303B\\u3400-\\u4DBF\\u4E00-\\u9FFF\\uF900-\\uFA6D\\uFA70-\\uFAD9]|\\uD81B[\\uDFE2\\uDFE3\\uDFF0\\uDFF1]|[\\uD840-\\uD868\\uD86A-\\uD86C\\uD86F-\\uD872\\uD874-\\uD879\\uD880-\\uD883\\uD885-\\uD887][\\uDC00-\\uDFFF]|\\uD869[\\uDC00-\\uDEDF\\uDF00-\\uDFFF]|\\uD86D[\\uDC00-\\uDF39\\uDF40-\\uDFFF]|\\uD86E[\\uDC00-\\uDC1D\\uDC20-\\uDFFF]|\\uD873[\\uDC00-\\uDEA1\\uDEB0-\\uDFFF]|\\uD87A[\\uDC00-\\uDFE0]|\\uD87E[\\uDC00-\\uDE1D]|\\uD884[\\uDC00-\\uDF4A\\uDF50-\\uDFFF]|\\uD888[\\uDC00-\\uDFAF]))","g"),"\u3002")}):D}function vu(n,D){return n?D.map(function(u){return u==null?void 0:u.replaceAll(new RegExp("(?<=(?:[\\u2E80-\\u2E99\\u2E9B-\\u2EF3\\u2F00-\\u2FD5\\u3005\\u3007\\u3021-\\u3029\\u3038-\\u303B\\u3400-\\u4DBF\\u4E00-\\u9FFF\\uF900-\\uFA6D\\uFA70-\\uFAD9]|\\uD81B[\\uDFE2\\uDFE3\\uDFF0\\uDFF1]|[\\uD840-\\uD868\\uD86A-\\uD86C\\uD86F-\\uD872\\uD874-\\uD879\\uD880-\\uD883\\uD885-\\uD887][\\uDC00-\\uDFFF]|\\uD869[\\uDC00-\\uDEDF\\uDF00-\\uDFFF]|\\uD86D[\\uDC00-\\uDF39\\uDF40-\\uDFFF]|\\uD86E[\\uDC00-\\uDC1D\\uDC20-\\uDFFF]|\\uD873[\\uDC00-\\uDEA1\\uDEB0-\\uDFFF]|\\uD87A[\\uDC00-\\uDFE0]|\\uD87E[\\uDC00-\\uDE1D]|\\uD884[\\uDC00-\\uDF4A\\uDF50-\\uDFFF]|\\uD888[\\uDC00-\\uDFAF])):[\\t-\\r \\xA0\\u1680\\u2000-\\u200A\\u2028\\u2029\\u202F\\u205F\\u3000\\uFEFF]*(?=(?:[\\0-\\uD7FF\\uE000-\\uFFFF]|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]|[\\uD800-\\uDBFF](?![\\uDC00-\\uDFFF])|(?:[^\\uD800-\\uDBFF]|^)[\\uDC00-\\uDFFF])*)|(?<=(?:[\\0-\\t\\x0B\\f\\x0E-\\u2027\\u202A-\\uD7FF\\uE000-\\uFFFF]|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]|[\\uD800-\\uDBFF](?![\\uDC00-\\uDFFF])|(?:[^\\uD800-\\uDBFF]|^)[\\uDC00-\\uDFFF])):[\\t-\\r \\xA0\\u1680\\u2000-\\u200A\\u2028\\u2029\\u202F\\u205F\\u3000\\uFEFF]*(?=(?:[\\u2E80-\\u2E99\\u2E9B-\\u2EF3\\u2F00-\\u2FD5\\u3005\\u3007\\u3021-\\u3029\\u3038-\\u303B\\u3400-\\u4DBF\\u4E00-\\u9FFF\\uF900-\\uFA6D\\uFA70-\\uFAD9]|\\uD81B[\\uDFE2\\uDFE3\\uDFF0\\uDFF1]|[\\uD840-\\uD868\\uD86A-\\uD86C\\uD86F-\\uD872\\uD874-\\uD879\\uD880-\\uD883\\uD885-\\uD887][\\uDC00-\\uDFFF]|\\uD869[\\uDC00-\\uDEDF\\uDF00-\\uDFFF]|\\uD86D[\\uDC00-\\uDF39\\uDF40-\\uDFFF]|\\uD86E[\\uDC00-\\uDC1D\\uDC20-\\uDFFF]|\\uD873[\\uDC00-\\uDEA1\\uDEB0-\\uDFFF]|\\uD87A[\\uDC00-\\uDFE0]|\\uD87E[\\uDC00-\\uDE1D]|\\uD884[\\uDC00-\\uDF4A\\uDF50-\\uDFFF]|\\uD888[\\uDC00-\\uDFAF]))","g"),"\uFF1A")}):D}function fu(n,D){return n?D.map(function(u){return u==null?void 0:u.replaceAll(new RegExp("(?<=(?:[\\u2E80-\\u2E99\\u2E9B-\\u2EF3\\u2F00-\\u2FD5\\u3005\\u3007\\u3021-\\u3029\\u3038-\\u303B\\u3400-\\u4DBF\\u4E00-\\u9FFF\\uF900-\\uFA6D\\uFA70-\\uFAD9]|\\uD81B[\\uDFE2\\uDFE3\\uDFF0\\uDFF1]|[\\uD840-\\uD868\\uD86A-\\uD86C\\uD86F-\\uD872\\uD874-\\uD879\\uD880-\\uD883\\uD885-\\uD887][\\uDC00-\\uDFFF]|\\uD869[\\uDC00-\\uDEDF\\uDF00-\\uDFFF]|\\uD86D[\\uDC00-\\uDF39\\uDF40-\\uDFFF]|\\uD86E[\\uDC00-\\uDC1D\\uDC20-\\uDFFF]|\\uD873[\\uDC00-\\uDEA1\\uDEB0-\\uDFFF]|\\uD87A[\\uDC00-\\uDFE0]|\\uD87E[\\uDC00-\\uDE1D]|\\uD884[\\uDC00-\\uDF4A\\uDF50-\\uDFFF]|\\uD888[\\uDC00-\\uDFAF]))\\?[\\t-\\r \\xA0\\u1680\\u2000-\\u200A\\u2028\\u2029\\u202F\\u205F\\u3000\\uFEFF]*(?=(?:[\\0-\\uD7FF\\uE000-\\uFFFF]|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]|[\\uD800-\\uDBFF](?![\\uDC00-\\uDFFF])|(?:[^\\uD800-\\uDBFF]|^)[\\uDC00-\\uDFFF])*)|(?<=(?:[\\0-\\t\\x0B\\f\\x0E-\\u2027\\u202A-\\uD7FF\\uE000-\\uFFFF]|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]|[\\uD800-\\uDBFF](?![\\uDC00-\\uDFFF])|(?:[^\\uD800-\\uDBFF]|^)[\\uDC00-\\uDFFF]))\\?[\\t-\\r \\xA0\\u1680\\u2000-\\u200A\\u2028\\u2029\\u202F\\u205F\\u3000\\uFEFF]*(?=(?:[\\u2E80-\\u2E99\\u2E9B-\\u2EF3\\u2F00-\\u2FD5\\u3005\\u3007\\u3021-\\u3029\\u3038-\\u303B\\u3400-\\u4DBF\\u4E00-\\u9FFF\\uF900-\\uFA6D\\uFA70-\\uFAD9]|\\uD81B[\\uDFE2\\uDFE3\\uDFF0\\uDFF1]|[\\uD840-\\uD868\\uD86A-\\uD86C\\uD86F-\\uD872\\uD874-\\uD879\\uD880-\\uD883\\uD885-\\uD887][\\uDC00-\\uDFFF]|\\uD869[\\uDC00-\\uDEDF\\uDF00-\\uDFFF]|\\uD86D[\\uDC00-\\uDF39\\uDF40-\\uDFFF]|\\uD86E[\\uDC00-\\uDC1D\\uDC20-\\uDFFF]|\\uD873[\\uDC00-\\uDEA1\\uDEB0-\\uDFFF]|\\uD87A[\\uDC00-\\uDFE0]|\\uD87E[\\uDC00-\\uDE1D]|\\uD884[\\uDC00-\\uDF4A\\uDF50-\\uDFFF]|\\uD888[\\uDC00-\\uDFAF]))","g"),"\uFF1F")}):D}function pu(n,D){return n?D.map(function(u){return u==null?void 0:u.replaceAll(new RegExp("(?<=(?:[\\u2E80-\\u2E99\\u2E9B-\\u2EF3\\u2F00-\\u2FD5\\u3005\\u3007\\u3021-\\u3029\\u3038-\\u303B\\u3400-\\u4DBF\\u4E00-\\u9FFF\\uF900-\\uFA6D\\uFA70-\\uFAD9]|\\uD81B[\\uDFE2\\uDFE3\\uDFF0\\uDFF1]|[\\uD840-\\uD868\\uD86A-\\uD86C\\uD86F-\\uD872\\uD874-\\uD879\\uD880-\\uD883\\uD885-\\uD887][\\uDC00-\\uDFFF]|\\uD869[\\uDC00-\\uDEDF\\uDF00-\\uDFFF]|\\uD86D[\\uDC00-\\uDF39\\uDF40-\\uDFFF]|\\uD86E[\\uDC00-\\uDC1D\\uDC20-\\uDFFF]|\\uD873[\\uDC00-\\uDEA1\\uDEB0-\\uDFFF]|\\uD87A[\\uDC00-\\uDFE0]|\\uD87E[\\uDC00-\\uDE1D]|\\uD884[\\uDC00-\\uDF4A\\uDF50-\\uDFFF]|\\uD888[\\uDC00-\\uDFAF]))![\\t-\\r \\xA0\\u1680\\u2000-\\u200A\\u2028\\u2029\\u202F\\u205F\\u3000\\uFEFF]*(?=(?:[\\0-\\uD7FF\\uE000-\\uFFFF]|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]|[\\uD800-\\uDBFF](?![\\uDC00-\\uDFFF])|(?:[^\\uD800-\\uDBFF]|^)[\\uDC00-\\uDFFF])*)|(?<=(?:[\\0-\\t\\x0B\\f\\x0E-\\u2027\\u202A-\\uD7FF\\uE000-\\uFFFF]|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]|[\\uD800-\\uDBFF](?![\\uDC00-\\uDFFF])|(?:[^\\uD800-\\uDBFF]|^)[\\uDC00-\\uDFFF]))![\\t-\\r \\xA0\\u1680\\u2000-\\u200A\\u2028\\u2029\\u202F\\u205F\\u3000\\uFEFF]*(?=(?:[\\u2E80-\\u2E99\\u2E9B-\\u2EF3\\u2F00-\\u2FD5\\u3005\\u3007\\u3021-\\u3029\\u3038-\\u303B\\u3400-\\u4DBF\\u4E00-\\u9FFF\\uF900-\\uFA6D\\uFA70-\\uFAD9]|\\uD81B[\\uDFE2\\uDFE3\\uDFF0\\uDFF1]|[\\uD840-\\uD868\\uD86A-\\uD86C\\uD86F-\\uD872\\uD874-\\uD879\\uD880-\\uD883\\uD885-\\uD887][\\uDC00-\\uDFFF]|\\uD869[\\uDC00-\\uDEDF\\uDF00-\\uDFFF]|\\uD86D[\\uDC00-\\uDF39\\uDF40-\\uDFFF]|\\uD86E[\\uDC00-\\uDC1D\\uDC20-\\uDFFF]|\\uD873[\\uDC00-\\uDEA1\\uDEB0-\\uDFFF]|\\uD87A[\\uDC00-\\uDFE0]|\\uD87E[\\uDC00-\\uDE1D]|\\uD884[\\uDC00-\\uDF4A\\uDF50-\\uDFFF]|\\uD888[\\uDC00-\\uDFAF]))","g"),"\uFF01")}):D}function Su(n,D){return n?D.map(function(u){return u==null?void 0:u.replaceAll(new RegExp("(?<=(?:[\\u2E80-\\u2E99\\u2E9B-\\u2EF3\\u2F00-\\u2FD5\\u3005\\u3007\\u3021-\\u3029\\u3038-\\u303B\\u3400-\\u4DBF\\u4E00-\\u9FFF\\uF900-\\uFA6D\\uFA70-\\uFAD9]|\\uD81B[\\uDFE2\\uDFE3\\uDFF0\\uDFF1]|[\\uD840-\\uD868\\uD86A-\\uD86C\\uD86F-\\uD872\\uD874-\\uD879\\uD880-\\uD883\\uD885-\\uD887][\\uDC00-\\uDFFF]|\\uD869[\\uDC00-\\uDEDF\\uDF00-\\uDFFF]|\\uD86D[\\uDC00-\\uDF39\\uDF40-\\uDFFF]|\\uD86E[\\uDC00-\\uDC1D\\uDC20-\\uDFFF]|\\uD873[\\uDC00-\\uDEA1\\uDEB0-\\uDFFF]|\\uD87A[\\uDC00-\\uDFE0]|\\uD87E[\\uDC00-\\uDE1D]|\\uD884[\\uDC00-\\uDF4A\\uDF50-\\uDFFF]|\\uD888[\\uDC00-\\uDFAF]));[\\t-\\r \\xA0\\u1680\\u2000-\\u200A\\u2028\\u2029\\u202F\\u205F\\u3000\\uFEFF]*(?=(?:[\\0-\\uD7FF\\uE000-\\uFFFF]|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]|[\\uD800-\\uDBFF](?![\\uDC00-\\uDFFF])|(?:[^\\uD800-\\uDBFF]|^)[\\uDC00-\\uDFFF])*)|(?<=(?:[\\0-\\t\\x0B\\f\\x0E-\\u2027\\u202A-\\uD7FF\\uE000-\\uFFFF]|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]|[\\uD800-\\uDBFF](?![\\uDC00-\\uDFFF])|(?:[^\\uD800-\\uDBFF]|^)[\\uDC00-\\uDFFF]));[\\t-\\r \\xA0\\u1680\\u2000-\\u200A\\u2028\\u2029\\u202F\\u205F\\u3000\\uFEFF]*(?=(?:[\\u2E80-\\u2E99\\u2E9B-\\u2EF3\\u2F00-\\u2FD5\\u3005\\u3007\\u3021-\\u3029\\u3038-\\u303B\\u3400-\\u4DBF\\u4E00-\\u9FFF\\uF900-\\uFA6D\\uFA70-\\uFAD9]|\\uD81B[\\uDFE2\\uDFE3\\uDFF0\\uDFF1]|[\\uD840-\\uD868\\uD86A-\\uD86C\\uD86F-\\uD872\\uD874-\\uD879\\uD880-\\uD883\\uD885-\\uD887][\\uDC00-\\uDFFF]|\\uD869[\\uDC00-\\uDEDF\\uDF00-\\uDFFF]|\\uD86D[\\uDC00-\\uDF39\\uDF40-\\uDFFF]|\\uD86E[\\uDC00-\\uDC1D\\uDC20-\\uDFFF]|\\uD873[\\uDC00-\\uDEA1\\uDEB0-\\uDFFF]|\\uD87A[\\uDC00-\\uDFE0]|\\uD87E[\\uDC00-\\uDE1D]|\\uD884[\\uDC00-\\uDF4A\\uDF50-\\uDFFF]|\\uD888[\\uDC00-\\uDFAF]))","g"),"\uFF1B")}):D}function gu(n,D){return n?D.map(function(u){return u==null?void 0:u.replaceAll(/\.{3,}/g,"\u2026\u2026")}):D}function mu(n,D){return n?D.map(function(u){return u==null?void 0:u.replaceAll(/-(-*\s*)*-|~(~*\s*)*~|～(～*\s*)*～|－(－*\s*)*－|`{2,}/g,"\u2014\u2014")}):D}function xu(n,D){return n?D.map(function(u){return u==null?void 0:u.replaceAll(/。{2,}/g,"\u2026\u2026")}):D}function Iu(n,D){return n?D.map(function(u){return u==null?void 0:u.replaceAll(/，{2,}/g,"\uFF0C")}):D}function yu(n,D){return n?D.map(function(u){return u==null?void 0:u.replaceAll(/…{3,}/g,"\u2026\u2026")}):D}function Pu(n,D){return n?D.map(function(u){var F,E;return u=(F=u)===null||F===void 0?void 0:F.replaceAll(/<<|\xAB/g,"\u300A"),(E=u)===null||E===void 0?void 0:E.replaceAll(/>>|»/g,"\u300B")}):D}function Tu(n,D){return n?D.map(function(u){return u==null?void 0:u.replaceAll(/\(((?:[\0-'\*-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*(?:[\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u3005\u3007\u3021-\u3029\u3038-\u303B\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFA6D\uFA70-\uFAD9]|\uD81B[\uDFE2\uDFE3\uDFF0\uDFF1]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF])+(?:[\0-'\*-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*)\)/g,"\uFF08$1\uFF09")}):D}function Nu(n,D){return n?D.map(function(u){return u==null?void 0:u.replaceAll(new RegExp("(?<=%)(?=(?:[\\u2E80-\\u2E99\\u2E9B-\\u2EF3\\u2F00-\\u2FD5\\u3005\\u3007\\u3021-\\u3029\\u3038-\\u303B\\u3400-\\u4DBF\\u4E00-\\u9FFF\\uF900-\\uFA6D\\uFA70-\\uFAD9]|\\uD81B[\\uDFE2\\uDFE3\\uDFF0\\uDFF1]|[\\uD840-\\uD868\\uD86A-\\uD86C\\uD86F-\\uD872\\uD874-\\uD879\\uD880-\\uD883\\uD885-\\uD887][\\uDC00-\\uDFFF]|\\uD869[\\uDC00-\\uDEDF\\uDF00-\\uDFFF]|\\uD86D[\\uDC00-\\uDF39\\uDF40-\\uDFFF]|\\uD86E[\\uDC00-\\uDC1D\\uDC20-\\uDFFF]|\\uD873[\\uDC00-\\uDEA1\\uDEB0-\\uDFFF]|\\uD87A[\\uDC00-\\uDFE0]|\\uD87E[\\uDC00-\\uDE1D]|\\uD884[\\uDC00-\\uDF4A\\uDF50-\\uDFFF]|\\uD888[\\uDC00-\\uDFAF]))","g")," ")}):D}var Ou=function(){function n(D){iu()(this,n),hu()(this,"paragraphs",[]),this.paragraphs=D.split(`
`).map(function(u){return u.trim()||null})}return Au()(n,[{key:"deleteBlankLines",value:function(u){return u&&(this.paragraphs=this.paragraphs.filter(function(F){return F!==null})),this}},{key:"insertIndent",value:function(u){return u&&(this.paragraphs=this.paragraphs.map(function(F){return F==null?void 0:F.replace(/^/,"\u3000\u3000")})),this}},{key:"deleteSpaceInChineseCharacter",value:function(u){return u&&(this.paragraphs=this.paragraphs.map(function(F){return F==null?void 0:F.replaceAll(new RegExp("(?<=(?:[\\u2E80-\\u2E99\\u2E9B-\\u2EF3\\u2F00-\\u2FD5\\u3005\\u3007\\u3021-\\u3029\\u3038-\\u303B\\u3400-\\u4DBF\\u4E00-\\u9FFF\\uF900-\\uFA6D\\uFA70-\\uFAD9]|\\uD81B[\\uDFE2\\uDFE3\\uDFF0\\uDFF1]|[\\uD840-\\uD868\\uD86A-\\uD86C\\uD86F-\\uD872\\uD874-\\uD879\\uD880-\\uD883\\uD885-\\uD887][\\uDC00-\\uDFFF]|\\uD869[\\uDC00-\\uDEDF\\uDF00-\\uDFFF]|\\uD86D[\\uDC00-\\uDF39\\uDF40-\\uDFFF]|\\uD86E[\\uDC00-\\uDC1D\\uDC20-\\uDFFF]|\\uD873[\\uDC00-\\uDEA1\\uDEB0-\\uDFFF]|\\uD87A[\\uDC00-\\uDFE0]|\\uD87E[\\uDC00-\\uDE1D]|\\uD884[\\uDC00-\\uDF4A\\uDF50-\\uDFFF]|\\uD888[\\uDC00-\\uDFAF]))[\\t-\\r \\xA0\\u1680\\u2000-\\u200A\\u2028\\u2029\\u202F\\u205F\\u3000\\uFEFF]+(?=(?:[\\u2E80-\\u2E99\\u2E9B-\\u2EF3\\u2F00-\\u2FD5\\u3005\\u3007\\u3021-\\u3029\\u3038-\\u303B\\u3400-\\u4DBF\\u4E00-\\u9FFF\\uF900-\\uFA6D\\uFA70-\\uFAD9]|\\uD81B[\\uDFE2\\uDFE3\\uDFF0\\uDFF1]|[\\uD840-\\uD868\\uD86A-\\uD86C\\uD86F-\\uD872\\uD874-\\uD879\\uD880-\\uD883\\uD885-\\uD887][\\uDC00-\\uDFFF]|\\uD869[\\uDC00-\\uDEDF\\uDF00-\\uDFFF]|\\uD86D[\\uDC00-\\uDF39\\uDF40-\\uDFFF]|\\uD86E[\\uDC00-\\uDC1D\\uDC20-\\uDFFF]|\\uD873[\\uDC00-\\uDEA1\\uDEB0-\\uDFFF]|\\uD87A[\\uDC00-\\uDFE0]|\\uD87E[\\uDC00-\\uDE1D]|\\uD884[\\uDC00-\\uDF4A\\uDF50-\\uDFFF]|\\uD888[\\uDC00-\\uDFAF]))","g"),"")})),this}},{key:"deleteSpaceBetweenChineseCharactersAndChinesePunctuations",value:function(u){return u&&(this.paragraphs=this.paragraphs.map(function(F){return F==null?void 0:F.replaceAll(new RegExp("(?<=(?:[\\u2E80-\\u2E99\\u2E9B-\\u2EF3\\u2F00-\\u2FD5\\u3005\\u3007\\u3021-\\u3029\\u3038-\\u303B\\u3400-\\u4DBF\\u4E00-\\u9FFF\\uF900-\\uFA6D\\uFA70-\\uFAD9]|\\uD81B[\\uDFE2\\uDFE3\\uDFF0\\uDFF1]|[\\uD840-\\uD868\\uD86A-\\uD86C\\uD86F-\\uD872\\uD874-\\uD879\\uD880-\\uD883\\uD885-\\uD887][\\uDC00-\\uDFFF]|\\uD869[\\uDC00-\\uDEDF\\uDF00-\\uDFFF]|\\uD86D[\\uDC00-\\uDF39\\uDF40-\\uDFFF]|\\uD86E[\\uDC00-\\uDC1D\\uDC20-\\uDFFF]|\\uD873[\\uDC00-\\uDEA1\\uDEB0-\\uDFFF]|\\uD87A[\\uDC00-\\uDFE0]|\\uD87E[\\uDC00-\\uDE1D]|\\uD884[\\uDC00-\\uDF4A\\uDF50-\\uDFFF]|\\uD888[\\uDC00-\\uDFAF]))[\\t-\\r \\xA0\\u1680\\u2000-\\u200A\\u2028\\u2029\\u202F\\u205F\\u3000\\uFEFF]+(?=[~\\xB7\\u2018\\u2019\\u201C\\u201D\\u2026\\u3001\\u3002\\u300A\\u300B\\u3010\\u3011\\uFF01\\uFF08\\uFF09\\uFF0C\\uFF1A\\uFF1B\\uFF1F\\uFF5E\\uFFE5])|(?<=[~\\xB7\\u2018\\u2019\\u201C\\u201D\\u2026\\u3001\\u3002\\u300A\\u300B\\u3010\\u3011\\uFF01\\uFF08\\uFF09\\uFF0C\\uFF1A\\uFF1B\\uFF1F\\uFF5E\\uFFE5])[\\t-\\r \\xA0\\u1680\\u2000-\\u200A\\u2028\\u2029\\u202F\\u205F\\u3000\\uFEFF]+(?=(?:[\\u2E80-\\u2E99\\u2E9B-\\u2EF3\\u2F00-\\u2FD5\\u3005\\u3007\\u3021-\\u3029\\u3038-\\u303B\\u3400-\\u4DBF\\u4E00-\\u9FFF\\uF900-\\uFA6D\\uFA70-\\uFAD9]|\\uD81B[\\uDFE2\\uDFE3\\uDFF0\\uDFF1]|[\\uD840-\\uD868\\uD86A-\\uD86C\\uD86F-\\uD872\\uD874-\\uD879\\uD880-\\uD883\\uD885-\\uD887][\\uDC00-\\uDFFF]|\\uD869[\\uDC00-\\uDEDF\\uDF00-\\uDFFF]|\\uD86D[\\uDC00-\\uDF39\\uDF40-\\uDFFF]|\\uD86E[\\uDC00-\\uDC1D\\uDC20-\\uDFFF]|\\uD873[\\uDC00-\\uDEA1\\uDEB0-\\uDFFF]|\\uD87A[\\uDC00-\\uDFE0]|\\uD87E[\\uDC00-\\uDE1D]|\\uD884[\\uDC00-\\uDF4A\\uDF50-\\uDFFF]|\\uD888[\\uDC00-\\uDFAF]))","g"),"")})),this}},{key:"insertSpaceInChineseAndEnglish",value:function(u){return u&&(this.paragraphs=this.paragraphs.map(function(F){return F==null?void 0:F.replaceAll(new RegExp("(?<=(?:[\\u2E80-\\u2E99\\u2E9B-\\u2EF3\\u2F00-\\u2FD5\\u3005\\u3007\\u3021-\\u3029\\u3038-\\u303B\\u3400-\\u4DBF\\u4E00-\\u9FFF\\uF900-\\uFA6D\\uFA70-\\uFAD9]|\\uD81B[\\uDFE2\\uDFE3\\uDFF0\\uDFF1]|[\\uD840-\\uD868\\uD86A-\\uD86C\\uD86F-\\uD872\\uD874-\\uD879\\uD880-\\uD883\\uD885-\\uD887][\\uDC00-\\uDFFF]|\\uD869[\\uDC00-\\uDEDF\\uDF00-\\uDFFF]|\\uD86D[\\uDC00-\\uDF39\\uDF40-\\uDFFF]|\\uD86E[\\uDC00-\\uDC1D\\uDC20-\\uDFFF]|\\uD873[\\uDC00-\\uDEA1\\uDEB0-\\uDFFF]|\\uD87A[\\uDC00-\\uDFE0]|\\uD87E[\\uDC00-\\uDE1D]|\\uD884[\\uDC00-\\uDF4A\\uDF50-\\uDFFF]|\\uD888[\\uDC00-\\uDFAF]))(?=[0-9A-Z_a-z])|(?<=[0-9A-Z_a-z])(?=(?:[\\u2E80-\\u2E99\\u2E9B-\\u2EF3\\u2F00-\\u2FD5\\u3005\\u3007\\u3021-\\u3029\\u3038-\\u303B\\u3400-\\u4DBF\\u4E00-\\u9FFF\\uF900-\\uFA6D\\uFA70-\\uFAD9]|\\uD81B[\\uDFE2\\uDFE3\\uDFF0\\uDFF1]|[\\uD840-\\uD868\\uD86A-\\uD86C\\uD86F-\\uD872\\uD874-\\uD879\\uD880-\\uD883\\uD885-\\uD887][\\uDC00-\\uDFFF]|\\uD869[\\uDC00-\\uDEDF\\uDF00-\\uDFFF]|\\uD86D[\\uDC00-\\uDF39\\uDF40-\\uDFFF]|\\uD86E[\\uDC00-\\uDC1D\\uDC20-\\uDFFF]|\\uD873[\\uDC00-\\uDEA1\\uDEB0-\\uDFFF]|\\uD87A[\\uDC00-\\uDFE0]|\\uD87E[\\uDC00-\\uDE1D]|\\uD884[\\uDC00-\\uDF4A\\uDF50-\\uDFFF]|\\uD888[\\uDC00-\\uDFAF]))","g")," ")})),this}},{key:"fixPunctuation",value:function(u){if(u){var F=this.paragraphs;F=du(e.comma,F),F=gu(e.dots2ellipsis,F),F=Bu(e.dot,F),F=vu(e.colon,F),F=fu(e.questionMark,F),F=pu(e.bang,F),F=Su(e.semicolon,F),F=Pu(e.guillemet,F),F=mu(e.chineseDash,F),F=Iu(e.chineseCommasFold,F),F=xu(e.chineseDotsFold,F),F=yu(e.chineseEllipsisesFold,F),F=Tu(e.englishBrackets2ChineseBrackets,F),this.paragraphs=F}return this}},{key:"fixOthers",value:function(u){if(u){var F=this.paragraphs;F=Nu(e.insertSpaceAfterPercentSign,F),this.paragraphs=F}return this}},{key:"insertLineGap",value:function(u){if(u!==0){var F=this.paragraphs;this.paragraphs=F.flatMap(function(E,p){return p===F.length-1?E:[E].concat(Cu()(new Array(u===1?1:2).fill("")))})}return this}},{key:"done",value:function(){return this.paragraphs.join(`
`)}}]),n}(),Lu=function(D,u){var F=new Ou(D);return F.deleteBlankLines(u.deleteBlankLines).deleteSpaceBetweenChineseCharactersAndChinesePunctuations(u.deleteSpaceBetweenChineseCharactersAndChinesePunctuations).deleteSpaceInChineseCharacter(u.deleteSpaceInChineseCharacter).insertIndent(u.insertIndent).fixPunctuation(u.fixPunctuation).insertSpaceInChineseAndEnglish(u.insertSpaceInChineseAndEnglish).insertLineGap(u.lineGap).fixOthers(u.fixOthers),F.done()},ju=t(74310),Zu=o.Z.Header,Mu=o.Z.Footer,_u=o.Z.Content,Ru=function(){var D=(0,i.useState)(""),u=s()(D,2),F=u[0],E=u[1],p=(0,i.useState)(""),P=s()(p,2),k=P[0],Y=P[1],S=(0,i.useState)(!1),r=s()(S,2),q=r[0],Hu=r[1],bu=(0,i.useState)(!1),uu=s()(bu,2),Xu=uu[0],Du=uu[1],Ku=function(w){E(w),Du(!1)},Uu=function(){var w=JSON.parse(localStorage.getItem("pure-text-config")||"");Y(Lu(F,w)),Du(!0)};return(0,a.jsxs)(o.Z,{children:[(0,a.jsx)(Zu,{className:C.headerStyle}),(0,a.jsxs)(_u,{className:C.contentStyle,children:[(0,a.jsxs)(N.Z,{gutter:{xs:8,sm:16,md:24,lg:32},children:[(0,a.jsx)(m.Z,{span:18,children:(0,a.jsx)(O.Z,{onChange:function(){return Hu(!q)},className:C.collapse,items:[{key:"1",label:(q?"\u6536\u8D77":"\u663E\u793A")+"\u8BBE\u7F6E",children:(0,a.jsx)(lu,{})}]})}),(0,a.jsx)(m.Z,{span:6,className:C.handleBotton,children:(0,a.jsx)(V.ZP,{type:"primary",size:"large",onClick:Uu,children:"\u7ACB\u5373\u6392\u7248"})})]}),(0,a.jsx)(x.In,{typesetted:k,isProcessed:Xu,onChange:Ku})]}),(0,a.jsx)(Mu,{className:C.footerStyle,children:(0,a.jsx)(ju.Z,{href:"https://github.com/TinySnow/Typeseter",children:"Github"})})]})},Gu=Ru}}]);
