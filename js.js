var List = function(l, max, isInt) {
    var array = [];
    var i;
    for (i = 0; i < l; i++) {
        if (isInt) {
            array[i] = parseInt(Math.random() * max);
        } else {
            array[i] = Math.random() * max
        }
    }
    return array
}

var theArray = List(100000, 1000, true)

function less(a, b) {
    if (a < b) {
        return true
    } else {
        return false
    }
}

function exch(a, i, j) {
    var t = a[i]
    a[i] = a[j]
    a[j] = t
}

function virtualize(a, point) {
    var color, i
    var l = a.length
    var width = 900;
    var widthPerCol = width / l
    var heightPerUnit = 150 / getBiggest(a)
    var colDiv = $('<div><div>').addClass('colDiv').clone()
    for (i in a) {
        color = i <= point ? 'blue' : 'black';
        var col = $('<div><div>').addClass('col')
            .css({
                height: a[i] * heightPerUnit,
                width: widthPerCol - 2 + 'px',
                left: widthPerCol * (i - 1) + 2 + 'px',
                'background-color': color
            }).clone()
            .appendTo(colDiv)
    }
    colDiv.appendTo('#container')
}

function virtualizeAni(a, point) {
    $('#container').children().remove()
    var color, i
    var l = a.length
    var width = 900;
    var widthPerCol = width / l
    var heightPerUnit = 150 / getBiggest(a)
    $('#container').addClass('colDiv')
    for (i in a) {
        color = i <= point ? 'blue' : 'black';
        var col = $('<div><div>').addClass('col')
            .css({
                height: a[i] * heightPerUnit,
                width: widthPerCol - 2 + 'px',
                left: widthPerCol * (i - 1) + 2 + 'px',
                'background-color': color
            }).clone()
            .appendTo($('#container'))
    }
}

function getBiggest(a) {
    var max = a[0]
    for (var i in a) {
        if (a[i] > max) {
            max = a[i]
        }
    }
    return max
}

howLongDoseItTake = function(func, obj) {
    var startTime, endTime

    var d1 = new Date()
    startTime = d1.getTime();

    func.apply(obj,obj)

    var d2 = new Date()
    endTime = d2.getTime();

    console.log('总共花费' + (endTime - startTime) / 1000 + '秒')
}

Array.prototype.selectionSort = function() {
    var compare = 0
    var exchange = 0
    var comparet = this.length * (this.length - 1) / 2
    var exchanget = this.length
        //正式算法内容-----------------
    for (var i = 0; i < this.length; i++) {
        var min = i
        for (var j = i + 1; j < this.length; j++) {
            compare++
            if (less(this[j], this[min])) {
                min = j
            }
        }
        exch(this, i, min)
        exchange++
        // virtualize(this, i)
    }
    //正式算法内容-------------------
    console.log(this)
    console.log('理论上应进行约' + comparet + '次比较和' + exchanget + '次交换')
    console.log('实际上进行了共' + compare + '次比较和' + exchange + '次交换')
}


Array.prototype.insertationSort = function() {
    var compare = 0
    var exchange = 0
    var comparet = this.length * this.length / 4
    var exchanget = comparet
    for (var i = 1; i < this.length; i++) {
        for (var j = i; j > 0; j--) {
            compare++
            if (less(this[j], this[j - 1])) {
                exch(this, j, j - 1)
                exchange++
            } else {
                break
            }
        }
        // virtualize(this, i)
    }
    console.log(this)
    console.log('理论上应进行约' + comparet + '次比较和' + exchanget + '次交换')
    console.log('实际上进行了共' + compare + '次比较和' + exchange + '次交换')
}

Array.prototype.shellSort2 = function() {
    var l = this.length
    var compare = 0
    var exchange = 0
    var comparet = Math.sqrt(l * l * l)
    var exchanget = '?'
    var h = 128
    while (h < l / 2) h = 2 * h + 1
    while (h >= 1) {
        for (var i = h; i < l; i++) {
            for (var j = i; j >= h; j -= h) {
                compare++
                if (less(this[j], this[j - h])) {
                    exch(this, j, j - h)
                    exchange++
                } else {
                    break
                }
            }
            // virtualize(this, i)
        }
        h = Math.floor(h / 2)
    }

    console.log(this)
    console.log('理论上应进行约' + comparet + '次比较和' + exchanget + '次交换')
    console.log('实际上进行了共' + compare + '次比较和' + exchange + '次交换')
}

