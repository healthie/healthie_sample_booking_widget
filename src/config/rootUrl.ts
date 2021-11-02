let url = "";
if(process.env.NODE_ENV === "development"){
  url = "https://staging-api.gethealthie.com/graphql"
} else {
  switch (process.env.REACT_APP_API_DOMAIN) {
      case "development": { url = "https://staging-api.gethealthie.com/graphql"; break; }
      case "production":  { url = "https://staging-api.gethealthie.com/graphql"; break; }
      default:            { throw new Error("invalid rootUrl config") } 
  };
}

export default url;
