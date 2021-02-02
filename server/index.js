const { createServer } = require('../src/routes')
const PORT = 3000

const app = createServer()

app.listen(PORT || process.env.PORT, () => {
    console.log(`Server is listening on port ${PORT}.`)
  })