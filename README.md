# admin_ui

## 依赖安装
```
yarn install
```

### 本地开发启动
```
yarn serve
或者
yarn start
```

### 编译打包
```
yarn build:test # 测试打包
yarn build # 生产打包
yarn build:ts # 对项目内的 ts 文件进行编译，比如 mockserver
```

### 单元测试
```
yarn test:unit
```

### 静态语法检测（包含自动纠正功能）
```
yarn lint
```

### 发布脚本
版本发布已经通过 gitlab-ci 自动化，gitlab-ci 实际调用以下脚本

```
sh deploy/bin/deploy_test.sh # 测试发布
sh deploy/bin/deploy_prod.sh # 生产发布
```
