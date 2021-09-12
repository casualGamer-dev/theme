#!/bin/sh

if [ ! -f "artisan" ]; then
    echo "Could not find the Artisan file, Moving to Default Location."
    cd /var/www/pterodactyl
fi

if [ ! -f "artisan" ]; then
    echo "We tried to find your Artisan file but we couldnt, Please move to the directory you installed the Panel and re-run this script. Have a Good Day!"
    cd /var/www/pterodactyl
    else

    echo "Your Artisan File has been found!"
    sleep 2

    echo "Checking you have ZIP Installed"
    yum install zip -y 2> /dev/null
    apt install zip -y 2> /dev/null

    echo "Backing up previous panel files in the case that something goes wrong!"
    zip -r PterodactylBackup-$(date +"%Y-%m-%d").zip public resources 2> /dev/null

    echo "Downloading the Theme you picked"
    cp -r MasterThemes/public ..
    cp -r MasterThemes/resources ..
    cp -r MasterThemes/database ..
    cp -r MasterThemes/config ..
    cp -r MasterThemes/app ..
    

    echo "Files have been copied over!"
    sleep 2

    echo "Removing the temp folders created in the copy process"

    cd .. && rm -rf tempdown
    
    echo "Cleaning cache"

    php artisan view:clear
    php artisan cache:clear

    echo "Complete! Have a good day and dont forget to refresh your browser cache! (CTRL + F5)"
    echo "-Will"
fi
