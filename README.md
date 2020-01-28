# GraphQL-Pratices

> 准备用来重构自己的 API

## TODO

- [ ] 一个基于 GraphQL 的 Web App
- [ ] 重构自用 API，支持 RESTFul 与 GraphQL

## 介绍

- REST API：Representational State Transfer，表属性状态转移，定义 uri，通过 api 接口取得/变动资源
- GraphQL 是 REST API 的替代品，既是一种用于查询 API 的语言，也是一个用于满足数据查询的运行时，它对 API 中的数据提供了一套易于理解的完整描述，使发起请求的客户端能够准确而没有冗余的获得它需要的数据
- 请求需要的数据不多不少，获取多个资源只需要一个请求（而不是先发起一个请求得到需要信息后再用来发起下一个请求），提供能够描述所有可能类型的系统，便于维护、根据需求平滑推进，添加/隐藏字段
- RESTFul 使用不同的 url 区分资源，而 GraphQL 使用类型区分资源

## 简单使用

### 类型系统

- GraphQLSchema
  用于创建一个 `schema`，服务器会根据它进行验证并查询，如：

  ```typescipt
  app.use(
    mount(
      "/demo",
      graphqlHTTP({
        schema: new GraphQLSchema({ query: RootQuery, mutation: Mutation });,
        graphiql: true
      })
    )
  );
  ```

- GraphQLScalarType,

- GraphQLObjectType,
  定义查询对象或是操作对象，包含`name` `description` `fields` 等字段

  ```typescript
  const RootQuery: GraphQLObjectType = new GraphQLObjectType({
    name: "root",
    description: "Root Query",
    fields: {
      user: {
        type: new GraphQLList(UserType),
        args: { gender: { type: GraphQLString } },
        // 定义处理器，在这里进行数据库查询等操作，决定返回给GraphQL查询的数据
        resolve: async (parentValue, { gender }) => {
          const res = await List.find({ gender: "male" });
          return res;
        }
      }
    }
  });
  ```

- GraphQLInterfaceType,
  接口类型，类似于 ts，但二者会冲突？

  ```typescript
  interface Character {
    id: ID!
    name: String!
    friends: [Character]
    appearsIn: [Episode]!
  }
  // 实现这个接口
  type Human implements Character {
    id: ID!
    name: String!
    friends: [Character]
    appearsIn: [Episode]!
    starships: [Starship]
    totalCredits: Int
  }
  ```

- GraphQLUnionType,
  联合类型，同样类似于 ts，但是其成员需要是具体的对象类型（`GraphQLObjectType`）

  ```javascript
  union SearchResult = Human | Droid | Starship
  // 如果需要查询一个返回 SearchResult 联合类型的字段，那么得使用条件片段才能查询任意字段。
  {
    search(text: "an") {
      ... on Human {
        name
        height
      }
      ... on Droid {
        name
        primaryFunction
      }
      ... on Starship {
        name
        length
      }
    }
  }
  ```

- [GraphQLEnumType](https://graphql.org.cn/learn/schema-enumeration-types.html)
- GraphQLInputObjectType
  （用于约束）传递复杂对象，而不是仅传入基本标量

  ```javascript
  const GeoPoint = new GraphQLInputObjectType({
    name: "GeoPoint",
    fields: {
      lat: { type: new GraphQLNonNull(GraphQLFloat) },
      lon: { type: new GraphQLNonNull(GraphQLFloat) },
      alt: { type: GraphQLFloat, defaultValue: 0 }
    }
  });

  // ...
  // args:{someArgu:{ type: GeoPoint}}
  ```

- GraphQLList、GraphQLNonNull
  数组类型，如用于告知返回值是数组类型

  ```javascript
  const RootQuery: GraphQLObjectType = new GraphQLObjectType({
    fields: {
      user: {
        type: new GraphQLList(UserType)
        // ...
      }
    }
  });
  ```

  [String!]：数组本身可以为空，但不能有空值成员（null）  
  [String]!：数组本身不能为空，但可以有空值成员

#### Standard GraphQL Scalars

- GraphQLInt
- GraphQLFloat
- GraphQLString
- GraphQLBoolean
- GraphQLID  
  ID 标量类型表示一个唯一标识符，通常用以重新获取对象或者作为缓存中的键。ID 类型使用和 String 一样的方式序列化；然而将其定义为 ID 意味着并不需要人类可读型。

### 别名&片段&指令

```GraphQL
{
  get: getByParams(gender: "male", age: 4) {
    ...nameField
    birthday {
      year
      date
    }
    # 内联片段
    ... on User {
      name
    }
  }
}
# 可以使用使用原生的GraphQL，配合模板字符串进行拼接
fragment nameField on User {
  name
  age
}

```

#### 内联片段

```graphQL
# root 返回Parent类型，其被ChildA与ChildB实现
# 即有可能返回ChildA也有可能是B，取决于argus参数
query root($argus: Type!) {
  (argu: $argus) {
    ... on ChildA {
      ChildAPrivateProps
    }
    ... on ChildB {
      ChildBPrivateProps
    }
  }
}
# 或者是在返回的是有多种可能的联合类型时
{
  search(text: "an") {
    __typename
    ... on Human {
      name
    }
    ... on Droid {
      name
    }
    ... on Starship {
      name
    }
  }
}
```

在直接请求的情况下，只能请求 Parent 类型上存在的（即 A、B 都具有的公共属性），
而使用内联片段，只有在返回的是 ChildA 类型才会返回其私有属性，ChildB 同理

### 元字段

在不知道服务器将会返回何种类型数据时，可以使用元字段`__typename`来获取任意位置的对象类型名称

```graphql
{
  getByParams(genderAndAge: { gender: "male", age: 4 }) {
    age
    __typename
    birthday {
      year
      date
    }
  }
}
```

### 客户端发起 GraphQL 请求

POSTMAN 已经支持发起 graphql 请求

你可以使用 axios 来向 graphQL 服务器发起一个请求，如

```javascript
const query = `
  {
    hello(user:5){
      name
      age
    }
  }
`;

axios.post(url, { query });
```

### 进行 CURD

- 注意，REST 写多了可能一时转不过来，GraphQL 应当只有一个 URL，所有操作都通过这个 URL 去完成。
- 目前的写法：已经支持基础 CRUD，在根操作节点的域中进行分解变更请求，在根查询节点进行按需请求,客户端发起请求的方式暂不确定。

  - 直接拼接字符串并向 GraphQL 服务器发送 POST 请求似乎不太优雅，尤其是如果写入数据时过于庞大可能会影响性能。
  - 研究在不使用 Apollo 的情况下发送 GraphQL 风格请求

- 待完成的几个问题：

  - 多参数&动态参数
  - 指令
  - 条件查询
  - 输入类型（`GraphQLInputObjectType`）

- 虽然上了 Apollo-React 可能问题就迎刃而解，但还是先好好研究下基础吧。

### Apollo & Koa & React

待实践
