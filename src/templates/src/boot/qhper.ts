/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { boot } from 'quasar/wrappers';

export interface User {
  id: number;
  email: string;
  username: string;
  avatar_url: string;
}

export interface QHper {
  user: () => User;
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
  };

  // 组织用户基本信息
  store.commit('qhper/assembleUser', (data: User) => data);

  // 注入qhper实例
  app.config.globalProperties.$qhper = qhper;
});
