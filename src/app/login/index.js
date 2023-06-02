import PageLayout from '../../components/page-layout/index.js';
import AuthorizationBar from '../../containers/authorization-bar/index.js';
import Head from '../../components/head/index.js';
import LocaleSelect from '../../containers/locale-select/index.js';
import Navigation from '../../containers/navigation/index.js';
import useTranslate from '../../hooks/use-translate.js';
import { memo } from 'react';
import LoginForm from '../../containers/login-form/index.js';

function Login() {
  const { t } = useTranslate();
  return (
    <PageLayout head={<AuthorizationBar />}>
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <LoginForm />
    </PageLayout>
  );
}
export default memo(Login);
