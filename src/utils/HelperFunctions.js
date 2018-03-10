

const getTranslatedURL = (url, code, translate) => {
  url = url
    .split('/')
    .filter(p => p !== "")
    .filter(p => p !== "dk")
    .map(p => {
      return translate("routes."+p);
    });

  if(code === "da"){
    url = ["", "dk", ...url];
  }else{
    url = ["", ...url];
  }

  return url.join('/');
}

export{
  getTranslatedURL
}