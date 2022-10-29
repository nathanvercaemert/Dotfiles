function vercaemert_main() {

    // always dim images
    dim();
    setInterval(dim, 1000);
    
    var url = window.location.href;

    let aldaily_pattern = /.*\.aldaily\..*/
    if (aldaily_pattern.test(url)) {
        aldaily();
    }

    let reddit_pattern = /.*\.reddit\..*/
    if (reddit_pattern.test(url)) {
        reddit();
    }

}

function dim() {
    for (let image of document.getElementsByTagName('img')) {
        if (!image.getAttribute('style')) {
            image.setAttribute('style', '; filter: brightness(50%) !important');
        } else if (!image.getAttribute('style').includes('; filter: brightness(50%) !important')) {
            image.setAttribute('style', image.getAttribute('style')+'; filter: brightness(50%) !important');
        }
    }
    for (let all_divs of document.getElementsByTagName('div')) {
        if (!all_divs.getAttribute('style')) {
            // if there is no style, there is no background image, so do nothing
        } else {
            let style_string = all_divs.getAttribute('style');
            if (style_string.includes('background-image') && !style_string.includes('; filter: brightness(50%) !important')) {
                all_divs.setAttribute('style', style_string+'; filter: brightness(50%) !important');
            }
        }
    }
}

function for_all_decendants(node, function_to_apply) {
    for (var i = 0; i < node.childNodes.length; i++) {
        var child = node.childNodes[i];
        for_all_decendants(child, function_to_apply);
        function_to_apply(child);
    }
}

function make_node_a_button(node) {
    if (typeof node.getAttribute === 'function') {
        var current_role = node.getAttribute('role');
        if (!current_role) {
            node.setAttribute('role', 'button');
        } else if (!current_role.includes('button')) {
            node.setAttribute('role', current_role + ' button');
        }
    }
}

// arts and letters daily
function aldaily() {
    for (let image of document.getElementsByTagName('img')) {
        if (image.getAttribute('src') === '/static/images/header.gif') {
            image.parentNode.removeChild(image);
        }
    }
}

function reddit() {

    // the r/AcademicBiblical icon in the "Related Communities" section
    // blinks and is annoying
    function reddit_remove_blinking_sub_picture() {
        for (let icon of document.getElementsByClassName('_2BR7Oy0CAj5EiSDYQ--CAE')) {
            icon.parentNode.removeChild(icon);
        }
    }
    reddit_remove_blinking_sub_picture();
    setInterval(reddit_remove_blinking_sub_picture, 1000);

    // the banner at the top of subreddits is often too bright
    function reddit_remove_banner() {
        for (let banner of document.getElementsByClassName('_2L5G9B5yaoqW3IegiYN-FL')) {
            banner.parentNode.removeChild(banner);
        }
    }
    reddit_remove_banner();
    setInterval(reddit_remove_banner, 1000);

    // there is an ad for reddit shop that blinks at the top of the page
    function reddit_remove_ad_button() {
        for (let button of document.getElementsByTagName('button')) {
            if (button.getAttribute('class') === "_3hna43Sh0DTnoV7v2NNc2r _2Pmcl9xfKm5qKFFQAOdh-5 _2iuoyPiKHN3kfOoeIQalDT _10BQ7pjWbeYP63SAPNS8Ts HNozj_dKjQZ59ZsfEegz8 ") {
                button.parentNode.removeChild(button);
            }
        }
    }
    reddit_remove_ad_button();
    setInterval(reddit_remove_ad_button, 1000);

    // the option to expand more replies to a thread is not clickable in vimium
    function reddit_make_more_replies_clickable() {
        for (let more_replies of document.getElementsByClassName('_3sf33-9rVAO_v4y0pIW_CH')) {
            if (more_replies.getAttribute('id').includes('moreComments')) {
                for_all_decendants(more_replies, make_node_a_button);
            }
        }
    }
    reddit_make_more_replies_clickable();
    setInterval(reddit_make_more_replies_clickable, 1000);

    function reddit_make_threadlines_clickable() {
        for (let threadline of document.getElementsByClassName('threadline')) {
            make_node_a_button(threadline);
        }
        for (let threadline of document.getElementsByClassName('_36AIN2ppxy_z-XSDxTvYj5 t1_istdj5v undefined')) {
            make_node_a_button(threadline);
        }
    }
    reddit_make_threadlines_clickable();
    setInterval(reddit_make_threadlines_clickable, 1000);

}
