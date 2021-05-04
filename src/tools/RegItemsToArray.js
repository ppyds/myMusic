export default RegItemsToArray = (arr, fun) => {
    let reg = []
    for (let i = 0; i < arr.length; i++) {
        let item = arr[i]
        let newItem = fun(item, i)
        if (typeof newItem !== 'undefined')
            reg.push(newItem)
    }
}
