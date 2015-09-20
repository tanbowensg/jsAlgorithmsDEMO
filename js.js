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

var theArray = List(64000, 1000, true)

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