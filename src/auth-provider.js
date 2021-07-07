// const apiUrl = process.env.QUESTIONNAIRES_APP_API_URL;

const apiUrl = "http://121.36.47.113:3000";

const localStorageKey = "__questionnaire_user_auth_provider_key__";

export const getToken = () => window.localStorage.getItem(localStorageKey);

const handleResponse = ({ user }) => {
  window.localStorage.setItem(localStorageKey, user.token || "");
  return user;
};

export const login = (data) => {
  return fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handleResponse(await response.json());
    } else {
      return Promise.reject(await response.json());
    }
  });
};

export const register = (data) => {
  return fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handleResponse(await response.json());
    } else {
      return Promise.reject(await response.json());
    }
  });
};

export const logout = async () => {
  window.localStorage.removeItem(localStorageKey);
};
