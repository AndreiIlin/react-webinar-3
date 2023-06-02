/**
 * Вход на сайт
 * @param authData {Object}
 * @param setUserData {Function}
 * @param storage {Object}
 * @param key {String}
 * @param setLogin {Function}
 */

export async function login(authData, setUserData, storage, key, setLogin) {
  try {
    const response = await fetch(`/api/v1/users/sign?${new URLSearchParams({ fields: 'username' })}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...authData,
        remember: true,
      }),
    });
    const json = await response.json();
    if (json.error) {
      throw Error(json.error.message);
    }
    storage.setItem(key, JSON.stringify(json.result));
    setUserData(json.result);
    setLogin(true);
  } catch (err) {
    throw Error(err.message);
  }
}
/**
 * Выход с сайта
 * @param setUserData {Function}
 * @param storage {Object}
 * @param key {String}
 * @param token {String}
 * @param setLogin {Function}
 */

export async function logout(setUserData, storage, key, token, setLogin) {
  await fetch('/api/v1/users/sign', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'X-Token': token,
    },
  });
  storage.removeItem(key);
  setUserData(null);
  setLogin(false);
}
