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

$(document).ready(function(){
    var path = location.pathname;
    var indexPath = path.slice(0, path.lastIndexOf('/')) || '/';

    $.ajax({ url: indexPath,
             dataType: 'text',
             success: function(data){
                 var files = data.match(/href="([^"]*.jpg|jpeg|png|gif)"/g);
                 console.log(files);
                 files = files.map(function(p){
                     return p.slice(p.lastIndexOf('/')+1);
                 });
                 console.log(files);
                 files.forEach(function(p){
                     if (p) {
                         $('.slsh-list').append('<img src="'+ p +'">');
                     }
                 });

                 $('.slsh-list img').click(function listclick(ev){
                     var all = $('.slsh-list img').clone();
                     var img = $(this).detach();

                     img.unbind('click');
                     img.click(function(){
                         $('.slsh-list').append(all);
                         $('.slsh-list img').click(listclick);
                         $('.slsh-image').empty();
                     });

                     $('.slsh-list').empty();
                     $('.slsh-image').append(img);
                 });
             }
           });
});
