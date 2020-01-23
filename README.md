# GraphQL-Pratices

> 准备用来重构自己的 API

## TODO

- [ ] 一个基于 GraphQL 的 Web App
- [ ] 重构自用API，支持 RESTFul 与 GraphQL

## 介绍

- REST API：Representational State Transfer，表属性状态转移，定义 uri，通过 api 接口取得/变动资源
- GraphQL 是 REST API 的替代品，既是一种用于查询 API 的语言，也是一个用于满足数据查询的运行时，它对 API 中的数据提供了一套易于理解的完整描述，使发起请求的客户端能够准确而没有冗余的获得它需要的数据
- 请求需要的数据不多不少，获取多个资源只需要一个请求（而不是先发起一个请求得到需要信息后再用来发起下一个请求），提供能够描述所有可能类型的系统，便于维护、根据需求平滑推进，添加/隐藏字段
- RESTFul 使用不同的 url 区分资源，而 GraphQL 使用类型区分资源

## 简单使用

### 基本类型

- String
- Int
- Float
- Boolean
- ID
- 数组，如[String]即为由字符串组成的数组

### 参数传递

在小括号内定义形参，参数同样需要定义类型，`!` 表示参数不能为空

### 待完善整理