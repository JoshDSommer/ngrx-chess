#!/bin/bash

commit="$1" 


echo $DIRECTORY

for index in */; 
  do zip -r "${index%/}-${commit%/}.zip" "$index"; 
done;
