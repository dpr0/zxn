require('./jvgsc')
require("jquery")
// require("./jsspeccy")
import "@fortawesome/fontawesome-free/js/all"
// import 'popper.js'
import { saveAs } from 'file-saver'
// import 'jsspeccy'
import "@hotwired/turbo-rails"
JSSpeccy(document.getElementById('jsspeccy'))

Rails.start()
ActiveStorage.start()
