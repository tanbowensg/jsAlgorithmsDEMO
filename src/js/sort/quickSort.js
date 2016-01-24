// Array.prototype.quickSort=function(){
//   this.procedures=[]
//   /**
//    * Swaps two values in the heap
//    *
//    * @param {int} indexA Index of the first item to be swapped
//    * @param {int} indexB Index of the second item to be swapped
//    */
//   // function swap(array, indexA, indexB) {
//   //   var temp = array[indexA];
//   //   array[indexA] = array[indexB];
//   //   array[indexB] = temp;
//   // }

//   /**
//    * Partitions the (sub)array into values less than and greater
//    * than the pivot value
//    *
//    * @param {Array} array The target array
//    * @param {int} pivot The index of the pivot
//    * @param {int} left The index of the leftmost element
//    * @param {int} left The index of the rightmost element
//    */
//   function partition(array, pivot, left, right) {

//     var storeIndex = left,
//         pivotValue = array[pivot];

//     // put the pivot on the right
//     this.exch(pivot, right);

//     // go through the rest
//     for(var v = left; v < right; v++) {

//       // if the value is less than the pivot's
//       // value put it to the left of the pivot
//       // point and move the pivot point along one
//       if(array[v] < pivotValue) {
//         this.exch(v, storeIndex);
//         storeIndex++;
//       }
//     }

//     // finally put the pivot in the correct place
//     this.exch(right, storeIndex);

//     return storeIndex;
//   }

//   /**
//    * Sorts the (sub-)array
//    *
//    * @param {Array} array The target array
//    * @param {int} left The index of the leftmost element, defaults 0
//    * @param {int} left The index of the rightmost element,
//    defaults array.length-1
//    */
//   function sort(array, left, right) {

//     var pivot = null;

//     if(typeof left !== 'number') {
//       left = 0;
//     }

//     if(typeof right !== 'number') {
//       right = array.length - 1;
//     }

//     // effectively set our base
//     // case here. When left == right
//     // we'll stop
//     if(left < right) {

//       // pick a pivot between left and right
//       // and update it once we've partitioned
//       // the array to values < than or > than
//       // the pivot value
//       pivot     = left + Math.ceil((right - left) * 0.5);
//       newPivot  = partition(array, pivot, left, right);

//       // recursively sort to the left and right
//       sort(array, left, newPivot - 1);
//       sort(array, newPivot + 1, right);
//     }

//   }

//   sort(this)
// }

Array.prototype.quick = function() {

  var that = this
  this.procedures = []

  function cut(left, right) {
    var mid = left
    var i = left
    var j = right
    while (i < j) {
      for (i; i < right + 1; i++) {
        // if(that.more(i,mid)){//降序
        if (that.less(mid, i)) { //升序
          break
        }
      }

      for (j; j > left; j--) {
        // if(that.more(mid,j)){//降序
        if (that.less(j, mid)) { //升序
          break
        }
      }

      if (i >= j) {
        break
      }

      that.exch(i, j)
    }
    that.exch(left, j, left)
    return j
  }

  function sort(left, right) {

    if (typeof(left) !== "number") {
      left = 0
    }

    if (typeof(right) !== "number") {
      right = that.length - 1
    }

    if (right <= left) {
      return
    }

    var mid = cut(left, right)

    sort(left, mid - 1)
    sort(mid + 1, right)
  }

  sort(0, that.length - 1)
}