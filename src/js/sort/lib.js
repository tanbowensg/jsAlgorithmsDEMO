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
        type:"exch",
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