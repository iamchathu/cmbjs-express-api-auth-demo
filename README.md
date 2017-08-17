# cmbjs-express-api-auth-demo
Demo Repository for My Talk at CMBJS

How to use this repo.

* Clone this repository.
* Rename `config.example.js` to `config.dev.js`
* Add your config to `config.dev.js`
* Add your environment variable to `gulpfile.js`
* Set `MONGO_SEED` variable to `true`
* Open `seed.controller.js` and add your seed login details.
* Run the project using `gulp serve`
* Visit the server by `http://localhost:9080`
* Run seed by visiting `http://localhost:9080/seed`
* Now try to get JWT token by sending a `POST` request using Postman to endpont `http://localhost:9080/auth`

```json
{
  "email":"youremail@domain.com",
  "password":"yourpassword"
}
```


