#!/bin/bash
mkdir pw-index
cd pw-index
touch index.html
echo "${1}"


cat > index.html << EOF

<!DOCTYPE html>
<meta charset="utf-8">
<meta http-equiv="refresh" content="0; URL=https://pablowidlert.github.io/volvo-docker-playwright/${1}/">
<meta http-equiv="Pragma" content="no-cache"><meta http-equiv="Expires" content="0">

EOF
