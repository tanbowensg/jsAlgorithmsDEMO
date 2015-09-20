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

var theArray = List(10000, 1000, true)

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

    func.apply(obj)

    var d2 = new Date()
    endTime = d2.getTime();

    console.log('总共花费' + (endTime - startTime) / 1000 + '秒')
}

Array.prototype.selectionSort = function() {
    var compare = 0
    var exchange = 0
    var comparet = this.length * (this.length - 1) / 2
    var exchanget = this.length
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
    console.log(this)
    console.log('理论上应该进行约' + comparet + '次比较和' + exchanget + '次交换')
    console.log('实际上进行了' + compare + '次比较和' + exchange + '次交换')
}


Array.prototype.insertationSort = function() {
    var compare = 0
    var exchange = 0
    var comparet = this.length * this.length / 4
    var exchanget = comparet
    for (var i = 1; i < this.length; i++) {
        for (var j = i; j > 0 ; j--) {
            compare++
            if(less(this[j], this[j - 1])){
                exch(this, j, j - 1)
                exchange++
            }else{
                break
            }
        }
        // virtualize(this, i)
    }
    console.log(this)
    console.log('理论上应该进行约' + comparet + '次比较和' + exchanget + '次交换')
    console.log('实际上进行了' + compare + '次比较和' + exchange + '次交换')
}