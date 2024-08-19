import app from './server'
const PORT = process.env.PORT || 6969

app.listen(PORT, () => {
  console.log(`server on http://localhost:${PORT}`)
})
