let editor = ace.edit("filter-div")
editor.setTheme("ace/theme/monokai")
editor.session.setMode("ace/mode/json")
editor.setFontSize(16)
editor.setOptions({
    maxLines: 30,
    autoScrollEditorIntoView: true,
});

let editor2 = ace.edit("filter-div2")
editor2.setTheme("ace/theme/monokai")
editor2.session.setMode("ace/mode/json")
editor2.setFontSize(16)
editor2.setOptions({
    maxLines: 30,
    autoScrollEditorIntoView: true,
});

let editor3 = ace.edit("scraper-div")
editor3.setTheme("ace/theme/monokai")
editor3.session.setMode("ace/mode/javascript")
editor3.setFontSize(16)
editor3.setOptions({
    maxLines: 30,
    autoScrollEditorIntoView: true,
});

