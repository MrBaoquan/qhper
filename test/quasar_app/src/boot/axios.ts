/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { boot } from 'quasar/wrappers';
import axios, { AxiosError, AxiosInstance } from 'axios';
import qs from 'qs';

declare module 'vue/types/vue' {
    interface Vue {
        $axios: AxiosInstance;
    }
}

const axiosInstance: AxiosInstance = axios.create({
    paramsSerializer: params => {
        return qs.stringify(params, { arrayFormat: 'repeat' });
    },
    baseURL: 'http://quasarapp.com'
});

const setErrorInterceptor = (errorFunction: () => void) => {
    axiosInstance.interceptors.response.use(
        response => {
            return response;
        },
        (error: AxiosError) => {
            if (!error.response) {
                errorFunction();
            }
            return Promise.reject(error);
        }
    );
};

const setBaseURL = (baseURL: string) => {
    axiosInstance.defaults.baseURL = baseURL;
};

export { axiosInstance, setErrorInterceptor, setBaseURL };
export default boot(({ Vue, store }) => {
    axiosInstance.interceptors.response.use(
        function(response) {
            return response;
        },
        function(error) {
            // Any status codes that falls outside the range of 2xx cause this function to trigger
            // Do something with response error
            if (error.response.status === 401) {
                store.dispatch('qhper/redirect2Auth');
            }
            return Promise.reject(error);
        }
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    Vue.prototype.$axios = axiosInstance;
});
