# less

## 1、什么是Less？

​	less官网：Less is More , Than CSS -少即是多，比CSS

​	官网gitbug：https://github.com/less/less.js

### 1.1 Less介绍

less是一门css预处理语言，或是一种动态样式语言。扩展了css语言，增加了变量、继承、嵌套、运算、函数等特性，使css更易维护和扩展。（类似jquery）

less既可以在浏览器端上运行（支持IE7+、chrome、ff等主流浏览器，不支持iPad `待测试`），也可以在Node服务器端运行。

例如：

```less
@base: #f938ab;
@width:200px;
.box-shadow(@style, @c) when (iscolor(@c)) {
	width:@width;
	height:@width;
	margin-top:20px;
  -webkit-box-shadow: @style @c;
  box-shadow:         @style @c;
}
.box-shadow(@style, @alpha: 50%) when (isnumber(@alpha)) {
  .box-shadow(@style, rgba(0, 0, 0, @alpha));
}
.box {
  color: saturate(@base, 5%);
  border-color: lighten(@base, 30%);
  .div1 { .box-shadow(0 0 5px, 30%) }
  .div2{
  	.box-shadow(5px 5px 5px 5px,@base);
  }
}
```

解析：

```css
.box {
  color: #fe33ac;
  border-color: #fdcdea;
}
.box .div1 {
  width: 200px;
  height: 200px;
  background-color: red;
  color: #fff;
  margin-top: 20px;
  -webkit-box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
}
.box .div2 {
  width: 200px;
  height: 200px;
  background-color: red;
  color: #fff;
  margin-top: 20px;
  -webkit-box-shadow: 5px 5px 5px 5px #f938ab;
  box-shadow: 5px 5px 5px 5px #f938ab;
}
```

现在流行的css预编译语言：Less和Sass

### 1.2 Less的优点

- 简单，易于维护，CSS管理更加容易


- 高效的进行开发


- 使用Less实现配色将变得非常容易。


- 与CSS能够很好地融合使用。


- 同时兼容CSS3

## 2、如何调用less

### 2.1 Less调用方法

- 运用GUI工具运用工具koala或者SimpLess是来自动解析成.css文件（已给大家讲过，这里不在重复）


- 引用less.js进行解析，在页面引入less.js对.less文件进行解析。
- less官网在线解析：http://less2css.org
- 运用node来解析成css
- 利用gulp等自动化工具进行解析`研究中`

### 2.2 GUI工具Koala

- Source Map：编译过程中生成 css 对应的 map 文件。调试时使用，有了source map，浏览器里直接显示less，非常方便


- Line Comments：保留注释，勾选后编译中在注释上一行添加一条空行。


