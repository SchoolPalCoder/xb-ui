/**
 * 并联加载指定的脚本
 * 并联加载[同步]同时加载，不管上个是否加载完成，直接加载全部
 * 全部加载完成后执行回调
 * @param array|string 指定的脚本们
 * @param function 成功后回调的函数
 * @return array 所有生成的脚本元素对象数组
 */
export function parallelLoadScripts(scripts:string[],callback:Function){
  if(typeof(scripts) != "object")  scripts = [scripts];
  var HEAD = document.getElementsByTagName("head").item(0) || document.documentElement, s = new Array(), loaded = 0;
  for(var i=0; i<scripts.length; i++) {
    s[i] = document.createElement("script");
    s[i].setAttribute("type","text/javascript");
    s[i].onload = s[i].onreadystatechange = function() { //Attach handlers for all browsers
      if(!0 || this.readyState == "loaded" || this.readyState == "complete") {
        loaded++;
        this.onload = this.onreadystatechange = null; this.parentNode.removeChild(this);
        if(loaded == scripts.length && typeof(callback) == "function") callback();
      }
    };
    s[i].setAttribute("src",scripts[i]);
    HEAD.appendChild(s[i]);
  }
}

/**
 * 串联加载指定的脚本
 * 串联加载[异步]逐个加载，每个加载完成后加载下一个
 * 全部加载完成后执行回调
 * @param array|string 指定的脚本们
 * @param function 成功后回调的函数
 * @return array 所有生成的脚本元素对象数组
 */
 export function seriesLoadScripts(scripts:string[],callback:Function) {
  if(typeof(scripts) != "object") scripts = [scripts];
  var HEAD = document.getElementsByTagName("head").item(0) || document.documentElement;
  var s = new Array(), last = scripts.length - 1, recursiveLoad = function(i) { //递归
    s[i] = document.createElement("script");
    s[i].setAttribute("type","text/javascript");
    s[i].onload = s[i].onreadystatechange = function() { //Attach handlers for all browsers
      if(!/*@cc_on!@*/0 || this.readyState == "loaded" || this.readyState == "complete") {
        this.onload = this.onreadystatechange = null; this.parentNode.removeChild(this);
        if(i != last) recursiveLoad(i + 1); else if(typeof(callback) == "function") callback();
      }
    }
    s[i].setAttribute("src",scripts[i]);
    HEAD.appendChild(s[i]);
  };
  recursiveLoad(0);
  }

