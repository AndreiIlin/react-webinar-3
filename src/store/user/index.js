import StoreModule from '../module.js';

class UserState extends StoreModule {
  initState() {
    return {
      userInfo: {},
      loadingError: '',
      waiting: false,
    };
  }

  async load(token) {
    this.setState({
      userInfo: {},
      loadingError: '',
      waiting: true,
    })
    try {
      const response = await fetch(`/api/v1/users/self?${new URLSearchParams({
        fields: 'email, profile(name, phone)',
      })}`, {
        headers: {
          'Content-Type': 'application/json',
          'X-Token': token,
        },
      });

      const json = await response.json();

      if (json.error) {
        throw Error(json.error.message);
      }

      this.setState({
        ...this.getState(),
        userInfo: json.result,
        loadingError: '',
        waiting: false,
      }, 'Загружены данные о пользователе из АПИ');
    } catch (err) {
      this.setState({
        ...this.getState(),
        loadingError: err.message,
        waiting: false,
      }, 'Произошла ошибка при получении данных пользователя');
    }
  }
}
export default UserState;
