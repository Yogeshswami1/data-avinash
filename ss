sudo nano /etc/nginx/sites-available/databackweb.saumic.com



server {
    listen 80;
    server_name databackweb.saumic.com;

    location / {
        proxy_pass http://localhost:9000;  # Assuming your Node.js app is running on port 3000
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    error_log /var/log/nginx/databackweb.saumic.comm.error.log;
    access_log /var/log/nginx/databackweb.saumic.com.h.access.log;
}

sudo ln -s /etc/nginx/sites-available/databackweb.saumic.com /etc/nginx/sites-enabled/

    sudo nano /etc/nginx/sites-available/data.saumic.com

server {
    listen 80;
    server_name data.saumic.com; #  Replace it with your own domain 

    root /var/www/html/data/client/build; # Replace with the path to your build directory
    index index.html;

    location / {
        try_files $uri /index.html;
    }

    error_log /var/log/nginx/data.saumic.com.error.log;
    access_log /var/log/nginx/data.saumic.com.access.log;
}

sudo ln -s /etc/nginx/sites-available/data.saumic.com /etc/nginx/sites-enabled/





sudo nano /etc/nginx/sites-available/databackend.saumic.com

server {
    listen 80;
    server_name databackend.saumic.com;

    location / {
        proxy_pass http://localhost:9000;  # Assuming your Node.js app is running on port 3000
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    error_log /var/log/nginx/databackend.saumic.com.error.log;
    access_log /var/log/nginx/databackend.saumic.com.access.log;
}

sudo ln -s /etc/nginx/sites-available/databackend.saumic.com /etc/nginx/sites-enabled/


sudo nano /etc/nginx/sites-available/datafrontend.saumic.com

server {
    listen 80;
    server_name datafrontend.saumic.com; #  Replace it with your own domain 

    root /var/www/html/data/client/build; # Replace with the path to your build directory
    index index.html;

    location / {
        try_files $uri /index.html;
    }

    error_log /var/log/nginx/datafrontend.saumic.com.log;
    access_log /var/log/nginx/datafrontend.saumic.com.log;
}


sudo certbot --nginx -d data.saumic.com -d databackweb.saumic.com





sudo nano /etc/nginx/sites-available/datasbackend.saumic.com

server {
    listen 80;
    server_name datasbackend.saumic.com;

    location / {
        proxy_pass http://localhost:8800;  # Assuming your Node.js app is running on port 3000
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    error_log /var/log/nginx/datasbackend.saumic.com.error.log;
    access_log /var/log/nginx/datasbackend.saumic.com.access.log;
}


sudo ln -s /etc/nginx/sites-available/datasbackend.saumic.com /etc/nginx/sites-enabled/



sudo nano /etc/nginx/sites-available/datas.saumic.com

server {
    listen 80;
    server_name datas.saumic.com; #  Replace it with your own domain 

    root /var/www/html/checkingdata/client/build; # Replace with the path to your build directory
    index index.html;

    location / {
        try_files $uri /index.html;
    }

    error_log /var/log/nginx/datas.saumic.com;
    access_log /var/log/nginx/datas.saumic.com;
}
