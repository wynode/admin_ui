## 典型配置

### 主要配置

| 参数         | 说明                                                         |  类型  |
| ------------ | ------------------------------------------------------------ | :----: |
| type         | 指定字段类型，可选：string \| number \| boolean \| array     | string |
| title        | 字段标识                                                     | string |
| name         | 字段名                                                       | string |
| widget       | 具体使用的表单组件，可用组件：text \| radio \| checkbox \| select | string |
| xProps        | 具体表单组件使用的配置，详见 xProps                           | object |
| defaultValue | 字段默认值                                                   |   -    |

### xProps 参数

| 参数     | 说明                                                         | 类型  |
| -------- | ------------------------------------------------------------ | :---: |
| options  | 可选，用于 select，radio-group，checkbox-group 等组件渲染备选项使用， { label: '', value: '' } | array |
| 组件配置 | 具体为特定表单组件的参数                                     |   -   |

### 配置示例

```javascript
[
  {
    "type": "string",
    "title": "姓名",
    "name": "name",
    "widget": "text",
    "defaultValue": "懂你的人",
    "rules": [
      { "required": true, "message": "姓名字段必填", "trigger": "blur" }
    ]
  }, // name
  {
    "type": "string",
    "title": "性别",
    "name": "gender",
    "widget": "select",
    "defaultValue": "male",
    "xProps": {
      "options": [
        { "label": "男", "value": "male" },
        { "label": "女", "value": "female" }
      ]
    }
  }, // gender
  {
    "type": "boolean",
    "title": "职业状态",
    "name": "active",
    "widget": "radio",
    "rules": [
      { "required": true, "message": "请选择职业状态", "trigger": "blur" }
    ],
    "xProps": {
      "options": [
        { "label": "在职", "value": true },
        { "label": "离职", "value": false }
      ]
    }
  }, // active

  {
    "type": "array",
    "title": "希望工作的城市",
    "name": "address",
    "widget": "checkbox",
    "rules": [{ "required": true, "message": "请选择城市", "trigger": "blur" }],
    "xProps": {
      "options": [
        { "label": "成都", "value": "cd" },
        { "label": "重庆", "value": "cq" },
        { "label": "月球", "value": "moon" }
      ]
    }
  } // address
]

```

