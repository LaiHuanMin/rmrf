yarn deploy
rm ../rmrf/* -rf
cp build/* ../rmrf/ -rf
cd ../rmrf/
currentTime=`date`
git checkout master
git add *
git commit -m "${currentTime}"
git push origin master 
