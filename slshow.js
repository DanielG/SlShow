/*
 * Clientside only HTML/JavaScript slideshow
 * Copyright (C) 2011  Daniel Gröber <me ät dxld dot at>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

(function(undefined){
    var files = null;
    var allImgs = null;
    var scrollPosition = null;

    $(document).ready(function(){
        var path = location.pathname;
        var indexPath = path.slice(0, path.lastIndexOf('/')) || '/';

        $(window).bind('hashchange', function(){
            display_image(location.hash.slice(1));
        });

        $.ajax({ url: indexPath,
                 dataType: 'text',
                 success: function(data){
                     files = data.match(/href="[^"]*.(jpg|jpeg|png|gif)"/g);

                     files = files.map(function(p){
                         p = p.match(/href="(.*)"/)[1];
                         return p.slice(p.lastIndexOf('/')+1);
                     });

                     files.forEach(function(p){
                         if (p) {
                             $('.slsh-list').append('<img src="'+ p +'">');
                         }
                     });

                     allImgs = $('.slsh-list img').clone();
                     $('.slsh-list').empty();
                     display_list(allImgs);

                     if(location.hash) {
                         console.log(location.hash);
                         change_hash(location.hash);
                     }
                 }
               });
    })

    function change_hash(hash){
        if(location.hash == hash) {
            $(window).trigger('hashchange');
        } else {
            window.location.hash = hash;
        }
    }

    function display_list(images){
        $('.slsh-image').empty();

        $('.slsh-list').append(images);
        $('.slsh-list img').click(function(ev){
            change_hash($(this).attr('src'));
        });

        if(scrollPosition) {
            window.scrollTo(scrollPosition[0], scrollPosition[1]);
        }
    }

    function display_image(src){
        scrollPosition = get_scroll_xy();

        if(src == '') {
            display_list(allImgs);
            return;
        }

        var img = $('img[src="'+ src +'"]').detach();

        // back to list
        img.unbind('click');
        img.click(function(){
            change_hash('');
            display_list(allImgs);
        });

        $('.slsh-list').empty();
        $('.slsh-image').append(img);
    }

    function get_scroll_xy() {
        var scrOfX = 0, scrOfY = 0;
        if( typeof( window.pageYOffset ) == 'number' ) {
            //Netscape compliant
            scrOfY = window.pageYOffset;
            scrOfX = window.pageXOffset;
        } else if( document.body
                   && ( document.body.scrollLeft || document.body.scrollTop )
                 )
        {
            //DOM compliant
            scrOfY = document.body.scrollTop;
            scrOfX = document.body.scrollLeft;
        } else if( document.documentElement
                   && ( document.documentElement.scrollLeft
                        || document.documentElement.scrollTop )
                 )
        {
            //IE6 standards compliant mode
            scrOfY = document.documentElement.scrollTop;
            scrOfX = document.documentElement.scrollLeft;
        }
        return [ scrOfX, scrOfY ];
    }
})();
