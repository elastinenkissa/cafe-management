# Autoheadache

Autoheadache is a mobile application for Android and iOS (latter not tested) created using React Native for the frontend and Node, Express and MongoDB for the backend, using TypeScript.

The app uses Axios for communicating with the server, React context for global state management, custom hooks for cleaner frontend code and Express Async Errors for cleaner backend code (eliminating try-catch blocks from controllers).

# Usage

The application was originally made for personal use at my sunday job as a waiter-barista at a family cafe. It has been restructured to be usable in same manner by anyone that downloads the app.

The app initially offers the user to login or register. Registering provides both creating a new user and a new cafe which gets the created user assigned as its owner. Logging in can be done by a registered user (owner) or by a user created by a cafe owner.

After logging in, users can add orders to each table and deptor present in the cafe, add new deptors, cancel orders from each, mark tables and deptors as paid (marking tables as paid clears orders from them while marking deptors as paid completely removes them). Users can also transfer orders from a table or from another deptor to a new deptor.

Users can also view logs of actions made by every single employee in the cafe. Owners of the cafe can additionally add employees to their cafe through the UI (which is essentially registering a user without creating a new cafe for them), as well as remove them (completely deletes the user and removes access from the cafe). Owners can also add and remove tables to and from their cafe, as well as manage menu items, their names and prices.

# Todo

1. Finish the app up (polish UI, add funcitonality for owner to edit names of employees, names and prices of menu items, cafe currency, etc.)
2. Add global error popup
3. Upload the app for sale on Google Play (after finding a way to pay $25 developer fee)
4. (Optional) Replace the states in NewMenuItem with a reducer
