import { memo } from 'react';
import PageLayout from '../../components/page-layout/index.js';
import LocaleSelect from '../../containers/locale-select/index.js';
import Head from '../../components/head/index.js';
import useTranslate from '../../hooks/use-translate.js';
import useStore from '../../hooks/use-store.js';
import { useAuth } from '../../hooks/use-auth.js';
import useInit from '../../hooks/use-init.js';
import ProfileInfo from '../../containers/profile-info/index.js';
import Navigation from '../../containers/navigation/index.js';
import AuthorizationBar from '../../containers/authorization-bar/index.js';

function Profile() {
  const auth = useAuth();
  const { t } = useTranslate();
  const store = useStore();
  useInit(() => {
    store.actions.user.load(auth.userData.token);
  }, [auth.userData.token]);
  return (
    <PageLayout head={<AuthorizationBar />}>
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <ProfileInfo />
    </PageLayout>
  );
}
export default memo(Profile);
