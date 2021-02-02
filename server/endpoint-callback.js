const STATUS_OK = 200

module.exports = (controller) => {
  return (req, res) => {
    const httpRequest = {
      body: req.body,
      query: req.query,
      params: req.params,
      ip: req.ip,
      method: req.method,
      path: req.path,
      headers: {
        'Content-Type': req.get('Content-Type'),
        Referer: req.get('referer'),
        'User-Agent': req.get('User-Agent'),
        Authorization: req.get('Authorization')
      }
    }
    controller(httpRequest)
      .then(httpResponse => {
        if(httpResponse.headers){
          res.set(httpResponse.headers)
        }

        res.type('json')
        if(res.status !== STATUS_OK){
          //coloca no redis status erro
        }
        else{
          //coloca no redis com status sucesso
        }
        res.status(httpResponse.statusCode).send(httpResponse.body)
      })
      .catch(err => res.status(500).send({ error: 'An unknown error has ocurred.', message: err.message }))
  }
}