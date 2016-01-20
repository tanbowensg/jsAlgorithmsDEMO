$(function() {
    var theArray = generateArray(20, 20, 100, true)
    var sorting = Sorting(theArray)
    console.log("procedures", sorting.procedures)
    Velocity.mock = 1
})

var sorting={}
sorting.procedures=[]

function generateArray (l, min, max, isInt) {
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

function Sorting(array) {
    var obj = {}

    obj.procedures = []

    obj.generateBalls = function(max, d) {
        for (var i = 0; i < array.length; i++) {
            var diameter = array[i] / max * d
            $("<div></div>").addClass("ball")
                .html(i)
                .css({
                    width: diameter + "px",
                    height: diameter + "px",
                    top: (d - diameter) / 2 + "px",
                    "border-radius": diameter / 2 + "px",
                    "background-color": "red"
                })
                .appendTo($("<div class='ball-box'></div>")
                    .css({
                        left: 100 * i + "px",
                    })
                    .appendTo($("#animate"))
                )
        }
    }

    obj.exchangeBalls = function(a, b) {
        var $a = $($(".ball-box")[a])
        var $b = $($(".ball-box")[b])
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
        var a = obj.procedures[step][0]
        var b = obj.procedures[step][1]
        console.log(a, b)
        var $a = $($(".ball-box")[a])
        var $b = $($(".ball-box")[b])

        if (a === b) {
            console.log("same")
            nextStep()
            return
        }

        console.log(a, $a.css('left'))
        console.log(b, $b.css('left'))
        Velocity($a, {
            left: $b.css('left')
        })
        Velocity($b, {
            left: $a.css('left')
        }, {
            complete: nextStep
        })

        function nextStep() {
            step++
            if (step < obj.procedures.length) { //这里的回调和数组顺序有问题，是正常的反向，所以导致下面要用shift
                obj.perform(step)
            }
        }
    }

    obj.start = function() {
        obj.perform(0)
    }

    obj.init = function(){
        obj.generateBalls(100,100)
        array.selectionSort()
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
    sorting.procedures.unshift([i, j])
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