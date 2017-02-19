'use strict';
const $ = require('jquery');

const gradient = function (el) {
    let colors = new Array(
        [244, 92, 67],
        [235, 51, 73],
        [255, 81, 47],
        [240, 152, 25],
        [0, 195, 255],
        [255, 255, 28],
        [244, 196, 243],
        [252, 103, 250]);

    let step = 0;
    //color table indices for: 
    // current color left
    // next color left
    // current color right
    // next color right
    let colorIndices = [0, 1, 2, 3];

    //transition speed
    let gradientSpeed = 0.0050;

    function updateGradient() {

        if ($ === undefined) return;

        let c0_0 = colors[colorIndices[0]],
            c0_1 = colors[colorIndices[1]],
            c1_0 = colors[colorIndices[2]],
            c1_1 = colors[colorIndices[3]],

            istep = 1 - step,
            r1 = Math.round(istep * c0_0[0] + step * c0_1[0]),
            g1 = Math.round(istep * c0_0[1] + step * c0_1[1]),
            b1 = Math.round(istep * c0_0[2] + step * c0_1[2]),
            color1 = "rgb(" + r1 + "," + g1 + "," + b1 + ")",

            r2 = Math.round(istep * c1_0[0] + step * c1_1[0]),
            g2 = Math.round(istep * c1_0[1] + step * c1_1[1]),
            b2 = Math.round(istep * c1_0[2] + step * c1_1[2]),
            color2 = "rgb(" + r2 + "," + g2 + "," + b2 + ")";

        el.css({
            background: "-webkit-gradient(linear, left top, right top, from(" + color1 + "), to(" + color2 + "))"
        }).css({
            background: "-moz-linear-gradient(left, " + color1 + " 0%, " + color2 + " 100%)"
        });

        step += gradientSpeed;
        if (step >= 1) {
            step %= 1;
            colorIndices[0] = colorIndices[1];
            colorIndices[2] = colorIndices[3];

            //pick two new target color indices
            //do not pick the same as the current one
            colorIndices[1] = (colorIndices[1] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;
            colorIndices[3] = (colorIndices[3] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;

        }
    }

    setInterval(updateGradient, 10);
}


$(document).ready(function () {
    let headerDesc = 'Я пишу код и могу в UI/UX.',
        currentCharId = 0,
        currentWord = '';

    let liveCoding = setInterval(typing, 80);

    function typing() {
        currentWord += headerDesc[currentCharId];
        currentCharId++;
        $('.header__desc').html(currentWord + '<span class="cursor animated infinite fadeOut">|</span>');

        if (currentCharId >= headerDesc.length)
            clearInterval(liveCoding);

    }

    $('.header__menu_hamburger').on('click', function() {
        $('.header__menu_hamburger_lines').toggleClass('active');
        $('.header__menu_mobile').toggleClass('active');
    });

    $('.as').on('click', function(e) {
        e.preventDefault();
        let anchor = $(this).attr('href');
        scrollToAnchor(anchor);
    });

    $('.as').on('click', function(e) {
        e.preventDefault();
        let anchor = $(this).attr('href');
        scrollToAnchor(anchor);
    });

    gradient($('.header'));
});

function scrollToAnchor(anchor) {
    let tag = $('#' + anchor);
    $('html,body').animate({ scrollTop: tag.offset().top }, 'slow');
}

