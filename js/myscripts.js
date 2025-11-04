// Lightweight ripple effect for elements with .ripple-btn
(function(){
    function createRipple(e){
        var el = e.currentTarget;
        // ignore right-clicks
        if (e.button && e.button !== 0) return;
        var rect = el.getBoundingClientRect();
        var size = Math.max(rect.width, rect.height) * 1.2;
        var ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.width = ripple.style.height = size + 'px';
        // position center on click
        var x = (e.clientX || (rect.left + rect.width/2)) - rect.left - size/2;
        var y = (e.clientY || (rect.top + rect.height/2)) - rect.top - size/2;
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        // color from data attribute or computed color
        var color = el.getAttribute('data-ripple-color');
        if (!color) {
            var fg = window.getComputedStyle(el).color || 'rgba(0,0,0,0.2)';
            color = fg;
        }
        ripple.style.background = color;
        // ensure cleanup of old ripples
        el.appendChild(ripple);
        setTimeout(function(){
            if (ripple && ripple.parentNode) ripple.parentNode.removeChild(ripple);
        }, 700);
    }

    function addListeners(){
        var items = document.querySelectorAll('.ripple-btn');
        items.forEach(function(it){
            it.addEventListener('mousedown', createRipple);
            // keyboard activation (Enter / Space)
            it.addEventListener('keydown', function(e){
                if (e.key === 'Enter' || e.key === ' ') {
                    createRipple({ currentTarget: it, clientX: it.getBoundingClientRect().left + it.offsetWidth/2, clientY: it.getBoundingClientRect().top + it.offsetHeight/2, button:0 });
                }
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', addListeners);
    } else {
        addListeners();
    }
})();
