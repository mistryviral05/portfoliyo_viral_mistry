---
title: "How to Host a Next.js Website on a Linux VPS Server"
date: "2024-12-02"
excerpt: "Vps hosting for beginer blog for that"
slug: "nextjs-hosting-linux-vps"
category : "How host website"
---


## Introduction
Hosting a Next.js application on a Linux VPS server involves several steps, including setting up a web server, configuring the server environment, deploying the Next.js app, and ensuring everything is properly configured for production. This guide will walk you through all the necessary steps to host your Next.js app on a Linux VPS.

## Prerequisites
- A Linux-based VPS (Ubuntu, CentOS, Debian, etc.).
- A domain name (optional).
- SSH access to your VPS.
- Node.js installed on your server.
- Nginx installed on your server to reverse proxy to your Next.js app.

## Step 1: Update Your Server
Before starting the setup, make sure your server packages are up to date. Run the following commands to update your server:

```bash
sudo apt update
sudo apt upgrade -y
```

## Step 2: Install Node.js
Next.js requires Node.js to run. You can install Node.js using the NodeSource repository to get the latest version.

1. Add the NodeSource repository:
   
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   ```

2. Install Node.js:
   
   ```bash
   sudo apt install -y nodejs
   ```

3. Verify the installation:

   ```bash
   node -v
   npm -v
   ```

## Step 3: Install Nginx
Nginx will act as a reverse proxy to forward requests to your Next.js application.

1. Install Nginx:

   ```bash
   sudo apt install nginx -y
   ```

2. Start and enable Nginx:

   ```bash
   sudo systemctl start nginx
   sudo systemctl enable nginx
   ```

3. Check the status to ensure it’s running:

   ```bash
   sudo systemctl status nginx
   ```

## Step 4: Configure Nginx
Next, you need to configure Nginx to forward requests to your Next.js application.

1. Create a new Nginx configuration file:

   ```bash
   sudo nano /etc/nginx/sites-available/nextjs
   ```

2. Add the following content to the file (replace `your_domain.com` with your actual domain or IP address):

   ```nginx
   server {
       listen 80;
       server_name your_domain.com www.your_domain.com;

       location / {
           proxy_pass http://localhost:3000;  # Port where your Next.js app will run
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }

       # Optional: Set up HTTPS with Let's Encrypt (if using SSL)
       # include snippets/ssl-params.conf;
   }
   ```

3. Create a symbolic link to enable the site:

   ```bash
   sudo ln -s /etc/nginx/sites-available/nextjs /etc/nginx/sites-enabled/
   ```

4. Test Nginx configuration to ensure it’s correct:

   ```bash
   sudo nginx -t
   ```

5. Reload Nginx:

   ```bash
   sudo systemctl reload nginx
   ```

## Step 5: Deploy Your Next.js Application

1. Clone your Next.js app from your repository (e.g., GitHub):

   ```bash
   git clone https://github.com/yourusername/your-nextjs-app.git
   cd your-nextjs-app
   ```

2. Install the required dependencies:

   ```bash
   npm install
   ```

3. Build your Next.js application for production:

   ```bash
   npm run build
   ```

4. Start your Next.js application:

   ```bash
   npm start
   ```

   By default, Next.js will run on port `3000`. You can access it by navigating to `http://your_domain.com`.

## Step 6: Set Up PM2 for Process Management
To keep your application running in the background, you can use **PM2**, a process manager for Node.js.

1. Install PM2 globally:

   ```bash
   sudo npm install -g pm2
   ```

2. Start your Next.js application with PM2:

   ```bash
   pm2 start npm --name "nextjs-app" -- run start
   ```

3. Save the PM2 process list so it starts on reboot:

   ```bash
   pm2 startup
   pm2 save
   ```

4. To stop or restart your app with PM2:

   ```bash
   pm2 stop nextjs-app
   pm2 restart nextjs-app
   ```

## Step 7: Secure Your Server with SSL (Optional)
If you want to use HTTPS, you can set up a free SSL certificate using **Let’s Encrypt**.

1. Install Certbot:

   ```bash
   sudo apt install certbot python3-certbot-nginx -y
   ```

2. Obtain an SSL certificate:

   ```bash
   sudo certbot --nginx -d your_domain.com -d www.your_domain.com
   ```

3. Test the SSL renewal:

   ```bash
   sudo certbot renew --dry-run
   ```

## Step 8: Final Steps

1. **Ensure your firewall allows HTTP and HTTPS traffic**:

   ```bash
   sudo ufw allow 'Nginx Full'
   sudo ufw enable
   ```

2. **Reboot the server** to ensure everything is set up properly:

   ```bash
   sudo reboot
   ```

3. **Access your site** by navigating to your domain in a browser. You should see your Next.js app running.

## Conclusion
Now your Next.js app is hosted on your Linux VPS with Nginx serving as a reverse proxy and PM2 managing the application process. You have also set up SSL for secure HTTPS access if needed. This setup ensures your app is ready for production and will continue running even after you disconnect from the server.

Happy Hosting!
