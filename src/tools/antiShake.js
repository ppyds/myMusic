const antiShake = function (fun, options) {
    let time
    return () => {
        clearTimeout(time)
        time = setTimeout(() => {
            fun()
        }, 1000)
    }
}
export default antiShake