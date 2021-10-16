/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { boot } from 'quasar/wrappers';

export interface User {
    id: number;
    name: string;
    phone: string;
    email: string;
    username: string;
    avatar_url: string;
    roles: [];
}

export interface QHper {
    user: () => User;
    check: (roles: string[] | string) => boolean;
}

export interface QHperStateInterface {
    user: User;
    check: (roles: string[] | string) => boolean;
}

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $qhper: QHper;
    }
}

export default boot(({ app, store }) => {
    // 组织qhper实例
    const qhper: QHper = {
        user: () => store.getters['qhper/user'],
        check: () => store.getters['qhper/check'],
    };

    // 组织用户基本信息
    store.commit('qhper/assembleUser', (data: User) => data);

    // 注入qhper实例
    app.config.globalProperties.$qhper = qhper;
});
