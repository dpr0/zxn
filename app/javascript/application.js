// import "./controllers"
import * as ace from 'ace-builds/src-noconflict/ace';
import "@fortawesome/fontawesome-free/js/all"
import "@hotwired/turbo-rails"
import Rails from "rails-ujs"
import jquery from 'jquery'
window.jQuery = jquery
window.$ = jquery


// import('./jvgsc')

// require("./jsspeccy")
// import 'popper.js'
import { saveAs } from 'file-saver'
// import 'jsspeccy'
// JSSpeccy(document.getElementById('jsspeccy'))

Rails.start()
// ActiveStorage.start()

// var editor = ace.edit("textarea");
// editor.setTheme("ace/theme/monokai");
// editor.session.setMode("ace/mode/assembly_x86");
// editor.setOptions({
//     autoScrollEditorIntoView: true,
//     copyWithEmptySelection: true,
// });
require('ace-builds/src-noconflict/mode-assembly_x86')
require('ace-builds/src-noconflict/theme-monokai')

ace.edit("textarea", {
    mode: "ace-builds/src-noconflict/assembly_x86",
    theme: "ace-builds/src-noconflict/monokai",
    maxLines: 50,
    minLines: 20,
    fontSize: 12,
    autoScrollEditorIntoView: true,
    copyWithEmptySelection: true
});
