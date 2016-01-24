$(function() {
    // theArray = [654,3,768,34,32,57,8,57,765,7867,8,45,346,24,6,475,65]
    theArray = generateArray(20, 20, 100, true)
    quick = Sorting(theArray)
    quick.array.quick()

    theArray = generateArray(20, 20, 100, true)
    select = Sorting(theArray)
    select.array.selectionSort()

    theArray = generateArray(20, 20, 100, true)
    shell = Sorting(theArray)
    shell.array.shellSort()

    theArray = generateArray(20, 20, 100, true)
    insert = Sorting(theArray)
    insert.array.insertationSort()

    Velocity.mock = 1
})

var shell, insert, quick, select

var generateArray = function(l, min, max, isInt) {
    var array = []
    var i;
    for (i = 0; i < l; i++) {
        var num = {
            id: i,
            val: 0,
            valueOf: function() {
                return this.id
            }
        }
        if (isInt) {
            num.val = parseInt(Math.random() * (max - min)) + min
        } else {
            num.val = Math.random() * (max - min) + min
        }
        array.push(num)
    }
    return array
}

var Sorting = function(array) {
    var obj = {}

    obj.array = array

    obj.container = $("<div></div>").addClass("animate").appendTo(document.body)

    obj.generateBalls = function(max, d) {
        for (var i = 0; i < obj.array.length; i++) {
            var diameter = obj.array[i].val / max * d
            $("<div></div>").addClass("ball")
                .html(i)
                //方条
                // .css({
                //     width: "20px",
                //     height: diameter + "px",
                //     top: (d - diameter) + "px",
                // })
                // .appendTo($("<div class='ball-box'></div>")
                //     .css({
                //         left: 20 * i + "px",
                //     })
                //     .appendTo(obj.container)
                // )
                //圆形
                .css({
                    width: diameter + "px",
                    height: diameter + "px",
                    top: (d - diameter) / 2 + "px",
                    "border-radius": diameter / 2 + "px",
                })
                .appendTo($("<div class='ball-box'></div>")
                    .css({
                        left: 100 * i + "px",
                    })
                    .appendTo(obj.container)
                )
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
        var procedure = obj.array.procedures[step]
        var a = procedure.a
        var b = procedure.b
        var type = procedure.type
        var $a = $(obj.container.find(".ball-box")[a])
        var $b = $(obj.container.find(".ball-box")[b])

        console.log(a, b)
        console.log(a, $a.css('left'))
        console.log(b, $b.css('left'))

        if (procedure.settled === "a") {
            $a.css({
                color: "blue"
            })
        } else if (procedure.settled === "b") {
            $b.css({
                color: "blue"
            })
        }

        if (a === b) {
            console.log("same")
            nextStep()
            return
        }

        if (type === "exch") {
            //元素交换
            Velocity($a, {
                left: $b.css('left')
            })
            Velocity($b, {
                left: $a.css('left')
            }, {
                complete: nextStep
            })

        } else if (type === "compare") {
            //元素比较
            Velocity($a, {
                top: "-=10px"
            }, {
                duration: 100,
                loop: 1,
            })

            Velocity($b, {
                top: "-=10px"
            }, {
                duration: 100,
                complete: nextStep
            })
        }

        function nextStep() {
            step++
            if (step < obj.array.procedures.length) {
                obj.perform(step)
            }
        }
    }

    obj.start = function() {
        obj.perform(0)
    }

    obj.init = function() {
        obj.generateBalls(100, 100)
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


Array.prototype.exch = function(i, j, settled) {

    if (settled) {
        if (settled === i) {
            settled = "a"
        }
        if (settled === j) {
            settled = "b"
        }
    }

    this.procedures.push({
        a: this[i].id,
        b: this[j].id,
        type: "exch",
        settled: settled || ''
    })
    var t = this[i]
    this[i] = this[j]
    this[j] = t
}

Array.prototype.less = function(i, j) {
    // if (this[i] < this[j]) {
    if (this[i].val < this[j].val) {
        return true
    } else {
        return false
    }
}

Array.prototype.more = function(i, j) {
    if (this[i] > this[j]) {
        // if (this[i].val < this[j].val) {
        return true
    } else {
        return false
    }
}

// function less(a, i, j) {
//     // sorting.procedures.unshift({
//     //     a:i,
//     //     b:j,
//     //     type:"compare"
//     // })
//     if (a[i].val < a[j].val) {
//         return true
//     } else {
//         return false
//     }
// }

// function exch(a, i, j) {
//     a.procedures.push({
//         a:a[i].id,
//         b:a[j].id,
//         type:"exch",
//         settled:"b"
//     })
//     var t = a[i]
//     a[i] = a[j]
//     a[j] = t
// }

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