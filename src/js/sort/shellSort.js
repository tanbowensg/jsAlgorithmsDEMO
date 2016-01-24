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
                if (less(this, j, j - h)) {
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
    this.procedures = []
    var l = this.length
    var compare = 0
    var exchange = 0
    var comparet = Math.sqrt(l * l * l)
    var exchanget = '?'
        //一个神奇的递增序列
    var list = [0, 1, 5, 19, 41, 109, 209, 505, 929, 2161, 3905, 8929, 16001, 36289, 64769, 146305, 260609]
    var listnum = 1
    var h = 1
    while (h < l / 2) {
        listnum++
        h = list[listnum]
    }
    while (h >= 1) {
        for (var i = h; i < l; i++) {
            for (var j = i; j >= h; j -= h) {
                compare++
                if (this.less(j, j - h)) {
                    this.exch(j, j - h)
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