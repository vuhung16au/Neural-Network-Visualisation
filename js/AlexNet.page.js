// JavaScript extracted from AlexNet.html

alexnet = AlexNet();
var rendererType = 'webgl'; // Default renderer type

function restart() {
    architecture = $('#architecture').find('.entry').map((i,el) =>
        _.object(['height','width','depth','filterHeight','filterWidth','rel_x','rel_y'],
                 $(el).find('input[type="number"]').map((j,input) => parseFloat($(input).val())).get().concat([rand(-0.4,0.4), rand(-0.4,0.4)]))
        ).get()
         .filter(layer => Object.values(layer).every(val => !_.isNaN(val)));

    architecture2 = $('#architecture2').find('input').map((i,el) => $(el).val()).get().filter(input => $.isNumeric(input)).map(s => parseInt(s));

    alexnet.redraw({'architecture_':architecture, 'architecture2_':architecture2});
}

restart();

// Enable PNG download if using SVG renderer
if (rendererType == 'svg') {
    $("#download").removeClass('disabled');
    $("#downloadPNG").removeClass('disabled');
}

// /////////////////////////////////////////////////////////////////////////////
//                 ///////    Select Styling    ///////
// /////////////////////////////////////////////////////////////////////////////

$('#rendererType input:radio').change(function() {
    rendererType = this.value;
    if (rendererType == 'svg') {
        $("#download").removeClass('disabled');
        $("#downloadPNG").removeClass('disabled');
    }
    else if (rendererType == 'webgl') {
        $("#download").addClass('disabled');
        $("#downloadPNG").addClass('disabled');
    }
    $(this).blur();
    alexnet.restartRenderer({'rendererType_':rendererType});
});

$("#color1").change(        function () { alexnet.style({'color1_': this.value}); });
$("#color2").change(        function () { alexnet.style({'color2_': this.value}); });
$("#color3").change(        function () { alexnet.style({'color3_': this.value}); });
$("#fontScale").change(        function () { alexnet.style({'fontScale_': this.value}); });
$("#rectOpacity").change(   function () { alexnet.style({'rectOpacity_': parseFloat(this.value)}); $(this).blur(); });
$("#filterOpacity").change( function () { alexnet.style({'filterOpacity_': parseFloat(this.value)}); $(this).blur(); });
$("#betweenLayers").change( function () { alexnet.redraw({'betweenLayers_': parseFloat(this.value)}); $(this).blur(); });
$("#logDepth").change(      function () { alexnet.redraw({'logDepth_': this.checked}); });
$("#depthScale").change(    function () { alexnet.redraw({'depthScale_': parseFloat(this.value)}); $(this).blur(); $("#depthSpan").text(this.value); });
$("#logWidth").change(      function () { alexnet.redraw({'logWidth_': this.checked}); });
$("#widthScale").change(    function () { alexnet.redraw({'widthScale_': parseFloat(this.value)}); $(this).blur(); $("#widthSpan").text(this.value); });
$("#logConvSize").change(   function () { alexnet.redraw({'logConvSize_': this.checked}); });
$("#convScale").change(     function () { alexnet.redraw({'convScale_': parseFloat(this.value)}); $(this).blur(); $("#convSpan").text(this.value); });
$("#showDims").change(      function () { alexnet.redraw({'showDims_': this.checked}); });
$("#showConvDims").change(  function () { alexnet.redraw({'showConvDims_': this.checked}); });

// /////////////////////////////////////////////////////////////////////////////
//                  ///////    Select Architecture    ///////
// /////////////////////////////////////////////////////////////////////////////

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

$(document).on('change', 'input', function(e) {
    e.preventDefault();
    restart();
});

$("#download").on("click", function() {
    // ga('send', 'event', 'downloadSVG', 'AlexNet');
    $(this).attr("href", 'data:application/octet-stream;base64,' + btoa(unescape(encodeURIComponent($('<div>').append($( $("#graph-container").html()).attr("xmlns", "http://www.w3.org/2000/svg") ).html()))))
           .attr("download", "nn.svg")
});

$("#downloadPNG").on("click", function(e) {
    e.preventDefault();
    // Use the ExportUtils to handle PNG export
    const exportUtils = ExportUtils();
    exportUtils.exportToPNG('graph-container', 'alexnet.png');
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
