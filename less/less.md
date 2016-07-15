# less

## 1、什么是Less？

less是一门css预处理语言，或是一种动态样式语言。扩展了css语言，增加了变量、继承、运算、函数等特性，使css更易维护和扩展。（类似jquery）

less既可以在浏览器端上运行（支持IE8+、chrome、ff等主流浏览器，不支持iPad `待测试`），也可以在Node服务器端运行。

例如：

```less
@base: #f938ab;
.box-shadow(@style, @c) when (iscolor(@c)) {
  -webkit-box-shadow: @style @c;
  box-shadow:         @style @c;
}
.box-shadow(@style, @alpha: 50%) when (isnumber(@alpha)) {
  .box-shadow(@style, rgba(0, 0, 0, @alpha));
}
.box {
  color: saturate(@base, 5%);
  border-color: lighten(@base, 30%);
  div { .box-shadow(0 0 5px, 30%) }
}
```

解析：

```css
.box {
  color: #fe33ac;
  border-color: #fdcdea;
}
.box div {
  -webkit-box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
}
```

less官网：Less is More , Than CSS -少即是多，比CSS

官网gitbug：https://github.com/less/less.js



## 2、如何调用

- 运用工具koala来自动解析成.css文件（已给大家讲过，这里不在重复）


- less官网在线解析：http://less2css.org
- 引用less.js进行解析，在页面引入less.js对.less文件进行解析。
- 运用node来解析成css

### 2.1 less.js解析

- 第一步，引入styls.less，注意` rel=“stylesheet/less” ` 

  ```html
  <link rel="stylesheet/less" type="text/css" href="styles.less" />

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

### 2.2 node解析

- 先按照node.js

- 下载less的管理工具包

  ```node
  $ sudo npm install -g less
  ```


- 执行方法解析成css文件

  ```
  $ lesssc styles.less styles.css
  ```

- 解析成min.css文件（`如何你想将编译后的 CSS 压缩掉，那么加一个 -x 参数就可以了` `待确定`）

  ```
  $ lessc --clean-css styles.less styles.min.css
  ```

  ​

## 3、Less语法详解

### 3.1 注释



### 3.2 变量



### 3.3 混合



### 3.4 匹配模式



### 3.5 运算



### 3.6 嵌套规则



### 3.7 @arguments变量



### 3.8 总结

