Array.prototype.selectionSort = function() {
    this.procedures = []
    var compare = 0
    var exchange = 0
    var comparet = this.length * (this.length - 1) / 2
    var exchanget = this.length
        //正式算法内容-----------------
    for (var i = 0; i < this.length; i++) {
        var min = i
        for (var j = i + 1; j < this.length; j++) {
            compare++
            if (this.less(j, min)) {
                min = j
            }
        }
        this.exch(i, min, min)
        exchange++
        // virtualize(this, i)
    }
    //正式算法内容-------------------
    console.log(this)
    console.log('理论上应进行约' + comparet + '次比较和' + exchanget + '次交换')
    console.log('实际上进行了共' + compare + '次比较和' + exchange + '次交换')
}