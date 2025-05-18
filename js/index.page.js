// JavaScript extracted from index.html
// Responsive box heights
function setEqualHeights() {
    const boxes = document.querySelectorAll('.algo-box');
    let maxHeight = 0;
    boxes.forEach(box => {
        box.style.height = 'auto';
        if (box.offsetHeight > maxHeight) maxHeight = box.offsetHeight;
    });
    boxes.forEach(box => {
        box.style.height = maxHeight + 'px';
    });
}
window.addEventListener('load', setEqualHeights);
window.addEventListener('resize', setEqualHeights);
