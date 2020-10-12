var active = false;

$( document ).ready(function() {
    
    var copySource = $("#copyPoolID");
    var copyButton = $("#copy_button");
    var clipboard  = new ClipboardJS('#copyPoolIDButton');
    
    clipboard.on('success', function(e) {
        var copyButtonMessage  = "Copied!";
        e.clearSelection();
        copyButton.focus();
        if (active) {
            return;
        } else {
            copyMessageTooltip(copyButton, copyButtonMessage);
        }
    });
    clipboard.on('error', function(e) {
        var copyButtonMessage  = "Press Ctrl+C to copy";
        if (active) {
            return;
        } else {
            copyMessageTooltip(copyButton, copyButtonMessage);
        }
    });
});

function copyMessageTooltip(copyButton, copyButtonMessage) {

    active = true;
    
    var tooltipVisibleTime = 2000; // How long to leave tooltip visible
    var tooltipHideTime    = 100; // matches .inactive animation time
    
    // tooltip
    $('#copyTooltip').text(copyButtonMessage).addClass('active');
    copyButton.attr('aria-describedby','copyTooltip');

    setTimeout(function() {
        $('#copyTooltip').removeClass('active').addClass('inactive');
        // https://css-tricks.com/restart-css-animation/
        
        $('#copyTooltip').replaceWith($('#copyTooltip').clone(true));
        copyButton.removeAttr('aria-describedby');
        setTimeout(function() {
            $('#copyTooltip').removeClass('inactive').text('');
            active = false;
        }, tooltipHideTime);
    }, tooltipVisibleTime);                             

}