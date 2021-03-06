// @flow Created by 陈其丰 on 2018/9/17.

const proto = Array.prototype,
    slice = [].slice,
    splice = [].splice;

/**
 返回由参数组成的新数组
 @param {...null} items
 @static
 @return {Array}
 */
Array.of = Array.of || function () {
    let args = slice.apply(arguments);
    return [].concat(args);
};

/**
 TODO 未处理Iterator 接口
 类数组转换为真正数组
 @param items
 @param {Function} [mapfn]
 @param [thisArg]
 @static
 @return {Array}
 */
Array.from = Array.from || function (items,mapFn,thisArg) {
    mapFn = mapFn || function (item) {return item};
    return slice.call(items).map(mapFn,thisArg)
};


/**
 TODO 未处理操作类数组对象
 将数组指定位置拷贝到数组的另一个指定位置
 @param {number} target
 @param {number} start
 @param {number} [enf]
 @return {Array.<T>}
 */
proto.copyWithin = proto.copyWithin || function (target,start,enf) {
    let len = this.length;
    target = target || 0;
    start = start || 0;
    enf = enf || len;
    if(target < 0)target = target + len;
    if(start < 0)start = start + len;
    if(enf < 0)enf = enf + len;
    splice.apply(this,[target,enf - start].concat(this.slice(start,enf)));
    return this;
};


/**
 找出第一个符合条件的数组成员
 @param {function(T, number, obj): boolean} predicate
 @param [thisArg]
 @return {T}
 */
proto.find = proto.find || function (predicate,thisArg) {
    predicate = predicate || function () {};
    for(let i = 0,len = this.length; i<len; i++){
        if(!!predicate.call(thisArg,this[i],i,this)){
            return this[i];
        }
    }
    return undefined;
};

/**
 返回第一个符合条件的数组成员的位置
 @param {function(T, number, obj): boolean} predicate
 @param [thisArg]
 @return {number}
 */
proto.findIndex = proto.findIndex || function (predicate,thisArg) {
    predicate = predicate || function () {};
    for(let i = 0,len = this.length; i<len; i++){
        if(!!predicate.call(thisArg,this[i],i,this)){
            return i;
        }
    }
    return -1;
};


/**
 使用给定值，填充一个数组
 @param {T} value
 @param {number} [start]
 @param {number} [end]
 @return {Array.<T>}
 */
proto.fill = proto.fill || function (value,start,end) {
   let len = this.length;
   start = start || 0;
   end = end || len;
   if(start < 0) start = start + len;
   if(end < 0) end = end + len;
   for(let i = 0; i<len; i++){
       if(i >= start && i<end){
           this[i] = value;
       }
   }
   return this;
};
/**
 返回 boolean 值，表示是否包含该元素
 可用来判断 NaN
 @param {T} searchElement
 @param {number} [fromIndex]
 @return {boolean}
 */
proto.includes = proto.includes || function (searchElement,fromIndex) {
    fromIndex = fromIndex || 0;
    let len = this.length;
    if(fromIndex < 0) fromIndex = fromIndex + len < 0 ? 0 : fromIndex + len;
    for(let i = fromIndex; i<len; i++){
        if(searchElement !== searchElement && this[i] !== this[i]){
            return true;
        }else if(searchElement === this[i]){
            return true;
        }
    }
    return false;
};
/**
 数组扁平化
 @param {number} deep 深度，默认为1
 @return {array}
 */
proto.flat = proto.flat || function (depth) {
    depth = Number(depth) || 1;
    return this.reduce(function (init,cur) {
        return init.concat(depth - 1 > 0 ? (Array.isArray(cur) ? cur.flat(depth - 2) : cur) : cur)
    },[])
};


/**
 先执行map，再执行flat
 @param {function(T=, number=, Array.<T>=)} callback
 @param {*} [thisArg]
 @return {Array}
 */
proto.flatMap = proto.flatMap || function (callback , thisArg) {
    return this.map(callback,thisArg).flat();
};