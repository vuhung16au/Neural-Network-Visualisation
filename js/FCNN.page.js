// JavaScript extracted from FCNN.html

fcnn = FCNN();

function restart() {
    architecture = $('#architecture').find('input[name="numberOfNodes"]').map((i,el) => $(el).val()).get().filter(input => $.isNumeric(input)).map(s => parseInt(s));
    betweenNodesInLayer = $('#architecture').find('input[name="betweenNodesInLayer"]').map((i,el) => parseFloat($(el).val())).get();
    fcnn.redraw({'architecture_':architecture});
    fcnn.redistribute({'betweenNodesInLayer_':betweenNodesInLayer});
    $('#count span:first').text(fcnn.graph.nodes.length+" nodes, "+fcnn.graph.links.length+" edges you don't need to draw yourself! ")
}

restart();

/////////////////////////////////////////////////////////////////////////////
                ///////    Select Styling    ///////
/////////////////////////////////////////////////////////////////////////////

$("#edgeWidthProportional").change(   function() { fcnn.style({'edgeWidthProportional_': this.checked}) });
$("#edgeWidth").change(               function() { fcnn.style({'edgeWidth_': parseFloat(this.value)}) });
$("#edgeOpacityProportional").change( function() { fcnn.style({'edgeOpacityProportional_': this.checked});
    if (this.checked) { $("#edgeOpacity").prop('disabled', true); }
    else { $("#edgeOpacity").prop('disabled', false); }
});
$("#edgeOpacity").change(             function() { fcnn.style({'edgeOpacity_': parseFloat(this.value)}) });
$("#negativeEdgeColor").change(       function() { fcnn.style({'negativeEdgeColor_': this.value}) });
$("#positiveEdgeColor").change(       function() { fcnn.style({'positiveEdgeColor_': this.value}) });
$("#edgeColorProportional").change(   function() { fcnn.style({'edgeColorProportional_': this.checked}) });
$("#defaultEdgeColor").change(        function() { fcnn.style({'defaultEdgeColor_': this.value}) });
$("#nodeDiameter").change(            function() { fcnn.style({'nodeDiameter_': parseFloat(this.value)}) });
$("#nodeColor").change(               function() { fcnn.style({'nodeColor_': this.value}) });
$("#nodeBorderColor").change(         function() { fcnn.style({'nodeBorderColor_': this.value}) });
$("#betweenLayers").change(           function() { fcnn.redistribute({'betweenLayers_': parseFloat(this.value)}) });
$('#nnDirection input:radio').change( function() { fcnn.redistribute({'nnDirection_': this.value}) });
$("#showBias").change(                function() { fcnn.redraw({'showBias_': this.checked}); fcnn.redistribute(); });
$("#showLabels").change(              function() { fcnn.redraw({'showLabels_': this.checked}) });
$("#showArrowheads").change(          function() { fcnn.style({'showArrowheads_': this.checked}) });
$("#arrowhead input:radio").change(   function() { fcnn.style({'arrowheadStyle_': this.value}) });
$("#bezierCurves").change(            function() { fcnn.redistribute({'bezierCurves_': this.checked}) });

/////////////////////////////////////////////////////////////////////////////
                 ///////    Select Architecture    ///////
/////////////////////////////////////////////////////////////////////////////

$(document).on('click', '.btn-add', function(e) {
    e.preventDefault();
    var controlForm = $('#architecture');
    var currentEntry = $(this).parents('.entry:first');
    var newEntry = $(currentEntry.clone()).appendTo(controlForm);
    newEntry.find('input[name="numberOfNodes"]').val('');
    controlForm.find('.entry:not(:last) .btn-add')
        .removeClass('btn-add').addClass('btn-remove')
        .removeClass('btn-primary').addClass('btn-secondary')
        .html('<span class="fa fa-minus"></span>');
    restart();
});

$(document).on('click', '.btn-remove', function(e) {
    e.preventDefault();
    $(this).parents('.entry:first').remove();
    restart();
    return false;
});

$(document).on('change', "input[name='numberOfNodes']", restart);

