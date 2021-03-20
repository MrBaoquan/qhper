import qhper from 'qhper/store';
import { Notify, Loading } from 'quasar';
export default ({ app, router, store, Vue }) => {
    // 注册 qhper 存储
    store.registerModule('qhper', qhper);

    router.beforeEach((to, from, next) => {
        const record = to.matched.find((_record) => _record.meta.auth);
        if (!record) {
            next();
        } else {
            //授权处理
            if (!store.getters['qhper/loggedIn']) {
                Loading.show({
                    spinnerColor: 'primary',
                    spinnerSize: 50,
                    backgroundColor: 'white',
                    message: '加载中...',
                    messageColor: 'black',
                });
                store
                    .dispatch('qhper/fetch', { to, from, next })
                    .then((_result) => {
                        Loading.hide();
                        next();
                    })
                    .catch((err) => {
                        Loading.hide();
                        Notify.create({
                            progress: true,
                            multiLine: true,
                            position: 'center',
                            color: 'red',
                            message: '身份鉴权出错:' + err,
                            timeout: 10000,
                        });
                    });
            } else {
                next();
            }
        }
    });
};
