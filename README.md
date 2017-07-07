# hope-fe-cli
<p align="center">
    <img src="./doc/img/logo.png" alt="logo"/> 
</p>

## 为什么会有这个Cli工具

工作室目前在校生完成的项目中，由于人员流动性大，比较难按照一个统一的标准完成，虽然已经有很多的规范，而且在这些项目中，开发和维护的人员往往不是同一批人，这在维护上是增加了成本的。而开发人员更多的也是按照自己的标准在开发项目，设计人员的设计稿件上传到FTP之后，不熟悉的开发人员常常出现找一个文件找半天的情况。因此需要一个项目的统一标准、统一的文件目录去完成一个完整的项目。

而在工作室的开发模式中，更多的是基于Hope CMS进行前端开发，进而书写模板。现如今前端流行的React、Vue、Angular等解决方案几乎难以用于在工作室的实际项目中。

这个项目的完成同时也感谢[yangfch3](https://github.com/yangfch3)师兄在之前生物无机重点实验室项目中的指导以及代码规范方面的建议。

## 安装

```sh
npm install hope-fe-cli -g
```
或
```sh
yarn add hope-fe-cli -g
```

## 初始化一个项目

```
hope project [projectName]
```
这个命令将会创建一个名为projectName的文件夹，这个文件夹下的目录结构如下：

以上是创建一个完整的项目目录，包括前端人员、设计师的工作目录，也包括项目的文档和CMDB等工作目录。

为了方便前端人员在业余时间进行练习，同样可以只初始一个仅含有前端开发目录的项目，使用以下命令即可完成：
```
hope fe [projectName]
```

前端人员在项目文件夹下使用以下命令开启整个gulp工作流
```sh
npm run start
```
更多关于文件目录的使用以及前端开发，可以查看[文档](./doc/project.md)