Array.prototype.shellSort = function() {
    var l = this.length
    var compare = 0
    var exchange = 0
    var comparet = Math.sqrt(l * l * l)
    var exchanget = '?'
    //一个神奇的递增序列
    var list=[0,1,5,19,41,109,209,505,929,2161,3905,8929,16001,36289,64769,146305,260609]
    var listnum=1
    var h = 1
    while (h < l / 2) {
        listnum++
        h = list[listnum]
    }
    while (h >= 1) {
        for (var i = h; i < l; i++) {
            for (var j = i; j >= h; j -= h) {
                compare++
                if (less(this[j], this[j - h])) {
                    exch(this, j, j - h)
                    exchange++
                } else {
                    break
                }
            }
            // virtualize(this, i)
        }
        listnum--
        h = list[listnum]
    }

    console.log(this)
    console.log('理论上应进行约' + comparet + '次比较和' + exchanget + '次交换')
    console.log('实际上进行了共' + compare + '次比较和' + exchange + '次交换')
}

Array.prototype.mergeSort = function() {

    function sort(array) {

        var length = array.length,
            mid    = Math.floor(length * 0.5),
            left   = array.slice(0, mid),
            right  = array.slice(mid, length);

        if(length === 1) {
          return array;
        }

        return merge(sort(left), sort(right));

    }

    function merge(left, right) {
        var result = []
        for (var li=0,ri=0,i=0;i<left.length+right.length;i++){
            if (li < left.length && ri < right.length) {
                if (less(left[li], right[ri])) {
                    result[i]=left[li]
                    li++
                    continue
                }
                else {
                    result[i]=right[ri]
                    ri++
                    continue
                }
            }
            if (li===left.length) {
                result[i]=right[ri]
                ri++
                continue
            }
            else {
                result[i]=left[li]
                li++
                continue
            }
        }
        virtualize(result, 0)
        return result
    }
    var newArray=sort(this)
    return newArray
}

// Array.prototype.mergeSort2 = function() {

//   function sort(array) {

//     var length = array.length,
//         mid    = Math.floor(length * 0.5),
//         left   = array.slice(0, mid),
//         right  = array.slice(mid, length);

//     if(length === 1) {
//       return array;
//     }

//     return merge(sort(left), sort(right));

//   }

//     function merge(left, right) {
//         var result = []
//         while (left.length || right.length) {
//             if (left[0] < right[0]) {
//                 result.push(left.shift());
//                 continue
//             }
//             if (left[0] >= right[0]) {
//                 result.push(right.shift());
//                 continue
//             }
//             if (left.length === 0) {
//                 result.push(right.shift());
//                 continue
//             }
//             if (right.length === 0) {
//                 result.push(left.shift());
//                 continue
//             }
//         }

//         return result
//     }

//     var newArray=sort(this)
//     this.splice(0,this.length,newArray)
//     console.log(this)
// }

Array.prototype.quickSort=function(){

  /**
   * Swaps two values in the heap
   *
   * @param {int} indexA Index of the first item to be swapped
   * @param {int} indexB Index of the second item to be swapped
   */
  function swap(array, indexA, indexB) {
    var temp = array[indexA];
    array[indexA] = array[indexB];
    array[indexB] = temp;
  }

  /**
   * Partitions the (sub)array into values less than and greater
   * than the pivot value
   *
   * @param {Array} array The target array
   * @param {int} pivot The index of the pivot
   * @param {int} left The index of the leftmost element
   * @param {int} left The index of the rightmost element
   */
  function partition(array, pivot, left, right) {

    var storeIndex = left,
        pivotValue = array[pivot];

    // put the pivot on the right
    swap(array, pivot, right);

    // go through the rest
    for(var v = left; v < right; v++) {

      // if the value is less than the pivot's
      // value put it to the left of the pivot
      // point and move the pivot point along one
      if(array[v] < pivotValue) {
        swap(array, v, storeIndex);
        storeIndex++;
      }
    }

    // finally put the pivot in the correct place
    swap(array, right, storeIndex);

    return storeIndex;
  }

  /**
   * Sorts the (sub-)array
   *
   * @param {Array} array The target array
   * @param {int} left The index of the leftmost element, defaults 0
   * @param {int} left The index of the rightmost element,
   defaults array.length-1
   */
  function sort(array, left, right) {

    var pivot = null;

    if(typeof left !== 'number') {
      left = 0;
    }

    if(typeof right !== 'number') {
      right = array.length - 1;
    }

    // effectively set our base
    // case here. When left == right
    // we'll stop
    if(left < right) {

      // pick a pivot between left and right
      // and update it once we've partitioned
      // the array to values < than or > than
      // the pivot value
      pivot     = left + Math.ceil((right - left) * 0.5);
      newPivot  = partition(array, pivot, left, right);

      // recursively sort to the left and right
      sort(array, left, newPivot - 1);
      sort(array, newPivot + 1, right);
    }

  }

sort(this)
}