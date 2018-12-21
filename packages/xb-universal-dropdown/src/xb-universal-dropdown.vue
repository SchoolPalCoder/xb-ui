<template>
<div class="xbui-main" @mouseover="isDrop = true" @mouseout="isDrop = false">
  <div v-model="hasBorder" class="xbui-main-div" :class="[hasBorder ? 'xbui-border' :  'xbui-noBorder',isCascader ? '':'xbui-icon-pointer']">
    <xb-icon v-if="isCascader" type="search" color="#5b8af9"></xb-icon>
    <input @keyup.enter="searchEnter()" v-model.trim="hover" type="text" :class="[disabled ? 'xbui-input-disabled':'',isCascader ? '':'xbui-icon-pointer',isCascader ? 'xbui-input' : 'xbui-input1']" :disabled="!isCascader" />
    <em @click="search()"></em>
    <!--class="xbui-circle-close"-->
    <div class="xbui-icon-div" @click="inputClear()"><xb-icon v-if="isCascader&&circleShow" type="circle-close" color="#737373" class="xbui-icon-pointer" ></xb-icon></div>
    <xb-icon v-if="!isCascader" type="arrow-down" color="#c0c4cc"></xb-icon>
  </div>
  <div  class="xbui-drop-content" :class="[isDrop&&!isCascader ? 'xbui-dropped' : 'xbui-dropless']">
    <div v-if="isCanSearch"  class="xbui-search-div xbui-search-border">
      <input v-model.trim="hoverDown" @keyup.enter="filterEnter()" class="xbui-search-input" :placeholder="placeHolder" type="text" :class="[disabled ? 'xbui-input-disabled':'']"/>
      <xb-icon class="xbui-icon-pointer" type="search" color="#c0c4cc" style=""></xb-icon>
    </div>
    <div v-for="item in data" v-if="item.isShow" class="xbui-drop-item" @click="choose(item)"><span>{{item.name}}</span></div>
  </div>
  <div class="xbui-cascader" v-if="isCascader">
    <div v-for="(item,index) in data">
      <div v-if="item.isShow" @click="blur(data,index,item,1)" :class="[item.isBlue ? 'xbui-cascader-focus' :'xbui-cascader-item']">
        <div class="xbui-icon-div" @click.stop="collspace(index,item)"><xb-icon :type="item.isCollapse ? 'caret-right' : 'caret-bottom'"></xb-icon></div>
        {{item.name}}
      </div>
      <div v-if="!item.isCollapse&&item.isShow" v-for="(classItem,classIndex) in item.classes">
        <div v-if="classItem.isShow" :class="[classItem.isBlue ?'xbui-cascader-second-focus':'xbui-cascader-second']" @click="blur(item.classes,classIndex,classItem,2)">{{classItem .className}}</div>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { List } from 'lodash';

@Component({ name: "XbUniversalDropdown" })
export default class XbUniversalDropdown extends Vue {
/*----------Internal Property--------- */
  isDrop: boolean = true;
  circleShow:boolean = false;
  tree: Array<any> = [];
  hoverDown:string='';
/*----------External Property--------- */
  /**禁用 */
  //disabled
  @Prop()
  disabled!: boolean;

  //has-border
  @Prop({default: true})
  hasBorder!: boolean;

  //hover
  @Prop({default: 'Hover me'})
  defaultHover!: string;

  // //is-can-search
  @Prop({default: false})
  isCanSearch!: boolean;

  //place-holder
  @Prop({default: ''})
  placeHolder!: string;

  //data
  @Prop({type: Array, default: []})
  data!: Array<any> ;

  @Prop({default:false})
  isCascader!: boolean;

  @Prop({default:false})
  isAutoSearch!: boolean;

  @Prop({default:true})
  isDeleted!:boolean;

  hover: string = "";

  created() {
    this.hover = "";
    this.isDrop = false;
    // this.hover = this.defaultHover;
    //sp
    this.data.forEach(item =>{
      item.isShow = true;
      if(item.isBlue||item.isCollapse){
        item.isBlue = false;
        item.isCollapse = true;
        if(item.classes){
          item.classes.forEach(classItem =>{
            classItem.isBlue = false;
            classItem.isShow = true;
          })
        }
      }
    });
    this.tree = this.data;
    console.log(this.placeHolder)
   // this.searchHover = this.placeHolder;
  }

/*----------Method--------- */
  choose(item) {
    this.isDrop = false;
    if(item.isCollapse){
      item.isCollapse = true;
    }
    this.hover = item.name;
  }

  collspace(index,item){
    item.isCollapse = !item.isCollapse;
    this.$set(this.data, index, item)
    console.log(this.data);
  }

  blur(array,index,item,blurType){
    this.data.forEach(item =>{
      item.isBlue = false;
      if(item.classes){
        item.classes.forEach(classItem =>{
          classItem.isBlue = false;
      })
      }
    });
    item.isBlue = !item.isBlue;
    if(blurType==1){
      this.$set(this.data, index, item)
    }else if(blurType==2){
      this.$set(array,index,item)
      console.log(item.className);
    }
    // console.log('136',array)
    // console.log(item.name || item.className)
    // console.log(item.isBlue)
    //TODO：触发回调
  }

  @Watch('hover',{deep: true})
  handle(value){
    if(this.hover != ''){
      this.circleShow = true;
    }else if(this.hover == ''){
      this.circleShow = false;
    }
    if(this.isAutoSearch == true){
      //sp
    let tmpHight = false;

    this.data.forEach((item)=>{
      if(item.isCollapse||item.isShow||item.isBlue){
        item.isCollapse = true;
        item.isShow = value ? false : true;
        tmpHight = false;
        item.isBlue = false;

      }
      if(item.classes){
        item.classes.forEach(classItem=>{
        classItem.isShow =  value ? false : true;
          if(value && classItem.className.includes(value)) {
            console.log(classItem.className)
            classItem.isShow = true;
            classItem.isBlue = false;
            tmpHight = true;
          }
        })
      }

      if(tmpHight){
        item.isShow = true;
        item.isCollapse = false;
      }else{
        item.isShow = value ? false : true;
        item.isCollapse = true;
      }
    })
    }

  }

  search(){
    let key = '';
    key = this.hover;
    this.data.forEach((item,index)=>{
      let tempHigh = false;
      item.isShow = false;
      item.isBlue = false;
      item.isCollapse = true;
      item.classes.forEach((v,vIdx)=>{
        v.isShow = false;
        v.isBlue = false;
        if(v.className.includes(key)){
          v.isShow = true;
          tempHigh = true;
        }
        //this.$set(v.classes,vIdx,v);
      });

      if(tempHigh){
        item.isShow = true;
        item.isCollapse = false;
      }else{
        item.isShow = false;
        item.isCollapse = true;
      }
      this.$set(this.data,index,item);
    })
    console.log(this.data)
  }

  filterEnter(){
    if(this.hoverDown == ''){

    }else if(this.hoverDown != ''){
      this.data.forEach((v,i)=>{
        v.isShow = false;
        if(v.name.includes(this.hoverDown)){
          v.isShow = true;
        }
        this.$set(this.data,i,v);
      })
    }
  }

  searchEnter(){
    if(this.isAutoSearch == false){
      this.search();
    }
    console.log("Enter起作用了");
  };

  inputClear(){
    this.hover = "";
    console.log(this.hover)
  }
}
</script>
