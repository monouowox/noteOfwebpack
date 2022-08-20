console.log('hello main');
import { sum } from './math'
console.log('sum: ', sum(1, 2, 3));
document.getElementById('btn').onclick = function () {
    // 需要的时候再导入
    import(/* webpackChunkName: "count" */"./count").then((res) => {
        console.log('模块加载成功--res: ', res.count(2, 1));
    }).catch((err) => {
        console.log('模块加载失败--err: ', err);
    })
}