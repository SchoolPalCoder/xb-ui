# xb-universal-dropdown 万能下拉框

# 概述

提供简单的下拉框、可搜索下拉框、自动搜索级联选择框、手动搜索级联选择框（数据交互）

# 示例

## 简单的下拉框

### 涉及属性： data, has-border
<div :class="[isBorder ? 'marB10' : 'marB11']">
<xb-button @click="control()">{{isBorder ? '隐藏边框':'显示边框'}}</xb-button>
</div>
<xb-universal-dropdown :data="dataSource" :has-border="isBorder"></xb-universal-dropdown>

```js
<xb-universal-dropdown :data="dataSource" :has-border="true"></xb-universal-dropdown>

<script>
export default{
  data () {
    return {
      isBorder:true,
      dataSource:[
        {id:0,name:'这是第1个选项'},
        {id:1,name:'这是第2个选项'},
        {id:2,name:'这是第3个选项'},
        {id:3,name:'这是第4个选项'},
        {id:4,name:'这是第5个选项'},
      ]
    }
  },
  methods:{
    control(){
      this.isBorder = !this.isBorder;
      console.log(this.isBorder)
    }
  }
}
}
</script>
```

## 可搜索下拉框

### 涉及属性：
<xb-universal-dropdown :data="dataSource" :has-border="isBorder" :is-can-search="true" place-holder="默认搜索" ></xb-universal-dropdown>

```js
<xb-universal-dropdown :data="dataSource" :has-border="isBorder" :is-can-search="true" place-holder="默认搜索" ></xb-universal-dropdown>
```

## 自动搜索级联选择框

### 涉及属性：
<xb-universal-dropdown :data="dataSource1" :has-border="isBorder" :is-cascader="true" :is-auto-search="true"></xb-universal-dropdown>

```js
<xb-universal-dropdown :data="dataSource1" :has-border="isBorder" :is-cascader="true" :is-auto-search="true"></xb-universal-dropdown>

<script>
export default{
  data () {
    return {
      isBorder:true,
       dataSource1:[
        {id:0,name:'自然班',isBlue:false,isCollapse:true,isShow:true,classes:[{pid:0,id:0,className:'阿卡贝拉',isBlue:false,isShow:true},{pid:0,id:1,className:'贝斯',isBlue:false,isShow:true},{pid:0,id:2,className:'吉他',isBlue:false,isShow:true},{pid:0,id:3,className:'皮尔吉沃特',isBlue:false,isShow:true}]},
        {id:1,name:'行政班',isBlue:false,isCollapse:true,isShow:true,classes:[{pid:1,id:0,className:'拉丁舞一班',isBlue:false,isShow:true,isBlue:false,isShow:true},{pid:1,id:1,className:'土木1801班',isBlue:false,isShow:true},{pid:1,id:2,className:'软工1802班',isBlue:false,isShow:true},{pid:1,id:2,className:'软工1802班',isBlue:false,isShow:true}]}
      ]
    }
  },
}
</script>
```

## 手动搜索级联选择框

### 涉及属性：
<xb-universal-dropdown :data="dataSource2" :has-border="isBorder" :is-cascader="true" :is-auto-search="false"></xb-universal-dropdown>
```js
<xb-universal-dropdown :data="dataSource2" :has-border="isBorder" :is-cascader="true" :is-auto-search="true"></xb-universal-dropdown>

<script>
export default{
  data () {
    return {
      isBorder:true,
       dataSource2:[
        {id:0,name:'自然班',isBlue:false,isCollapse:true,isShow:true,classes:[{pid:0,id:0,className:'阿卡贝拉',isBlue:false,isShow:true},{pid:0,id:1,className:'贝斯',isBlue:false,isShow:true},{pid:0,id:2,className:'吉他',isBlue:false,isShow:true},{pid:0,id:3,className:'皮尔吉沃特',isBlue:false,isShow:true}]},
        {id:1,name:'行政班',isBlue:false,isCollapse:true,isShow:true,classes:[{pid:1,id:0,className:'拉丁舞一班',isBlue:false,isShow:true,isBlue:false,isShow:true},{pid:1,id:1,className:'土木1801班',isBlue:false,isShow:true},{pid:1,id:2,className:'软工1802班',isBlue:false,isShow:true},{pid:1,id:2,className:'软工1802班',isBlue:false,isShow:true}]}
      ]
    }
  },
}
</script>
```

<script>
export default{
  data () {
    return {
      isBorder:true,
      dataSource:[
        {id:0,name:'这是第1个选项'},
        {id:1,name:'这是第2个选项'},
        {id:2,name:'这是第3个选项'},
        {id:3,name:'这是第4个选项'},
        {id:4,name:'这是第5个选项'},
      ],
      dataSource1:[
        {id:0,name:'自然班',isBlue:false,isCollapse:true,isShow:true,classes:[{pid:0,id:0,className:'阿卡贝拉',isBlue:false,isShow:true},{pid:0,id:1,className:'贝斯',isBlue:false,isShow:true},{pid:0,id:2,className:'吉他',isBlue:false,isShow:true},{pid:0,id:3,className:'皮尔吉沃特',isBlue:false,isShow:true}]},
        {id:1,name:'行政班',isBlue:false,isCollapse:true,isShow:true,classes:[{pid:1,id:0,className:'拉丁舞一班',isBlue:false,isShow:true,isBlue:false,isShow:true},{pid:1,id:1,className:'土木1801班',isBlue:false,isShow:true},{pid:1,id:2,className:'软工1802班',isBlue:false,isShow:true},{pid:1,id:2,className:'软工1802班',isBlue:false,isShow:true}]}
      ],
      dataSource2:[
        {id:0,name:'自然班',isBlue:false,isCollapse:true,isShow:true,classes:[{pid:0,id:0,className:'阿卡贝拉',isBlue:false,isShow:true},{pid:0,id:1,className:'贝斯',isBlue:false,isShow:true},{pid:0,id:2,className:'吉他',isBlue:false,isShow:true},{pid:0,id:3,className:'皮尔吉沃特',isBlue:false,isShow:true}]},
        {id:1,name:'行政班',isBlue:false,isCollapse:true,isShow:true,classes:[{pid:1,id:0,className:'拉丁舞一班',isBlue:false,isShow:true,isBlue:false,isShow:true},{pid:1,id:1,className:'土木1801班',isBlue:false,isShow:true},{pid:1,id:2,className:'软工1802班',isBlue:false,isShow:true},{pid:1,id:2,className:'软工1802班',isBlue:false,isShow:true}]}
      ]
    }
  },
  methods:{
    control(){
      this.isBorder = !this.isBorder;
      console.log(this.isBorder)
    }
  }
}
</script>

<style>
  .marB10{margin-bottom:10px;}
  .marB11{margin-bottom:11px;}
</style>
