import "@fortawesome/fontawesome-free/js/all"
import "@hotwired/turbo-rails"
// import "./controllers"
import jquery from 'jquery'
window.jQuery = jquery
window.$ = jquery

import ace from 'ace-builds/src-noconflict/ace';

// import('./jvgsc')

// require("./jsspeccy")
// import 'popper.js'
import { saveAs } from 'file-saver'
// import 'jsspeccy'
// JSSpeccy(document.getElementById('jsspeccy'))

// Rails.start()
// ActiveStorage.start()

var editor = ace.edit("textarea");
// editor.setTheme("monokai");
// editor.session.setMode("assembly_x86");
editor.setOptions({
    autoScrollEditorIntoView: true,
    copyWithEmptySelection: true,
});
