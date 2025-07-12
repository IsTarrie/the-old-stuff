function noSave(element){
    element.addEventListener('contextmenu', function(event) {
        event.preventDefault();
    });
    element.addEventListener('dragstart', function(event) {
        event.preventDefault();
    });}let elements = document.querySelectorAll('[data-noSave]');
for(let i=0;i<elements.length;i++){
    noSave(elements[i]);
}document.addEventListener('keydown', function(event) {
    if ((event.ctrlKey || event.metaKey) && (event.key === 's' || (event.shiftKey && event.key === 's'))) {
        event.preventDefault();
    }
});
delete elements;