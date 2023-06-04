import StoreModule from '../module.js';

const LOCALSTORAGE_KEY = 'ylab'; //TODO По хорошему, наверное, лучше вынести в env
class AuthState extends StoreModule {
  initState() {
    return {
      isLoggedIn: false,
      userData: {},
    };
  }

  /**
   * Инициализация параметров.
   * @param storage {Object} хранилище данных
   */
  init(storage) {
    const data = storage.getItem(LOCALSTORAGE_KEY);
    if (!data) return;
    this.setState({
      ...this.getState(),
      isLoggedIn: true,
      userData: JSON.parse(data),
    }, 'Инициализация данных пользователя');
  }

  /**
   * Вход на сайт
   * @param storage {Object}
   * @param authData {Object}
   */
  async login(storage, authData) {
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
        const errorMessage = json.error.data.issues.reduce((acc, issue, index, issues) => {
          acc += index === issues.length - 1 ? issue.message : `${issue.message}, `;
          return acc;
        }, '');
        throw Error(errorMessage);
      }
      storage.setItem(LOCALSTORAGE_KEY, JSON.stringify(json.result));
      this.setState({
        ...this.getState(),
        isLoggedIn: true,
        userData: json.result,
      }, 'Устанавливаем данные пользователя при логине');
    } catch (err) {
      throw Error(err.message);
    }
  }

  /**
   * Выход с сайта
   * @param storage {Object}
   */
  async logout(storage) {
    const token = this.getState().userData.token;
    if (token) {
      await fetch('/api/v1/users/sign', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': token,
        },
      });
    }
    storage.removeItem(LOCALSTORAGE_KEY);
    this.setState({
      isLoggedIn: false,
      userData: {},
    }, 'Устанавливаем данные пользователя при логауте');
  }
}
export default AuthState;