- Autoprefix：自动给 CSS3 元素加上浏览器前缀。

  参考：[知乎](http://www.zhihu.com/question/26075208)

### 2.3 服务器端解析： less.js解析

- 第一步，引入styls.less，注意` rel=“stylesheet/less” ` 

  1、内联样式：

  ```html
  <style type="text/less">
    // less 代码
  </style>
  ```


​	2、外联样式

```html
  <link rel="stylesheet/less"  href="styles.less" />
```


- 第二步，参数配置（可省略）`具体意思待研究`

  ```html
  <!-- 在引入less.js之前配置参数项 -->
  <script>
    less = {
      env: "development",
      logLevel: 2,
      async: false,
      fileAsync: false,
      poll: 1000,
      functions: {},
      dumpLineNumbers: "comments",
      relativeUrls: false,
      rootpath: ":/a.com/"
    };
  </script>
  ```

| 参数              | 类型      | 默认值       | 参数                                       | 说明                                       |
| :-------------- | :------ | :-------- | ---------------------------------------- | :--------------------------------------- |
| evn             | String  | 取决于页面的URL |                                          | 可以在development或是production环境下运行。         |
| logLevel        | Number  | 2         | 2 - 提示信息（Information）和错误（errors）1 - 错误（Errors）0 - 空（Nothing） | javascript控制台日志量（错误等级）。注意：在production环境下，获取不到日志。 |
| async           | Boolean | false     | false\|true                              | 是否异步导入文件                                 |
| fileAsync       | Boolean | false     | false                                    | 使用文件协议访问页面时异步加载导入的文件。                    |
| poll            | Integer | 1000      |                                          | 在监视模式下，每两次请求之间的时间间隔（ms）。                 |
| functions       | Object  | 空         |                                          | 在functions这个对象中，key作为函数的名字。              |
| dumpLineNumbers | String  | 空         | comment\|mediaQuery\|all                 | 当设置dumpLineNumbers直接输出源行信息到编译好的CSSS的文件中时，有利于你调试指定行。 |
| relativeUrls    | Boolean | false     |                                          | 是否调整相对路径。如果为false，则url已经是相对于入口的LESS文件。   |
| rootpath        | String  | false     |                                          | 添加到每个URL开始处的路径                           |

- 第三步，引入less.js，在此前加入.less文件。

  ```html
  <script src="less.js" type="text/javascript"></script>
  ```

- 第二步和第三步一起

  ```html
  <script src="less.js" data-poll="1000" data-relative-urls="false"></script>
  <link data-dump-line-numbers="all" data-global-vars='{ myvar: "#ddffee", mystr: "\"quoted\"" }' rel="stylesheet/less" type="text/css" href="less/styles.less">
  ```

- 注意：

  - 如果加载多个`.less`样式表文件，每个单独编译，一个文件中定义的任何变量都无法再其他文件中访问。不会存在变量重复问题。
  - 在服务器环境下使用，本地直接打开可能会报错！
  - Less兼容IE7+，如需兼容则需要先引入[es5-shim.js](https://github.com/es-shims/es5-shim)即可。
  - 其中还有一些高级配置，也可通过浏览器直接调试，具体见参考文档。
  - 不建议使用，增加服务器压力，不利于调试。

### 2.4 Node解析

- 先按照node.js

- 下载less的管理工具包

  ```node
  $ sudo npm install -g less
  ```


- 执行方法解析成css文件

  ```
  $ lesssc styles.less styles.css
  ```

- 解析成min.css文件，安装clean-css

  ```
  $ npm install clean-css
  ```

  ```
  $ lessc --clean-css styles.less styles.min.css
  ```

  [less命令行用法](http://www.lesscss.net/)

- node上安装即时编译的插件

  ```
  $ (sudo) npm install -g less-watch-compiler
  $ less-watch-compiler path_input path_out
  $ less-watch-compiler path_input path_out fileName.less
  ```

- 添加厂商前缀

  ```
  $(sudo) npm install -g less-plugin-autoprefix
  $ less inputFile.less outFile.less —autoprefix=“browsers”
  $ lessc test.less test.css --autoprefix="ie >= 8, last 3 versions, > 2%"
  ```

### 2.5 IDE 对应的插件

- SublimeText：[Less-sublime](https://github.com/danro/Less-sublime)、[Sublime-Less-to-CSS](https://github.com/timdouglas/sublime-less2css)、[Less-build-sublime](https://github.com/berfarah/Less-build-sublime)、[SublimeOnSaveBuild](https://github.com/alexnj/SublimeOnSaveBuild)


- Dreamweaver：[DMXzone Less CSS Compiler](http://www.dmxzone.com/go/21514/dmxzone-less-css-compiler-features-unveiled/)
- Notepad++ 6.x：[less.js语法高亮](https://sourceforge.net/projects/notepad-plus/#L)
- Brackets：内置支持 语法高亮，还有一些扩展[BracketLESS](https://github.com/adobe/brackets/wiki/Brackets-Extensions)

## 3、Less语法详解

### 3.1 注释

- `/** 可解析 **/`
- `//不可解析`  

### 3.2 变量

变量`@`来定义，允许单独定义一系列通用的样式，然后在需要的时候进行调用。

```less
//less                          
@cGray:#ccc; 
@cRed:red;
@width:80px;
@height:120px;
.div1{
  color:@cGray;
  border:1px solid @cGray;
  width:@width;
  height:@height;
}
.div2{
  color:@cRed;
  background:@cGray;
  width:@height;
  height:@width;
}
```

```css
 /*生成的css*/
.div1 {
  color: #cccccc;
  border: 1px solid #cccccc;
  width: 80px;
  height: 120px;
}
.div2 {
  color: #ff0000;
  background: #cccccc;
  width: 120px;
  height: 80px;
}
```

### 3.3 嵌套

在一个选择其中嵌套另一个选择器来实现继承，减少代码量，代码更清晰。代码优化考虑，最多嵌套三层。

有`&`时解析的是同一个元素或此元素的伪类，没有&解析是后代元素

```less
// LESS
#demo2 {
  h2 {
    font-size: 18px;
    font-weight: bold;
  }
  p { 
    font-size: 12px;
    color:#90bd39;
    a { text-decoration: none;
      &:hover { text-decoration: underline; }
    }
  }
}
```

```css
/* 生成的 CSS */
#demo2 h2 {
  font-size: 18px;
  font-weight: bold;
}
#demo2 p {
  font-size: 12px;
  color:#90bd39;
}
#demo2 p a {
  text-decoration: none;
}
#demo2 p a:hover {
  text-decoration: underline;
}
```

### 3.4 运算

运算提供了加减乘除操作，可以对任何数字、颜色、变量进行运算，可以实现属性值之间的复杂关系。和Javascript代码一样。

```less
//less
@basewidth: 100px;
@baseColor: #111;
@blue: #09c;
.div1 {
  color: @baseColor * 3;
  height: @basewidth;
  width: @basewidth * 2;
}
.div2 { 
  color: @baseColor + #003300;
  background-color: desaturate(@blue, 10%);
}
```

```css
/* 生成的 CSS */
.div1 {
  color: #333333;
  height: 100px;
  width: 200px;
}
.div2 { 
  color: #114411;
  background-color: #0a94c2;
}
```

运算有顺序，和平时的四则运算一样

```less
@var: 20px;
.div3 {
  width: @var + 5 * 2;
  height: (@var + 5 ) * 2;
}
```

```CSS
.div3 {
  width: 30px;
  height: 50px;
}
```

### 3.5 颜色函数

- 色轮，spin(param1,param2)函数

  - 互补色，互补的颜色正好在色轮相反的位置

    ```less
    @colorBase:#3bafdA;
    @colorComplement:spin(@colorBase,180);//得到#dc6939
    ```

  - 三元色。我们可以进一步探讨颜色模型并且创建一个三元色结构。“三元”，顾名思义，是由三种颜色组成。因此，我们将色轮分成三部分，并且用函数spin()来设置旋转的度数：

    ```less
    @triadicSecondary:spin(@colorBase,-(360/3));//第二种颜色#b1d926
    @triadicTertiary:spin(@colorBase, 360/3);//第三种颜色#db43b2
    ```


- 混合色，mix(param1,param2)，对两个颜色进行混合

  ```less
  #div1{color:mix(red,yello)}//#ff800
  ```

- 明暗度，lighten(param1,param2)浅一点，darken(param1,param2)深一点

  ```less
  @ahover:lighten(@colorBase,10%);
  @afocus:darken(@colorBase,10%);
  ```


- 饱和度，saturate(param1,param2)和desaturate(param1,param2)。饱和度定义了一种颜色的深度。饱和度越大，颜色越亮丽，最低饱和度则会使颜色趋于灰色。

  ```less
  @btnHover:saturate(@colorBase,10%);
  @btnFocus:desaturate(@colorBase,10%);
  @btnDisable:lightness(desaturate(@colorBase,100%),30%;
  ```

- 智能色彩输出。LESS让我们的样式变得更智能。举例来说，我们能让我们的样式自己“思考”并决定什么颜色在什么条件下适用。假设我们正在创建一个网站模板，这是按钮的
  基本样式，你打算用不同的颜色和风格来扩展它。但是我们怎样控制颜色的输出呢？我们当然不希望深色的文字在深色的背景上，反之亦然。我们需要确保文本保留对比，以便于阅读，这样，contrast()函数就派上用场了。

  ```less
  @bColor:#000;
  div{
    background-color:@bColor;
    color:contrast(@bColor);//#ff
  }
  ```

### 3.6 继承

混合可以将一个定义好的class A轻松引入到另个class B里面，从而简单实现class B继承class A中的所有属性。还可以带参数调用，和函数一样。

有默认值,也可以不加默认值，或者是不加参数、多个参数都可行。

需要带括号，如果是没有变量的时候可不带括号。

例如：

```less
//less
.rounded-corners (@radius: 5px) {
  width:100px;
  height:30px;
  margin-bottom:10px;
  background-color: #ccc;
  color:#333;
  border-radius: @radius;
  -webkit-border-radius: @radius;
  -moz-border-radius: @radius;
}
.div1{
  .rounded-corners();//.rounded-corners;
}
.div2{
  .rounded-corners(10px);
} 
```

```css
/* 生成的 CSS */
.div1 {
  width: 100px;
  height: 30px;
  margin-bottom: 10px;
  background-color: #ccc;
  color: #333;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
}
.div2 {
  width: 100px;
  height: 30px;
  margin-bottom: 10px;
  background-color: #ccc;
  color: #333;
  border-radius: 10px;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
}
```

### 3.7 匹配模式

匹配模式，即使同一个函数用不同的参数时调用不同的方法。例如写一个三角：

```less
.triangleBase{
  width:0;
  height:0;
  overflow:hidden;
}
.triangle(top,@w:5px,@c:#ccc){
  .triangleBase;
  border-width:@w;
  border-color:@c transparent transparent transparent;
  border-style:solid dashed dashed dashed;
}
.triangle(bottom,@w:5px,@c:#ccc){
  .triangleBase;
  border-width:@w;
  border-color:transparent transparent @c transparent;
  border-style: dashed dashed solid dashed;
}
.div1{
  .triangle(top);
}
.div2{
  .triangle(bottom);
} 
```

另一种写法，`@_` 所有方法都调用：

```less
.triangle(@_){
  width:0;
  height:0;
  overflow:hidden;
}
.triangle(top,@w:5px,@c:#ccc){
  border-width:@w;
  border-color:@c transparent transparent transparent;
  border-style:solid dashed dashed dashed;
}
.triangle(bottom,@w:5px,@c:#ccc){
  border-width:@w;
  border-color:transparent transparent @c transparent;
  border-style: dashed dashed solid dashed;
}
.div1{
  .triangle(top);
}
.div2{
  .triangle(bottom);
} 
```

生成的css：

```css
.div1 {
  width: 0;
  height: 0;
  overflow: hidden;
  border-width: 5px;
  border-color: #cccccc transparent transparent transparent;
  border-style: solid dashed dashed dashed;
}
.div2 {
  width: 0;
  height: 0;
  overflow: hidden;
  border-width: 5px;
  border-color: transparent transparent #cccccc transparent;
  border-style: dashed dashed solid dashed;
}
```

### 3.8 其他

**@arguments变量**包含所有传递进来的参数。

```less
//@argumentts变量
.border(@w:30px,@c:red,@s:solid){
  border:@arguments;
}
.test_arguments{
  border();
}
```

**避免编译**，有时候需要输出一些不正确的css语法或者使用一些Less不认识的专有语法，在前面加入`~` 。

```less
.test{
  filter: ~"progid:DXImageTransform.Microsoft.Alpha(opacity=20)";
}
```

```css
.test{
  filter: progid:DXImageTransform.Microsoft.Alpha(opacity=20); 
}
```

**!important关键字**，会为所有混合所带来的样式，添加上!important

```less
.test{
  .border()!important;
}
```

**JavaScript 赋值**，在样式表中使用Javascript——相当精彩。你可以使用表达式，也可以参考环境方向来使用反单引号。

```less
@string: `'hello'.toUpperCase()`; /* @string 变成 'HELLO' */ 
   
/* 你也可以使用前面提到的插值： */ 
@string: 'HELLO';  
@var: ~`'@{string}'.topUpperCase()`; /* 变为 'HELLO' */ 
   
/* 获取文档的信息 */ 
@height = `document.body.clientHeight`;
```

**@import**，用@import导入css或者less文件，减少服务器资源请求

- less文件可以省略后缀名，同时可以在文件任意地方引入


- css文件需要加入后缀名

用@import时，Koala编译会让软件崩溃，用node吧！

### 3.9 总结

- 注释，可解析注释和不可解析的注释
- 变量用`@`定义，通过改变一个值改变多处样式
- 嵌套，符合dom结构
- 运算，加减乘除四则运算规律


- 继承，和js函数一样
- 匹配模式，类似函数参数
- @arguments 变量包含所有传递进来的参数、避免编译`~`、!important为所有样式加上!important
- color函数：`lighten(@color,10%)`，`darken(@color,10%)`
- 导入：`@import：'style'` less文件扩展名可选，`@import:'style.css'` 。减少服务器资源请求
- 字符串插入，字符串也可以用于变量中，然后通过`@{name}` 来调用


```less
@base_url : 'http://www.t1.chei.com.cn/common';  
background-image: url("@{base_url}/images/background.png"); 
```


## 4、Less和Sass的对比

### 相同点

- 两者都是css预编译
- 很多语法类似，思想一样

### 不同点

- Less环境以及使用方面比Sass简单
- 条件语句与控制，less不支持。Sass可以使用if { } else { } 条件语句，以及for { }循环。它甚至支持 and、 or和 not，以及 <、 >、 <=、 >= 和 == 等操作符。
- koala输出格式，LESS：normal（正常）、compress（压缩）。而Sass提供4中输出选项：nested（正常缩进）、expanded（括号不单独占一行）、 compact（一个类一行显示）和compressed （压缩为一行）。
- less基于纯JavaScript，通过服务器端来处理的；Sass是基于Ruby的，在服务器端处理。

### 总结

​	如果你是Ruby或HAML的粉丝，那么Sass会是你的好助手。对我来说，一个前端开发人员，我倾向于LESS，因为它便于引入和能够使用JavaScript的表达式以及文档属性。对于新手来说更简单可用。

​	对于刚接触的css预编译的前端，我推荐用Less

## 5、参考文档

- http://www.lesscss.net
- http://lesscss.cn/usage/
- http://less.bootcss.com/usage/
- http://www.lesscss.net/#using-less-in-the-browser-errorreporting
- [Less中文网](http://lesscss.cn/http://lesscss.cn/)
- [color颜色函数](http://www.wzsky.net/html/Website/Color/125373.html)
- [如何在浏览器中调试less & sass](http://www.cr173.com/html/20939_1.html)

