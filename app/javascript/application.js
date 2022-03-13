require("jquery")
import jquery from "jquery"
window.jQuery = jquery
window.$ = jquery

require('./jvgsc')

// require("./jsspeccy")
import "@fortawesome/fontawesome-free/js/all"
// import 'popper.js'
import { saveAs } from 'file-saver'
// import 'jsspeccy'
import "@hotwired/turbo-rails"
JSSpeccy(document.getElementById('jsspeccy'))

Rails.start()
ActiveStorage.start()
