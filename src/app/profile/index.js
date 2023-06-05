import { memo } from 'react';
import PageLayout from '../../components/page-layout/index.js';
import LocaleSelect from '../../containers/locale-select/index.js';
import Head from '../../components/head/index.js';
import useTranslate from '../../hooks/use-translate.js';
import useStore from '../../hooks/use-store.js';
import useInit from '../../hooks/use-init.js';
import ProfileInfo from '../../containers/profile-info/index.js';
import Navigation from '../../containers/navigation/index.js';
import AuthorizationBar from '../../containers/authorization-bar/index.js';
import useSelector from '../../hooks/use-selector.js';

function Profile() {
  const { t } = useTranslate();
  const store = useStore();
  const select = useSelector(state => ({
    authError: state.user.error,
    userData: state.auth.userData,
  }));

  useInit(() => {
    store.actions.user.load(select.userData.token);
  }, [select.userData.token]);

  if (select.authError) {
    store.actions.auth.logout();
  }

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
