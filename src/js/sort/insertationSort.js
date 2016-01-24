Array.prototype.insertationSort = function() {
    this.procedures=[]
    var compare = 0
    var exchange = 0
    var comparet = this.length * this.length / 4
    var exchanget = comparet
    for (var i = 1; i < this.length; i++) {
        for (var j = i; j > 0; j--) {
            compare++
            if (this.less(j, j - 1)) {
                this.exch(j, j - 1)
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