# mmi-admin-dashboard
admin-dashboard

- Setup
    * clone repo    
    * cd repo
    * npm install

- Production Setup
    * clone repo
    * sudo chown -R $USER:$(id -gn $USER) repo
    * npm install
    * copy the dist folder from your local to remote server inside public/admin-lte-3

- Requirements
    * linux server
    * node v12 or higher
    * npm v6 or higher
    * pm2 system process management (https://pm2.keymetrics.io/docs/usage/quick-start/)

- PM2 Startup
    *  PRODUCTION=true pm2 start bin/mmi-admin-dashboard-server --name admin-server