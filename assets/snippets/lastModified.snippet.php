<?php
/**
 * lastModified
 *
 * Copyright 2016 by demon.devin <demon.devin@gmail.com>
 * Created on 10-07-2016
 *
 * lastModified is free software; you can redistribute it and/or modify it under the
 * terms of the GNU General Public License as published by the Free Software
 * Foundation; either version 2 of the License, or (at your option) any later
 * version.
 *
 * lastModified is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with
 * countTrackula; if not, write to the Free Software Foundation, Inc., 59 Temple
 * Place, Suite 330, Boston, MA 02111-1307 USA
 *
 * @package lastModified
 */
/**
 * lastModified
 *
 * @author     demon.devin
 * @link       PortableAppz.cu.cc/
 * @copyright  2016
 * @package    lastMofified
 * @version    1.0
 * 
 * With this snippet you will have the ability to deliver the most recent version of any file. 
 * When dealing with a browser's cache you can't be certain your viewers are getting the most 
 * recent copy. By appending a GET value (the UNIX timestamp) to, for example, a stylesheet, 
 * you can make the browser think the stylesheet is dynamic, thus reloading the stylesheet time 
 * the modification date changes. 
 *
 * PROPERTIES
 * &path  |  string  |  required  ->  path to the file to download with trailing slash
 * &file  |  string  |  required  ->  filename of the document you wish to use
 *
 * EXAMPLE:
 * Specify a path &path=`css/` and the file &file=`style`. See OUTPUT below for example.
 * Don't for get to use a trailing slash on &path!
 *
 * <link rel="stylesheet" type="text/css" href="[[!lastModified? &path=`css/` &file='style.css']]" />
 *
 * OUTPUT:
 * <link rel="stylesheet" type="text/css" href="style.css?1477050530" />
 */
 
// default settings
$path = $modx->getOption('path', $scriptProperties, '');
$dis = $modx->getOption('dis', $scriptProperties, '');
$file = $modx->getOption('file', $scriptProperties, '');

if ($path === '' || $file === '') {
    return '';
}

$fullPath = rtrim($path, '/\\') . '/' . ltrim($file, '/\\');
$displayPath = rtrim($dis !== '' ? $dis : $path, '/\\') . '/' . ltrim($file, '/\\');

if (!file_exists($fullPath)) {
    return $displayPath;
}

$lastModified = filemtime($fullPath);
return $displayPath . '?' . $lastModified;