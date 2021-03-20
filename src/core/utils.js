export const SucceedResponse = (response) => {
    return response && response.data && response.data.errorcode == 0;
};

/**
 * 增加或删除URL参数
 * @param {*} url 地址
 * @param {*} add 需要添加的参数
 * @param {*} remove 需要移除的参数
 */
export const URLModifyQueries = (url, add = {}, remove = []) => {
    let _url = new URL(url);
    let _searchParams = _url.searchParams;
    Object.keys(add).forEach((_key) => {
        if (_searchParams.has(_key)) _searchParams.set(_key, add[_key]);
        else _searchParams.append(_key, add[_key]);
    });

    remove.forEach((_key) => {
        if (_searchParams.has(_key)) _searchParams.delete(_key);
    });
    let _queryString =
        [..._searchParams.keys()].length <= 0
            ? ""
            : "?" + _searchParams.toString();
    return `${_url.origin}${_url.pathname}${_queryString}${_url.hash}`;
};
