const autoprefixer = require('autoprefixer')

module.exports = {
    plugins: [
        autoprefixer() //主要给css加一些浏览器的前缀，比如-webkit等等，自动处理
    ]
}