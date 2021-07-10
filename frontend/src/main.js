import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'

import App from './App'

import './config/bootstrap'
import './config/msgs'
import store from './config/store'
import router from './config/router'

Vue.config.productionTip = false

// Temporario, para teste token de quem não tem autorização
require('axios').defaults.headers.common['Authorization'] = 'bearer' + 
' eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IlNhdWxvIEJyYWdhIiwiYWRtaW4iOnRydWUsImlhdCI6MTYyNDU4MTk3NiwiZXhwIjoxNjI0ODQxMTc2fQ.dfbCLyr7wrdtOT-bY4PyWBBRCuXqevI7u3GABgX1LYY'

//Administrador
//require('axios').defaults.headers.common['Authorization'] = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IlNhdWxvIEJyYWdhIiwiYWRtaW4iOnRydWUsImlhdCI6MTYxOTg3NjI2OSwiZXhwIjoxNjIwMTM1NDY5fQ.6irOqjEP6jVxK-XkaFZ6Z1oFwuPbUBTIHL0XSQMYn4k'

new Vue({
  store,              // importei e pode ser agora compartilhado entre os componentes
  router,
  render: h => h(App)
}).$mount('#app')