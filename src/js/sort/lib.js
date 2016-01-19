var List = function(l ,min, max, isInt) {
    var array = [];
    var i;
    for (i = 0; i < l; i++) {
        if (isInt) {
            array[i] = parseInt(Math.random() * (max-min)) + min
        } else {
            array[i] = Math.random() * (max-min) + min
        }
    }
    return array
}

var theArray = List(20, 20, 100, true)


function generateBalls(array, max, d) {
    for (var i = 0; i < array.length; i++) {
        var diameter = array[i] / max * d
        $("<div></div>").addClass("ball")
            .html(i)
            .css({
                width:diameter+"px",
                height:diameter+"px",
                top:(d-diameter)/2+"px",
                "border-radius":diameter/2+"px",
                "background-color":"red"
            })
            .appendTo($("<div class='ball-box'></div>")
                .css({
                    left:100*i+"px",
                })
                .appendTo($("#animate"))
            )
    };
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
var exchRecords=[]

// function exchangeBalls(a,b,callback){
//     var $a = $($(".ball-box")[a])
//     var $b = $($(".ball-box")[b])
//     console.log(a,$a.css('left'))
//     console.log(b,$b.css('left'))
//     Velocity($a,{left:$b.css('left')})
//     Velocity($b,{left:$a.css('left')},{
//         finish:function(a,b){
//             callback(a,b)
//         }
//     })
// }
// 

function performRecords (records,i){

    var a=(records[i][0])
    var b=(records[i][1])
    console.log(a,b)

    function exchangeBalls(a,b){

        if(a===b){
            console.log("same")
            i++
            if(i<records.length){
                performRecords(records,i)
            }
            return 
        }

        var $a = $($(".ball-box")[a])
        var $b = $($(".ball-box")[b])
        console.log(a,$a.css('left'))
        console.log(b,$b.css('left'))
        Velocity($a,{left:$b.css('left')})
        Velocity($b,{left:$a.css('left')},{
            complete:function(){
                i++
                if(i<records.length){//这里的回调和数组顺序有问题，是正常的反向，所以导致下面要用shift
                    performRecords(records,i)
                }
            }
        })
    }
    exchangeBalls(a,b)

}

$(function(){
    // theArray=[23,55,6,84,32]
    generateBalls(theArray,100,100)
    theArray.selectionSort()
    console.log(exchRecords)
    Velocity.mock=1
})

function exchangeBalls2(a,b){

    var $a = $($(".ball-box")[a])
    var $b = $($(".ball-box")[b])
    console.log(a,$a.css('left'))
    console.log(b,$b.css('left'))
    Velocity($a,{left:$b.css('left')})
    Velocity($b,{left:$a.css('left')})
}


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
    exchRecords.unshift([i,j])
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

