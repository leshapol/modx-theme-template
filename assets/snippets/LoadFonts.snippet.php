<?php
/**
 * LoadFonts snippet
 *
 * Generates a single Google Fonts stylesheet link from up to two MODX settings.
 *
 * Usage example in a chunk:
 * [[!LoadFonts? &font1=`[[++font1]]` &font2=`[[++font2]]` ]]
 */

$fontSettings = [];
if (!empty($font1)) {
    $fontSettings[] = $font1;
}
if (!empty($font2)) {
    $fontSettings[] = $font2;
}

// Map known font names to Google Fonts API families with weight sets.
$map = [
    'Italiana' => 'Italiana',
    'Frank Ruhl Libre' => 'Frank+Ruhl+Libre:wght@300;400;500;700',
    'Comfortaa' => 'Comfortaa:wght@300;400;500;700',
    'Montserrat' => 'Montserrat:wght@300;400;500;600;700',
    'Oswald' => 'Oswald:wght@300;400;500;700',
    'Quicksand' => 'Quicksand:wght@300;400;500;700',
    'Roboto' => 'Roboto:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700',
    'Istok Web' => 'Istok+Web:ital,wght@0,400;0,700;1,400;1,700',
];

$families = [];
foreach ($fontSettings as $value) {
    // Normalize values like "'Montserrat', sans-serif" -> "Montserrat".
    $parts = explode(',', $value);
    $name = trim($parts[0], " \t\n\r\0\x0B'\"");
    if ($name && isset($map[$name])) {
        $families[$name] = $map[$name];
    }
}

if (empty($families)) {
    return '';
}

$query = '';
foreach ($families as $family) {
    $query .= '&family=' . $family;
}

$href = 'https://fonts.googleapis.com/css2?' . ltrim($query, '&') . '&display=swap';

return '<link rel="stylesheet" href="' . $href . '" />';