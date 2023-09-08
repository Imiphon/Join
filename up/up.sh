#!/bin/bash

echo "Arguments received: $*"

git pull
git add .
git commit -m '$*'
git push


# der Ordner up.sh liegt im Ordner up
#
# um die Berechtung zum Ausführen zu erhalten, vor dem ersten Mal: 
# chmod +x up/up.sh
#
# aufruf mit: 
# up/up.sh "text"