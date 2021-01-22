const MONGO_URL_DEV = 'mongodb://localhost:27017/newsexplorer';
const JWT_SECRET_DEV = 'dev-key';

const WRONG_CREDENTIALS_MESSAGE = 'Неправильные почта или пароль';
const BAD_REQUEST_MESSAGE = 'Переданные данные некорректны';
const UNIQUE_USER_ERROR_MESSAGE = 'Пользователь с таким электронным адресом уже существует';
const UNIQUE_ARTICLE_ERROR_MESSAGE = 'Статья с таким URL-адресом уже сохранена';
const USER_CREATION_SUCCESS_MESSAGE = 'Пользователь успешно создан';
const AUTH_REQUIRED_MESSAGE = 'Необходима авторизация';
const NOT_FOUND_MESSAGE = 'Запрашиваемый ресурс не найден';
const WRONG_ARTICLE_ID_MESSAGE = 'Неверный идентификатор статьи';
const ARTICLE_DELETION_FORBIDDEN_MESSAGE = 'Вы не можете удалять статьи, которые были добавлены не вами';
const ARTICLE_ADDITION_SUCCESS_MESSAGE = 'Статья была успешно сохранена';
const MONGO_CONNECTION_SUCCESS_MESSAGE = 'База данных успешно подключена';
const MONGO_CONNECTION_FAIL_MESSAGE = 'Ошибка подключения базы данных';

module.exports = {
  MONGO_URL_DEV,
  JWT_SECRET_DEV,
  WRONG_CREDENTIALS_MESSAGE,
  BAD_REQUEST_MESSAGE,
  UNIQUE_USER_ERROR_MESSAGE,
  UNIQUE_ARTICLE_ERROR_MESSAGE,
  USER_CREATION_SUCCESS_MESSAGE,
  AUTH_REQUIRED_MESSAGE,
  NOT_FOUND_MESSAGE,
  WRONG_ARTICLE_ID_MESSAGE,
  ARTICLE_DELETION_FORBIDDEN_MESSAGE,
  ARTICLE_ADDITION_SUCCESS_MESSAGE,
  MONGO_CONNECTION_SUCCESS_MESSAGE,
  MONGO_CONNECTION_FAIL_MESSAGE,
};
