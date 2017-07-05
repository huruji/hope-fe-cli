为最大限度解决协同合作过程中的命名冲突、方便理解上下文、提高代码可读性、提高工作交接效率，厚朴网站项目HTML、CSS部分请遵从以下规范：

## 格式规范

1.id和class命名连接采用短划线"-"，不要使用下划线，javascript中使用的id和class命名前一律以"js-"为前缀

2.短划线"-"后紧跟命名小写，代表直接父子关系，这将在开发中直接看出父子关系
```html
<div class="header">
        <div class="header-right">
             <!-- JavaScript使用的id -->
            <span id="js-header-right-btn"></span>
        </div>
        <div class="header-left">
            <ul class="header-left-list">
                <li class="header-left-list-item"></li>
                <li class="header-left-list-item"></li>
                <li class="header-left-list-item"></li>
            </ul>
        </div>
    </div>
```
## HTML标签规范

1.所有标签都应该闭合，即使是单标签

2.所有标签使用小写

3.属性值必须使用双引号，不要使用单引号

4.对于布尔类型的属性，如果不需要则不添加属性值

5.a标签必须添加title属性

6.img标签必须添加alt属性

## CSS书写规范

1.有简写属性使用简写属性
```css
/* bad */
 .class{
   background-image: url("../img/bg.png");
   background-size: 100%;
   background-repeat: no-repeat;
 }
 
 /* good */
 .class{
   background: url("../img/bg.png") 100% no-repeat;
 }
 ```
2.颜色值有简写使用简写，且不允许出现rgb()以及orange等命名色值，请使用十六进制
```css
/* bad */
.class{
    color: #333333;
}
 
/* good */
.class{
    color: #333;
}
```
3.属性后必须以分号结尾

4.值为0时省略单位

5.除非清除CMS编辑器内置的样式，否则严禁使用!important

6.class的命名需要通过短划线-连接来表示父子级的关系，如.header、.header-logo、.header-right，因为在sass中可以通过&来代替父级选择器，因此这并不会增加开发负担，但是却可以使层级关系显而易见，如在sass开发中可以如下：
```
.banner{
  @include bg-center("../img/banner.png");
 
  &-avatar{
    @include float-left;
    width:90px;
  }
  &-word{
    h2{
      font-size:24px;
    }
    p{
      font-size:16px;
    }
  }
}
```

## CSS书写顺序

1.reset部分

2.项目公共模块（页面框架、重用块）

3.页面从上到下、按照首页、栏目页、内容页顺序书写

4.响应式媒体查询，由大屏逐渐向小屏适配（顺序同上）