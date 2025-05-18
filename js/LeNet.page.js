// JavaScript extracted from LeNet.html

lenet = LeNet();

function restart() {
    architecture = $('#architecture').find('.entry').map((i,el) =>
        _.object(['numberOfSquares','squareHeight','squareWidth','filterHeight','filterWidth', 'op', 'layer'],
                 $(el).find('input[type="number"]').map((j,input) => parseFloat($(input).val())).get().concat([$(el).find('input[type="text"]').val(), i]))
        ).get()
         .filter(layer => Object.values(layer).every(val => !_.isNaN(val)));

    betweenLayers = $('#architecture').find('input[type="range"]').map((i,el) => $(el).val()).get().filter(input => $.isNumeric(input)).map(s => parseInt(s)); betweenLayers.pop();

    architecture2 = $('#architecture2').find('input').map((i,el) => $(el).val()).get().filter(input => $.isNumeric(input)).map(s => parseInt(s));
    
    sqrtLength = $('#sqrtLength').prop('checked');
    lengthScale = parseFloat($('#lengthScale').prop('value'));

    lenet.redraw({'architecture_':architecture, 'architecture2_':architecture2, 'sqrtLength_': sqrtLength, 'lengthScale_': lengthScale});
    lenet.redistribute({'betweenLayers_':betweenLayers});
}

restart();

/////////////////////////////////////////////////////////////////////////////
                ///////    Select Styling    ///////
/////////////////////////////////////////////////////////////////////////////

$("#color1").change(         function () { lenet.style({'color1_': this.value}); });
$("#color2").change(         function () { lenet.style({'color2_': this.value}); });
$("#borderWidth").change(    function () { lenet.style({'borderWidth_': parseFloat(this.value)}); });
$("#rectOpacity").change(    function () { lenet.style({'rectOpacity_': parseFloat(this.value)}); });
$("#betweenSquares").change( function () { lenet.redistribute({'betweenSquares_': parseFloat(this.value)}); });
$("#showLabels").change(     function () { lenet.style({'showLabels_': this.checked}); });

$("input[name='spacing']").change(function() {
    betweenLayers = $('#architecture').find('input[type="range"]').map((i,el) => $(el).val()).get().filter(input => $.isNumeric(input)).map(s => parseInt(s)); betweenLayers.pop();
    lenet.redistribute({'betweenLayers_':betweenLayers});
});

/////////////////////////////////////////////////////////////////////////////
                 ///////    Select Architecture    ///////
/////////////////////////////////////////////////////////////////////////////

$(document).on('click', '#architecture .btn-add', function(e) {
    e.preventDefault();
    var controlForm = $('#architecture');
    var currentEntry = $(this).parents('.entry:first');
    var newEntry = $(currentEntry.clone()).appendTo(controlForm);
    newEntry.find('input').val('');
    controlForm.find('.entry:not(:last) .btn-add')
        .removeClass('btn-add').addClass('btn-remove')
        .removeClass('btn-primary').addClass('btn-secondary')
        .html('<span class="fa fa-minus"></span>');
    restart();
});

$(document).on('click', '#architecture .btn-remove', function(e) {
    e.preventDefault();
    $(this).parents('.entry:first').remove();
    restart();
    return false;
});

$(document).on('click', '#architecture2 .btn-add', function(e) {
    e.preventDefault();
    var controlForm = $('#architecture2');
    var currentEntry = $(this).parents('.entry:first');
    var newEntry = $(currentEntry.clone()).appendTo(controlForm);
    newEntry.find('input').val('');
    controlForm.find('.entry:not(:last) .btn-add')
        .removeClass('btn-add').addClass('btn-remove')
        .removeClass('btn-primary').addClass('btn-secondary')
        .html('<span class="fa fa-minus"></span>');
    restart();
});

$(document).on('click', '#architecture2 .btn-remove', function(e) {
    e.preventDefault();
    $(this).parents('.entry:first').remove();
    restart();
    return false;
});

$(document).on('change', 'input[type="number"]', function(e) {
    e.preventDefault();
    restart();  // TODO only fire if the whole row is filled.
});

$(document).on('change', 'input[type="text"]', function(e) {
    e.preventDefault();
    restart();
});

$(document).on('change', '#sqrtLength', function(e) {
    e.preventDefault();
    restart();
});

$(document).on('change', '#lengthScale', function(e) {
    e.preventDefault();
    $("#lengthSpan").text(e.target.value)
    restart();
});

d3.select("#download").on("click", function() {
    // ga('send', 'event', 'downloadSVG', 'LeNet');
    d3.select(this)
      .attr("href", 'data:application/octet-stream;base64,' + btoa(unescape(encodeURIComponent(d3.select("#graph-container").html()))))
      .attr("download", "nn.svg")
});

d3.select("#downloadPNG").on("click", function() {
    // Use the ExportUtils to handle PNG export
    const exportUtils = ExportUtils();
    exportUtils.exportToPNG('graph-container', 'lenet.png');
});

// Add event handler for the settings toggle button
$(document).ready(function() {
    // Check for saved preference
    const settingsVisible = localStorage.getItem('nnVisualsSettingsVisible') !== 'false';
    // Apply initial state
    if (!settingsVisible) {
        $('.nn-picker').addClass('hidden');
    }
    // Toggle settings panel visibility
    $('#toggleSettings').on('click', function() {
        const $nnPicker = $('.nn-picker');
        const isVisible = !$nnPicker.hasClass('hidden');
        if (isVisible) {
            $nnPicker.addClass('hidden');
            localStorage.setItem('nnVisualsSettingsVisible', 'false');
        } else {
            $nnPicker.removeClass('hidden');
            localStorage.setItem('nnVisualsSettingsVisible', 'true');
        }
    });
    // Initialize zoom controls
    const zoomControl = ZoomControl();
    zoomControl.init({
        minZoom: 0.5,
        maxZoom: 3.0,
        zoomStep: 0.1,
        initialZoom: 0.9
    });
});

// Keyboard shortcuts for NN-Visuals
(function() {
    function isInputFocused() {
        const tag = document.activeElement.tagName.toLowerCase();
        return tag === 'input' || tag === 'textarea' || document.activeElement.isContentEditable;
    }
    document.addEventListener('keydown', function(e) {
        if (isInputFocused()) return;
        switch (e.key.toLowerCase()) {
            case 'h': // Toggle settings panel
                const $nnPicker = $('.nn-picker');
                $nnPicker.toggleClass('hidden');
                localStorage.setItem('nnVisualsSettingsVisible', !$nnPicker.hasClass('hidden'));
                break;
            case 'f': // Switch to FCNN style (go to index.html)
                window.location.href = 'index.html';
                break;
            case 'l': // Switch to LeNet style
                window.location.href = 'LeNet.html';
                break;
            case 'a': // Switch to AlexNet style
                window.location.href = 'AlexNet.html';
                break;
            case 'z': // Zoom in
                if (typeof zoomControl !== 'undefined' && zoomControl.zoomIn) zoomControl.zoomIn();
                break;
            case 'x': // Zoom out
                if (typeof zoomControl !== 'undefined' && zoomControl.zoomOut) zoomControl.zoomOut();
                break;
        }
    });
})();
