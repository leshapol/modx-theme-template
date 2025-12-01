<?php
/**
 * LoadFonts snippet
 *
 * Generates a single Google Fonts stylesheet link from up to two MODX settings.
 * Loads only the font weights that are used in the styles (400/500/600/700) and
 * lets you optionally pass extra weights through &extraWeight (comma/space separated).
 *
 * Usage example in a chunk:
 * [[!LoadFonts? &font1=`[[++font1]]` &font2=`[[++font2]]` &extraWeight=`800` ]]
 */

$fontSettings = [];
if (!empty($font1)) {
    $fontSettings[] = $font1;
}
if (!empty($font2)) {
    $fontSettings[] = $font2;
}

$defaultWeights = [400, 500, 600, 700];
$extraWeights = [];
if (!empty($extraWeight)) {
    $extraWeights = array_filter(array_map('intval', preg_split('/[\\s,;]+/', (string) $extraWeight)));
}

// Map known font names to available Google Fonts weights.
$map = [
    'Italiana' => [400],
    'Frank Ruhl Libre' => [300, 400, 500, 700],
    'Comfortaa' => [300, 400, 500, 600, 700],
    'Montserrat' => [100, 200, 300, 400, 500, 600, 700, 800, 900],
    'Oswald' => [200, 300, 400, 500, 600, 700],
    'Quicksand' => [300, 400, 500, 600, 700],
    'Roboto' => [100, 300, 400, 500, 700, 900],
    'Istok Web' => [400, 700],
    'Ubuntu' => [300, 400, 500, 700],
    'Jost' => [100, 200, 300, 400, 500, 600, 700, 800, 900],
    'Exo 2' => [100, 200, 300, 400, 500, 600, 700, 800, 900],
    'Play' => [400, 700],
    'Orbitron' => [400, 500, 600, 700, 800, 900],
    'Exo' => [100, 200, 300, 400, 500, 600, 700, 800, 900],
    'Gruppo' => [400],
    'Tenor Sans' => [400],
    'Cardo' => [400, 700],
    'Special Elite' => [400],
    'Marcellus' => [400],
    'Della Respira' => [400],
    'Marcellus SC' => [400],
    'Federo' => [400],
    'Belleza' => [400],
    'Oregano' => [400],
    'Allura' => [400],
];

$families = [];
foreach ($fontSettings as $value) {
    // Normalize values like "'Montserrat', sans-serif" -> "Montserrat".
    $parts = explode(',', $value);
    $name = trim($parts[0], " \t\n\r\0\x0B'\"");
    if ($name && isset($map[$name])) {
        $available = $map[$name];

        $weightsToLoad = array_intersect($available, $defaultWeights);
        if ($extraWeights) {
            $weightsToLoad = array_merge(
                $weightsToLoad,
                array_intersect($available, $extraWeights)
            );
        }

        $weightsToLoad = array_values(array_unique(array_map('intval', $weightsToLoad)));
        sort($weightsToLoad);

        if (empty($weightsToLoad)) {
            continue;
        }

        $familyName = rawurlencode($name);
        if (count($weightsToLoad) > 1 || $weightsToLoad[0] !== 400) {
            $familyName .= ':wght@' . implode(';', $weightsToLoad);
        }

        $families[$name] = $familyName;
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

$hrefEsc = htmlspecialchars($href, ENT_QUOTES, 'UTF-8');

// Allow storing the href in a placeholder if needed elsewhere
if (!empty($toPlaceholder)) {
    $modx->setPlaceholder($toPlaceholder, $href);
}

$preload = '<link rel="preload" as="style" href="' . $hrefEsc . '" />';
$stylesheet = '<link rel="stylesheet" href="' . $hrefEsc . '" media="print" onload="this.media=\'all\'" />';
$noscript = '<noscript><link rel="stylesheet" href="' . $hrefEsc . '" /></noscript>';

return $preload . "\n" . $stylesheet . "\n" . $noscript;