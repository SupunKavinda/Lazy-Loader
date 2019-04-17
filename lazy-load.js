/**
 * Written by Supun Kavinda <https://twitter.com/SupunWimalasena> 
 * A simple library to lazy load images with `lazy` class and `data-src="https://example.com/path/to/image"`
 */
!(function() {
    /**
     * Checks if the element is in the viewport
     * @param {DOMNode} el Image 
     */
    function inViewport(el) {
        var rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.top <= (window.innerHeight || document.documentElement.clientHeight)
        )
    }
    // Array from node list <https://developer.hyvor.com/js-nodelist-to-array>
    var images = [].slice.call(document.querySelectorAll("img.lazy"));
    /* Handler to run on scroll */
    function handleScroll() {
        for (var i = 0, len = images.length; i < len; i++) {
            if (inViewport(images[i]))
                loadImage(i);
        }
    }
    /* Load the Image */
    function loadImage(i) {
        var el = images[i],
            src = el.getAttribute("data-src");
    
        if (!src)
            return;
        // create new instance
        var image = new Image();
        image.src = src;
        image.onload = function() {
            if (!! el.parent)
                el.parent.replaceChild(img, el)
            else
                el.src = src;
        }
        images.splice(i, 1);
    }
    // run one time
    handleScroll();
    // run on scroll
    window.addEventListener("scroll", handleScroll);
})();
