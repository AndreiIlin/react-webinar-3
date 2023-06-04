import { memo, useCallback, useState } from 'react';
import useTranslate from '../../hooks/use-translate.js';
import PageContentLayout from '../../components/page-content-layout/index.js';
import WidthLayout from '../../components/width-layout/index.js';
import Input from '../../components/input/index.js';
import ErrorMessage from '../../components/error-message/index.js';
import { useLocation, useNavigate } from 'react-router-dom';
import useStore from '../../hooks/use-store.js';

function LoginForm() {
  const [error, setError] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const store = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const prevLocation = location.state === '/login' ? '/profile' : location.state ?? '/';
  const callbacks = {
    submitForm: useCallback(async (event) => {
      event.preventDefault();
      try {
        setIsDisabled(true);
        setError('');
        await store.actions.auth.login(window.localStorage, {
          login,
          password,
        });
        navigate(prevLocation, { replace: true });
      } catch (err) {
        setError(err.message);
      } finally {
        setIsDisabled(false);
      }
    }, [login, password]),
  };
  const { t } = useTranslate();
  return (
    <PageContentLayout title={t('login.title')} onSubmit={callbacks.submitForm} Component={'form'} marginTop={'small'}>
      <label htmlFor="username">
        {t('login.login')}
        <WidthLayout>
          <Input name={'username'} id={'username'} type="text" value={login} onChange={setLogin} />
        </WidthLayout>
      </label>
      <label htmlFor="password">
        {t('login.password')}
        <WidthLayout>
          <Input name={'password'} id={'password'} type={'password'} value={password} onChange={setPassword} />
        </WidthLayout>
      </label>
      {error && <ErrorMessage message={error} />}
      <div>
        <button disabled={isDisabled} type={'submit'}>{t('login.enter')}</button>
      </div>
    </PageContentLayout>
  );
}
export default memo(LoginForm);
