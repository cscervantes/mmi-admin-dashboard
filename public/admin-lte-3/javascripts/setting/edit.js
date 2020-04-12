function editWebsite(ace){
    // $(document).ready(function(){
           
    // })
    let editor = ace.edit("website-selectors")
    editor.setTheme("ace/theme/monokai")
    editor.session.setMode("ace/mode/javascript")
    editor.setFontSize(16)
    editor.setOptions({
        maxLines: 30,
        autoScrollEditorIntoView: true,
    });

    let editor2 = ace.edit("website-snippets")
    editor2.setTheme("ace/theme/monokai")
    editor2.session.setMode("ace/mode/javascript")
    editor2.setFontSize(16)
    editor2.setOptions({
        maxLines: 30,
        autoScrollEditorIntoView: true,
    });
}