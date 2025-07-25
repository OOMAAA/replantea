<?php
$peso = $_POST['peso'] ?? null;
$unidad = $_POST['unidad'] ?? null;

if ($peso !== null && $unidad !== null) {
    $archivo = fopen("registro_peso.txt", "a");
    $fecha = date("Y-m-d H:i:s");
    fwrite($archivo, "$fecha - Peso: $peso $unidad\n");
    fclose($archivo);
    echo "OK";
} else {
    echo "ERROR: Datos faltantes";
}
?>