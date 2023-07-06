function getCurrentURL(req){
    const protocol = req.connection.encrypted ? 'https' : 'http';
    const host = req.headers.host;
  
    const baseUrl = protocol + '://' + host;

    return baseUrl
}

export default getCurrentURL;