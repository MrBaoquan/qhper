import { axiosInstance } from "boot/axios";
import { Cookies, LocalStorage } from "quasar";
import prompts from "app/quasar.extensions.json";
import { SucceedResponse, URLModifyQueries } from "../utils";

const TOKEN_KEY = "authorization_token";
const AUTH_REDIRECT_KEY = "authorization_redirect";
const API_SERVER = prompts["@mrbaoquan/qhper"].apiServer;
const AUTH_WECHAT_URL = API_SERVER+prompts["@mrbaoquan/qhper"].authWxmpRoute;
const FETCH_USER_ROUTE = prompts["@mrbaoquan/qhper"].fetchUserRoute;

// 授权后跳转的连接地址
export const getAuthRedirectUrl = () => {
    return LocalStorage.getItem(AUTH_REDIRECT_KEY);
};

export const setAuthRedirectUrl = (url) => {
    LocalStorage.set(AUTH_REDIRECT_KEY, url);
};

export const clearAuthRedirectUrl = () => {
    LocalStorage.remove(AUTH_REDIRECT_KEY);
};

export const setToken = (token) => {
    LocalStorage.set(TOKEN_KEY, token);
};

export const getToken = () => {
    return LocalStorage.getItem(TOKEN_KEY);
};

export const clearToken = () => {
    LocalStorage.remove(TOKEN_KEY);
};


// 已经有了token值 开始获取用户信息
const _handleRedirect = (state,resolve,reject) => {
    let _authRedirect = getAuthRedirectUrl();
    if (_authRedirect) {
        // 已经拿到了 token 但是要恢复跳转到之前的链接
        // 跳转到原始访问url
        clearAuthRedirectUrl();
        window.location.href = _authRedirect;
    } else {
        // 现在可以获取用户信息了
        setHeader();
        // 获取用户信息
        state
            .dispatch("pullUser")
            .then((_response) => {
                resolve(_response);
            })
            .catch(reject);
    }
};


// 获取token
// http://quasar.app/#/?access_token=xxxx
export const fetch = async (state, { to, from, next }) => {
    let _url = new URL(window.location.href);
    const _access_token = _url.searchParams.get('access_token');
    return new Promise((resolve, reject) => {
        if (_access_token) {
            setToken(_access_token);
            _handleRedirect(state,resolve,reject);
        } else {
            if (axiosInstance.defaults.headers.common.Authorization) {
                resolve();
            } else if (getToken()) {
                _handleRedirect(state,resolve,reject);
            } else {
                state.dispatch("redirect2Auth");
            }
        }
    });
};

export const redirect2Auth = () => {
    clearToken();
    let _originUrl = URLModifyQueries(window.location.href, {}, ['access_token']);
    setAuthRedirectUrl(_originUrl);
    window.location.href = `${AUTH_WECHAT_URL}?redirect=${window.location.host}`;
};

export const setHeader = () => {
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${getToken()}`;
};

export const getUser = (state) => {
    return axiosInstance.get(FETCH_USER_ROUTE);
};

export const pullUser = (state) => {
    return new Promise((resolve, reject) => {
        state.dispatch("getUser").then((_response) => {
            if (!SucceedResponse(_response)) reject(_response.data.result);
            state.commit("setUser", _response.data.result);
            resolve(_response);
        });
    });
};
