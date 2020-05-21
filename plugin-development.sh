if [ "$1" = "start" ]
then
git clone git@bitbucket.org:supadu/simple-popup.git git
mv git/.git ./
rm -rf git
elif [ "$1" = "stop" ]
then
rm -rf .git
else
echo "no argument provided. do you want to start or stop plugin development"
fi

