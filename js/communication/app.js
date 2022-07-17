export let Request = {
  async post(url) {
    fetch(url).then((response) => {
      return response;
    });
  },

  async get(url, reqData) {
    fetch(url, {
      Method: "GET",
      Headers: {
        Accept: "application.json",
        "Content-Type": "application/json",
      },
      Body: JSON.stringify(reqData),
    }).then((response) => {
      return response.json();
    });
  },
};
