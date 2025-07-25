<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Visor de peso</title>
  <meta http-equiv="refresh" content="5"> <!-- Refresca cada 5 segundos -->
  <style>
    body {
      font-family: monospace;
      background: #f4f4f4;
      padding: 20px;
    }
    pre {
      background: white;
      padding: 15px;
      border: 1px solid #ccc;
    }
  </style>
</head>
<body>
  <h2>Registro de peso (auto-refresh cada 5 seg)</h2>
  <pre>
<?php
  echo file_get_contents("registro_peso.txt");
?>
  </pre>
</body>
</html>
