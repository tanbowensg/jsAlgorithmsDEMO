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