import { memo } from 'react';
import useSelector from '../../hooks/use-selector.js';
import PageContentLayout from '../../components/page-content-layout/index.js';
import Spinner from '../../components/spinner/index.js';
import useTranslate from '../../hooks/use-translate.js';

function ProfileInfo() {
  const {t} = useTranslate();

  const select = useSelector(state => ({
    user: state.user.userInfo,
    waiting: state.user.waiting,
    error: state.user.loadingError,
  }))

  return (
    <PageContentLayout title={t('profile.title')}>
      <Spinner active={select.waiting}>
        {select.error && <h2>{select.error}</h2>}
        <p>{t('profile.name')}: <b>{select.user?.profile?.name}</b></p>
        <p>{t('profile.phone')}: <b>{select.user?.profile?.phone}</b></p>
        <p>{t('profile.email')}: <b>{select.user?.email}</b></p>
      </Spinner>
    </PageContentLayout>
  )
}

export default memo(ProfileInfo)
