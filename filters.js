import timeago from 'timeago.js'

const getTabInfo = (tab, good, top, isClass) => {
    let str = '';
    let className = '';
    if (top) {
        str = '置顶';
        className = 'top';
    } else if (good) {
        str = '精华';
        className = 'good';
    } else {
        switch (tab) {
            case 'share':
                str = '分享';
                className = 'share';
                break;
            case 'ask':
                str = '问答';
                className = 'ask';
                break;
            case 'job':
                str = '招聘';
                className = 'job';
                break;
            default:
                str = '暂无';
                className = 'default';
                break;
        }
    }
    return isClass ? className : str;
}

const getTimeStr=(time)=>{
    let timeagoInstance = new timeago();
    const str=timeagoInstance.format(time,'zh_CN');
    return str
}

export {getTabInfo,getTimeStr}
