module.exports = {
  env: {
    mocha: true,
    browser: true,
  },
  globals: {
    expect: true,
    sinon: true,
    vue: true,
  },
  plugins: ['html', 'json'],
  extends: ['plugin:vue/strongly-recommended', 'plugin:prettier/recommended'],
  rules: {
    'no-constant-condition': 2, // 禁止在条件中使用常量表达式
    'no-debugger': 2, // 程序中不能出现debugger
    'no-obj-calls': 2, // 禁止将全局对象当作函数进行调用
    'no-undef': 2, // 禁用未声明的变量，除非它们在 /global / 注释中被提到
    'no-unused-vars': 1, //禁止出现未使用过的变量
    'comma-dangle': [0, 'never'], //要求或禁止末尾逗号
    'no-const-assign': 2, //禁止修改 const 声明的变量
    'no-dupe-class-members': 2, //禁止类成员中出现重复的名称
    'for-direction': 2, //for循环趋势错误
    'no-cond-assign': 2, //禁止条件表达式中出现赋值操作符
    'no-dupe-args': 2, //禁止 function 定义中出现重名参数
    'no-dupe-keys': 2, //禁止对象字面量中出现重复的 key
    'no-duplicate-case': 2, //禁止出现重复的 case 标签
    'no-empty': 2, //禁止出现空语句块
    'no-func-assign': 2, //禁止对 function 声明重新赋值
    'no-inner-declarations': 2, //禁止在嵌套的块中出现变量声明或 function 声明
    'no-prototype-builtins': 2, //禁止直接调用 Object.prototypes 的内置属性
    'no-unexpected-multiline': 2, //禁止出现令人困惑的多行表达式
    'no-unreachable': 2, //禁止在return、throw、continue 和 break 语句之后出现不可达代码
    'no-unsafe-finally': 2, //禁止在 finally 语句块中出现控制流语句
    'no-unsafe-negation': 2, //复杂逻辑判断添加括号
    'use-isnan': 2, //要求使用 isNaN() 检查 NaN
    'valid-typeof': 2, //强制 typeof 表达式与有效的字符串进行比较
    'block-scoped-var': 2, //强制把变量的使用限制在其定义的作用域范围内
    curly: 1, //语句括号缺失警告
    'no-caller': 2, //禁用 arguments.caller 或 arguments.callee
    'no-case-declarations': 2, //不允许在 case 子句中使用词法声明
    'no-empty-pattern': 2, //禁止使用空解构模式
    'no-eval': 2, //禁用 eval()
    'no-extend-native': 2, //禁止扩展原生类型
    'no-extra-bind': 2, //禁止不必要的 .bind() 调用
    'no-floating-decimal': 2, //禁止数字字面量中使用前导和末尾小数点
    'no-global-assign': 2, //禁止修改原生对象
    'no-implied-eval': 2, //禁止使用类似 eval() 的方法
    'no-labels': 2, //禁用标签语句
    'no-lone-blocks': 2, //禁用不必要的嵌套块
    'no-loop-func': 0, //禁止在循环中出现 function 声明和表达式
    'no-multi-str': 2, //禁止使用多行字符串
    'no-proto': 2, //禁止直接调用 Object.prototypes 的内置属性
    'no-redeclare': 2, //禁止多次声明同一变量
    'no-return-assign': 2, //禁止在 return 语句中使用赋值语句
    'no-script-url': 2, //禁止使用 javascript: url
    'no-self-assign': 2, //禁止自我赋值
    'no-self-compare': 2, //禁止自身比较
    'no-with': 2, //禁止使用with
    'wrap-iife': 2, //要求 IIFE 使用括号括起来
    'no-class-assign': 2, //禁止修改类声明的变量
    'no-restricted-globals': 2, //禁用特定的全局变量
    'no-shadow': 2, //禁止变量声明与外层作用域的变量同名
    'no-shadow-restricted-names': 2, //禁止将标识符定义为受限的名字
  },
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
  },
};