$(document).on('change', "input[name='betweenNodesInLayer']", restart);  // fix this so we only redistribute

$(document).on('click', '#newRandomWeights', function() {
    link = fcnn.link.data([]);
    fcnn.link.exit().remove();
    restart();
});

// Handler for SLP button - configure a Single Layer Perceptron
$(document).on('click', '#slpButton', function() {
    // Clear existing architecture
    $('#architecture').empty();
    
    // Create the SLP architecture: 3 input nodes, 1 hidden node, 1 output node
    const layers = [
        { nodes: 3, spacing: 20 },
        { nodes: 1, spacing: 20 },
        { nodes: 1, spacing: 20 }
    ];
    
    // Add each layer row to the architecture
    layers.forEach((layer, index) => {
        const isLast = index === layers.length - 1;
        const buttonClass = isLast ? 'btn-primary btn-add' : 'btn-secondary btn-remove';
        const buttonIcon = isLast ? 'plus' : 'minus';
        
        const entryRow = `
            <div class="row entry">
                <div class="input-group mb-2 mr-sm-2 col-4">
                    <button class="btn ${buttonClass} input-group-prepend"><span class="fa fa-${buttonIcon}"></span></button>
                    <input type="number" class="form-control" name="numberOfNodes" step="1" value="${layer.nodes}" />
                </div>
                <input type="range" class="form-control col-4" name="betweenNodesInLayer" min="0" max="100" step="1" value="${layer.spacing}" class="form-range">
            </div>
        `;
        
        $('#architecture').append(entryRow);
    });
    
    // Generate new random weights and update the visualization
    link = fcnn.link.data([]);
    fcnn.link.exit().remove();
    restart();
});

// Handler for MLP button - configure a Multi-Layer Perceptron
$(document).on('click', '#mlpButton', function() {
    // Clear existing architecture
    $('#architecture').empty();
    
    // Create the MLP architecture: 3 input nodes, 4 hidden nodes, 2 hidden nodes, 1 output node
    const layers = [
        { nodes: 3, spacing: 20 }, // Input Layer
        { nodes: 4, spacing: 20 }, // First Hidden Layer
        { nodes: 2, spacing: 20 }, // Second Hidden Layer
        { nodes: 1, spacing: 20 }  // Output Layer
    ];
    
    // Add each layer row to the architecture
    layers.forEach((layer, index) => {
        const isLast = index === layers.length - 1;
        const buttonClass = isLast ? 'btn-primary btn-add' : 'btn-secondary btn-remove';
        const buttonIcon = isLast ? 'plus' : 'minus';
        
        const entryRow = `
            <div class="row entry">
                <div class="input-group mb-2 mr-sm-2 col-4">
                    <button class="btn ${buttonClass} input-group-prepend"><span class="fa fa-${buttonIcon}"></span></button>
                    <input type="number" class="form-control" name="numberOfNodes" step="1" value="${layer.nodes}" />
                </div>
                <input type="range" class="form-control col-4" name="betweenNodesInLayer" min="0" max="100" step="1" value="${layer.spacing}" class="form-range">
            </div>
        `;
        
        $('#architecture').append(entryRow);
    });
    
    // Generate new random weights and update the visualization
    link = fcnn.link.data([]);
    fcnn.link.exit().remove();
    restart();
});

d3.select("#download").on("click", function() {
    // ga('send', 'event', 'downloadSVG', 'FCNN');
    d3.select(this)
      .attr("href", 'data:application/octet-stream;base64,' + btoa(unescape(encodeURIComponent(d3.select("#graph-container").html()))))
      .attr("download", "nn.svg")
});

d3.select("#downloadPNG").on("click", function() {
    // Use the ExportUtils to handle PNG export
    const exportUtils = ExportUtils();
    exportUtils.exportToPNG('graph-container', 'nn.png');
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
        zoomStep: 0.1
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
            case 'f': // Switch to FCNN style (activate tab)
                $(".nav-tabs .nav-link").removeClass('active');
                $(".nav-tabs .nav-link:contains('FCNN style')").addClass('active');
                $(".tab-pane").removeClass('show active');
                $('#FCNN').addClass('show active');
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
