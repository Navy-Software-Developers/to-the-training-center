export let request = {
    post(url,reqData){
      return fetch(
        url,
        {
          Method: "POST",
          Headers: {
            Accept: "application.json",
            "Content-Type": "application/json",
          },
          Body: JSON.stringify(reqData),
        }
      )
    },
  

  get(url){
    return fetch(url)
  }

};



