## 前端部分（FrontEnd）

前端部分使用gulp搭建的工作流进行开发，默认项目gulp的功能有：sass编译、图片压缩、css压缩、自动添加CSS3前缀、自动刷新浏览器、js压缩、雪碧图合成。当然可以通过修改gulpfile.js进行功能的拓展

### 前端部分目录结构如下
```
└───dist
      └───css
      └───img
      └───js
      └───**.html
└───node_modules 
└───src
      └───html
      └───img
            └───sprites
                  └───icon
                        └───*.png
            └───*.png
      └───js
      └───sass
            └───base
            └───components
            └───helpers
                  └───_mixin.scss
                  └───_variables.scss
                  └───_lib.scss
            └───layout
            └───pages
            └───responsive
            └───themes
            └───main.scss
└───gulpfile.js
└───package.json
└───README.md
└───.gitignore
```

### 文件目录功能

dist文件夹为输出文件夹，src文件夹为开发文件夹，所有的src文件夹都会经过处理输出到dist文件夹，因此src为需要关注的文件夹，src文件夹下各个文件夹的功能如下：

html：存放HTML文件，具体开发请看下文

img：img文件下除去sprites下的文件，都将经过压缩输出到dist文件夹下的img文件夹下，而sprites文件夹中的文件将用于合成雪碧图，其中以一个文件夹合成一个雪碧图后输出到dist下的img文件夹，合成的雪碧图以文件夹名字命名，如上文中将合成名为icon.png的雪碧图

js：js下的js文件将经过压缩混淆输出到dist下的js文件夹下

sass：存放sass文件，sass文件将通过编译、添加私有前缀、压缩处理后输出到dist下的css文件夹，其中main.scss为主文件，因此输出文件夹也只有一个main.css文件。

### HTML模块化开发

在一个网站项目中，一个网站存在大量重复的HTML代码，多个页面却不得不复制粘贴这些公共代码，当这些公共部分的代码修改之后又不得不在重复以上工作，在多人协同开发中这个问题更加明显，如果沟通不畅，更将导致更加严重的问题。

在本工作流中，就是利用模块化开发思想来解决这个痛点。

html文件夹结构可以如下，其中将所有的公共组件部分分解，置于不同的文件夹中，同级文件为需要输出到dist文件夹中的html文件，也就是开发中的各个页面

<p align="center">
    <img src="http://ce.sysu.edu.cn/hope/UploadFiles/Image/201704/63626605625166211446231.png"/> 
</p>

开发中组件分解的形式最简单的就是将footer、header、nav、aside部分分离，这些部分是几乎所有页面都会用到的，如public文件夹目录结构如下：

<p align="center">
    <img src="http://ce.sysu.edu.cn/hope/UploadFiles/Image/201704/63626605879961458942273.png"/> 
</p>

将页面组件化分解后，我们在页面中只需要引入这个组件即可，如其中一个页面代码为：
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>厚朴工作室图书设备管理系统</title>
    <!--=include public/head.html-->
</head>
<body>
<!--=include public/header.html-->
<!--=include public/banner.html-->
<section>
    <div class="container floatfix">
        <!--=include public/aside.html-->
        <section>
            <!--=include public/nav.html-->
            <!--=include admin/add-book.html-->
        </section>
    </div>
</section>
<!--=include public/footer.html-->
</body>
</html>
```
经过工作流的处理后，在dist文件夹中代码将会组装起来。

### CSS的模块化开发

一个网站项目CSS代码量庞大，协同开发过程中常常出现不必要的重复代码，导致效率低下，在网站项目维护过程中，开发人员常常面对几千行的CSS代码无从下手，开发人员面临着修改这段代码是否会影响其他页面的效果、增加代码又会是代码变得更加臃肿的两难选择，绝大多数开发者选择后一种方法，于是如同滚雪球般，CSS代码变得越来越臃肿、越来越难以维护。通过划分组件和功能的形式可以更好地避免这种情况产生。

在sass文件夹下各个文件夹的功能如下：

base：存放网站的基础样式，常常是reset部分

omponents：存放网站划分的各个组件的样式

helpers：存放网站的样式帮助文件

layout：存放基础布局的样式

pages：存放单个页面不同的样式

responsive：存放响应式样式

themes：网站主题样式，这在存在多套皮肤的网站有很大帮助

main.scss：主文件

其中需要说明的是helpers文件夹主要有项目中使用的变量、mixin方法、自己编写的小型UI库。

其中引入变量的原因在于可以保持风格的一致以及修改样式更为简单，常用来储存的变量有网站的背景颜色、网站的宽高、网站的字体、某一部分的边距等。

mixin方法更像是一个团队或者个人的开发资产，在这里存放组织好的方法，这样在书写样式时只需要引入方法即可做到，这样的好处在于简化了CSS代码，同时开发者们不需要为了一个垂直居中这样的问题而去网上Google而浪费时间，因为这些方法都可以在这里预先积累好，这常常可以成为一个团队开发积累资产的文件。


为了更好的适应这个开发模式，同时需要一个开发规范，了解代码规范请点击[这里](./code.md)。

同时需要了解一个使用这套规范完成的完整的项目，请点击[这里](https://github.com/huruji/HopeLibrarySystemUE)