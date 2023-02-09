# Autoheadache

Autoheadache is a WIP mobile application created using React Native. It is a standalone app that does not communicate with a server, but instead uses device storage due to its simplicity and small size.

The application was made from scratch. It utilizes React context for global state managment. Most UI components used are custom created by me.

You can view and use the app by scanning the QR code or entering the link from <a href="https://expo.dev/@nusretwazowski/autoheadache">this page</a> on your Expo Go application.

Alternatively, you can download the APK from <a href="">here</a> and install the app on your Android device

# Usage

The application was made for personal use at my sunday job as a waiter-barista at a family cafe. It allows me to view the layout of the cafe and access to each table in it. On each table, I can add and remove orders at any time, and the sum of all orders is displayed at the bottom. The app also allows me to maintain a list of deptors around the locale. Each deptor can be added and removed orders, as well as have total sum owed, just like for tables. Each deptor can be labeled as "paid", to signify they still have mugs to return.

# Todo

1. Make marking deptor as paid possible on each deptor's page
2. Add possibility to transfer order from table to deptor from each table's page
3. Create a server and transform the app into a customizable cafe app (add user system, owner-only dashboard - add or remove tables, add or remove menu items and their prices, create accounts for employees, have logs of what each employee has done and at what time, etc.)
