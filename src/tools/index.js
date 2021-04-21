export const millisecondsToMinutes = (mss) => {
    let days = parseInt(String(mss / (1000 * 60 * 60 * 24)));
    let hours = parseInt(String((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    let minutes = parseInt(String((mss % (1000 * 60 * 60)) / (1000 * 60)));
    let seconds = parseInt(String((mss % (1000 * 60)) / 1000));
    if (days !== 0)
        return days + " 天 " + hours + " 时 " + minutes + " 分 " + seconds + " 秒 "
    else if (hours !== 0)
        return hours + " 小时 " + minutes + " 分 " + seconds + " 秒 "
    else if (minutes !== 0) {
        return minutes + " 分 " + seconds + " 秒 "
    } else if (seconds !== 0)
        return seconds + " 秒 "
}
export const dateToTime = (str) =>{
    return  new Date(str).toLocaleDateString()
}
export function offsetBodyLeft(ele) {
    let num = 0;
    (function f(ele) {
        num += ele.offsetLeft;
        if (ele.offsetParent && ele.offsetParent.nodeName.toLowerCase() !== 'body') {
            f(ele.offsetParent);
        }
    })(ele)
    return num
}
