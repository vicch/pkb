$(function() {
    $('.note').before("<p class='admonition-title note'>Note</p>");
    $('.seealso').before("<p class='admonition-title seealso'>See also</p>");
    $('.warning').before("<p class='admonition-title warning'>Warning</p>");
    $('.caution').before("<p class='admonition-title caution'>Caution</p>");
    $('.attention').before("<p class='admonition-title attention'>Attention</p>");
    $('.tip').before("<p class='admonition-title tip'>Tip</p>");
    $('.important').before("<p class='admonition-title important'>Important</p>");
    $('.hint').before("<p class='admonition-title hint'>Hint</p>");
    $('.error').before("<p class='admonition-title error'>Error</p>");
    $('.danger').before("<p class='admonition-title danger'>Danger</p>");
});

$(document).ready(function(){

    // Shift nav in mobile when clicking the menu.
    $(document).on('click', "[data-toggle='wy-nav-top']", function() {
      $("[data-toggle='wy-nav-shift']").toggleClass("shift");
      $("[data-toggle='rst-versions']").toggleClass("shift");
    });
    // Close menu when you click a link.
    $(document).on('click', ".wy-menu-vertical .current ul li a", function() {
      $("[data-toggle='wy-nav-shift']").removeClass("shift");
      $("[data-toggle='rst-versions']").toggleClass("shift");
    });
    $(document).on('click', "[data-toggle='rst-current-version']", function() {
      $("[data-toggle='rst-versions']").toggleClass("shift-up");
    });
    // Make tables responsive
    $("table.docutils:not(.field-list)").wrap("<div class='wy-table-responsive'></div>");
});

$( document ).ready(function() {
    $('#text-table-of-contents ul').first().addClass('nav');
                                        // ScrollSpy also requires that we use
                                        // a Bootstrap nav component.
    $('body').scrollspy({target: '#text-table-of-contents'});

    // add sticky table headers
    // $('table').stickyTableHeaders();

    var $postamble = $('#postamble');
    var $tableOfContents = $('#table-of-contents');
    // set the height of tableOfContents
    // $tableOfContents.height($tableOfContents.height() - $postamble.outerHeight());
});

window.SphinxRtdTheme = (function (jquery) {
    var stickyNav = (function () {
        var navBar,
            win,
            stickyNavCssClass = 'stickynav',
            applyStickNav = function () {
                if (navBar.height() <= win.height()) {
                    navBar.addClass(stickyNavCssClass);
                } else {
                    navBar.removeClass(stickyNavCssClass);
                }
            },
            enable = function() {
                applyStickNav();
                win.on('resize', applyStickNav);
            },
            init = function() {
                navBar = jquery('nav.wy-nav-side:first');
                win    = jquery(window);
            };
        jquery(init);
        return {
            enable : enable
        };
    }());
    return {
        StickyNav : stickyNav
    };
}($));

$(function(){
    $('table').each(function(){

        // 表格隔行背景色
        if ($(this).children('tbody').size() > 0) {
            $i = 0;
            $(this).children('tbody').each(function(){
                if ($i % 2 == 0) {
                    // $(this).children('tr').css('background-color', '#F4F4F4');
                    $(this).children('tr').addClass('color-strip');
                }
                $i += 1;
            });
        }

        // // 测量原始宽度
        // $(this).css('position', 'absolute');
        // $(this).css('width', 'auto');
        // var oldWidth = $(this)[0].offsetWidth;
              
        // if (oldWidth >= 835) {

        //     $(this).addClass('float-table');

        //     // 将表格移动至最左侧，测量自由展开的宽度
        //     $(this).css('left', '0px');
        //     var newWidth = $(this)[0].offsetWidth;
        //     // 如果自由展开宽度过大，则规定一个宽度
        //     if (newWidth >= ($(window).width() - 60)) {
        //         $(this).css('width', $(window).width() - 60);
        //     }

        //     // 水平居中
        //     // var newWidth = $(this)[0].offsetWidth;
        //     // var left = ($(window).width() - newWidth) / 2;
        //     // var left = 387;
        //     // $(this).css('left', left + 'px');
        //     $(this).css('left', 'auto');

        //     // 表格后填充一个空白
        //     if (!$(this).next('.table-placeholder').length) {
        //         var newHeight = $(this)[0].offsetHeight + 36;
        //         if ($(this).find('caption').length) {
        //             newHeight += 32;
        //         }
        //         $(this).after('<div class="table-placeholder" style="height:' + (newHeight)+ 'px;margin:36px 0;">');
        //     }
        
        // } else {
        //     $(this).css('position', 'static');
        // }
    });

    $('.outline-2 a[href^="#"]').click(function(e) {
        var href = $(this).attr('href');

        // 点击页面内链接时，变为点击标题
        if (!href.match('^sec-')) {
            e.preventDefault();

            // 获取所属 section 标题
            var secTitle = $(href).closest('div[class^=outline-text-]').prev('[id^=sec-]');

            // 模拟标题点击
            window.location = '#' + secTitle.attr('id');
        }
    });
});

// $(function(){
//     $('#text-table-of-contents .nav > li').bind('mouseover', function(){
//         if (!$(this).hasClass('active')) {
//             // $(this).children('ul').slideDown(200);
//             $(this).children('ul').children('li').show();
//         }
//     });
//     $('#text-table-of-contents .nav > li').bind('mouseout', function(){
//         if (!$(this).hasClass('active')) {
//             // $(this).children('ul').slideUp(200);
//             $(this).children('ul').children('li').hide();
//         }
//     });
// });

$(function(){
    // 词汇例句部分
    $('pre.example').each(function(){
        var html = $(this).html();
        var oldLines = html.split('\n');
        var newLines = [];
        $.each(oldLines, function(key, value){
            if (value.length > 0) {
                newLines.push(' '.repeat(8) + '<span>' + value + '</span>');
            }
        });
        $(this).html(newLines.join('\n'));
    });
});

// $(function(){
//     MathJax.Hub.Config({
//         jax: [
//             'input/TeX',
//             'input/MathML',
//             'input/AsciiMath',
//             // 'output/HTML-CSS',
//             'output/CommonHTML',
//             'output/PreviewHTML',
//         ],
//         extensions: [
//             'tex2jax.js',
//             'mml2jax.js',
//             'asciimath2jax.js',
//             'MathMenu.js',
//             'MathZoom.js',
//             'AssistiveMML.js',
//             '[Contrib]/a11y/accessibility-menu.js'
//         ],
//         TeX: {
//             extensions: [
//                 'AMSmath.js',
//                 'AMSsymbols.js',
//                 'noErrors.js',
//                 'noUndefined.js'
//             ]
//         }
//     });
// });