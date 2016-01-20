Array.prototype.insertationSort = function() {
    this.procedures=[]
    var compare = 0
    var exchange = 0
    var comparet = this.length * this.length / 4
    var exchanget = comparet
    for (var i = 1; i < this.length; i++) {
        for (var j = i; j > 0; j--) {
            compare++
            if (less(this, j, j - 1)) {
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
$(function(){
    // theArray = generateArray(20, 20, 100, true)
    theArray = [34,24,54,37,87,3,45,45,85,56,34,45,9,44,53,57,73,56,45,32,73,57,38,73,87,23,99,9,43]
    quickSorting = Sorting(theArray)
    quickSorting.array.quickSort()
    theArray = [34,24,54,37,87,3,45,45,85,56,34,45,9,44,53,57,73,56,45,32,73,57,38,73,87,23,99,9,43]
    selectSorting = Sorting(theArray)
    selectSorting.array.selectionSort()

    // var QuickSorting=Sorting(theArray)
    // theArray.shellSort()
    // var shellSorting=Sorting(theArray)
    // theArray.insertationSort()
    // var insertationSorting=Sorting(theArray)
    // theArray.selectionSort()
    // var selectionSorting=Sorting(theArray)
    Velocity.mock = 0.3
})

var quickSorting,selectSorting

var generateArray = function(l, min, max, isInt) {
    var array = []
    var i;
    for (i = 0; i < l; i++) {
        if (isInt) {
            array[i] = parseInt(Math.random() * (max - min)) + min
        } else {
            array[i] = Math.random() * (max - min) + min
        }
    }
    return array
}

var Sorting = function (array) {
    var obj = {}

    obj.array=array

    obj.container = $("<div></div>").addClass("animate").appendTo(document.body)

    obj.generateBalls = function(max, d) {
        for (var i = 0; i < obj.array.length; i++) {
            var diameter = obj.array[i] / max * d
            $("<div></div>").addClass("ball")
                .html(i)
                //方条
                .css({
                    width: "20px",
                    height: diameter + "px",
                    top: (d - diameter) + "px",
                    "background-color": "red"
                })
                .appendTo($("<div class='ball-box'></div>")
                    .css({
                        left: 20 * i + "px",
                    })
                    .appendTo(obj.container)
                )
                //圆形
                // .css({
                //     width: diameter + "px",
                //     height: diameter + "px",
                //     top: (d - diameter) / 2 + "px",
                //     "border-radius": diameter / 2 + "px",
                //     "background-color": "red"
                // })
                // .appendTo($("<div class='ball-box'></div>")
                //     .css({
                //         left: 100 * i + "px",
                //     })
                //     .appendTo(obj.container)
                // )
        }
    }

    obj.exchangeBalls = function(a, b) {
        var $a = $(obj.container.find(".ball-box")[a])
        var $b = $(obj.container.find(".ball-box")[b])
        console.log(a, $a.css('left'))
        console.log(b, $b.css('left'))
        Velocity($a, {
            left: $b.css('left')
        })
        Velocity($b, {
            left: $a.css('left')
        })
    }

    obj.perform = function(step) {
        var a = obj.array.procedures[step].a
        var b = obj.array.procedures[step].b
        var type = obj.array.procedures[step].type
        var $a = $(obj.container.find(".ball-box")[a])
        var $b = $(obj.container.find(".ball-box")[b])

        console.log(a, b)
        console.log(a, $a.css('left'))
        console.log(b, $b.css('left'))

        if (a === b) {
            console.log("same")
            nextStep()
            return
        }

        if (type==="exch") {
            //元素交换
            Velocity($a, {
                left: $b.css('left')
            })
            Velocity($b, {
                left: $a.css('left')
            }, {
                complete: nextStep
            })

        } else if (type==="compare"){
            //元素比较
            Velocity($a, {
                top: "-=10px"
            }, {
                duration:100,
                loop:1,
            })

            Velocity($b, {
                top: "-=10px"
            }, {
                duration:100,
                complete: nextStep
            })
        }

        function nextStep() {
            step++
            if (step < obj.array.procedures.length) { //这里的回调和数组顺序有问题，是正常的反向，所以导致下面要用shift
                obj.perform(step)
            }
        }
    }

    obj.start = function() {
        obj.perform(0)
    }

    obj.init = function(){
        obj.generateBalls(100,100)
    }

    obj.init()
    return obj
}


// function exchangeBalls(a, b) {
//     var $balls = $(".ball-box")
//     var $a = $($balls[a])
//     var $b = $($balls[b])
//     var animateLeft = $("#animate").offset().left
//     var aLeft = $a.offset().left - animateLeft
//     var bLeft = $b.offset().left - animateLeft

//     console.log('aLeft',aLeft)
//     console.log('bLeft',bLeft)


//     var bezierA = {
//         start: {
//             x: aLeft,
//             y: 0,
//             angle: -45,
//             length: 1
//         },
//         end: {
//             x: bLeft-aLeft,
//             y: 0,
//             angle: 45,
//             length: 1
//         }
//     }

//     var bezierB = {
//         start: {
//             x: bLeft,
//             y: 0,
//             angle: -45,
//             length: 1
//         },
//         end: {
//             x: -aLeft,
//             y: 0,
//             angle: 45,
//             length: 1
//         }
//     }

//     $a.animate({
//         path: new $.path.bezier(bezierA)
//     })
//     $b.animate({
//         path: new $.path.bezier(bezierB)
//     })
// }


function less(a, i, j) {
    // sorting.procedures.unshift({
    //     a:i,
    //     b:j,
    //     type:"compare"
    // })
    if (a[i] < a[j]) {
        return true
    } else {
        return false
    }
}

function exch(a, i, j) {
    var t = a[i]
    a[i] = a[j]
    a[j] = t
    a.procedures.unshift({
        a:i,
        b:j,
        type:"exch"
    })
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

function howLongDoseItTake(func, obj) {
    var startTime, endTime

    var d1 = new Date()
    startTime = d1.getTime();

    func.apply(obj, obj)

    var d2 = new Date()
    endTime = d2.getTime();

    console.log('总共花费' + (endTime - startTime) / 1000 + '秒')
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
        // virtualize(result, 0)
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
  this.procedures=[]
  /**
   * Swaps two values in the heap
   *
   * @param {int} indexA Index of the first item to be swapped
   * @param {int} indexB Index of the second item to be swapped
   */
  // function swap(array, indexA, indexB) {
  //   var temp = array[indexA];
  //   array[indexA] = array[indexB];
  //   array[indexB] = temp;
  // }

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
    exch(array, pivot, right);

    // go through the rest
    for(var v = left; v < right; v++) {

      // if the value is less than the pivot's
      // value put it to the left of the pivot
      // point and move the pivot point along one
      if(array[v] < pivotValue) {
        exch(array, v, storeIndex);
        storeIndex++;
      }
    }

    // finally put the pivot in the correct place
    exch(array, right, storeIndex);

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

Array.prototype.selectionSort = function() {
    this.procedures=[]
    var compare = 0
    var exchange = 0
    var comparet = this.length * (this.length - 1) / 2
    var exchanget = this.length
        //正式算法内容-----------------
    for (var i = 0; i < this.length; i++) {
        var min = i
        for (var j = i + 1; j < this.length; j++) {
            compare++
            if (less(this, j, min)) {
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
                if (less(this,j, j - h)) {
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
        this.procedures=[]
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
                if (less(this, j, j - h)) {
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