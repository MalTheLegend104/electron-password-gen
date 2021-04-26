# electron-password-gen
A password generator written with the node.js and electron.js frameworks.

# Update 1.5.1
This update brings the user settings menu, allowing for themes, an option to automatically copy generated passwords, and a default value so you dont have to input a value for the password every time. Along with the new UX, there was a lot of backend changes to make things operate more smoothly and seemlessly, and it also is a whole lot more readable than it was before.

# Future Plans
I plan to add a zip folder containing the .exe and program files later this week, making it as simple to run as downloading it and running the exe. The next, and likely last, update of this program will add some more settings to make it as conveient as possible to use, like automatically keeping the settings for the checkboxes, and potentially user customizable themes. The last update will also probably contain an installer, so you don't have to worry about trying to get it set up yourself.

## Running the source code
If you would like to use the program in it's current state, you will need to have node.js, electron.js, and electron-forge.js installed. Once those are installed, open a terminal or command line in the folder where `index.html`, `index.js`, and `package.json` are located. In the terminal/command line, type `npm start` and it should run the program. You will have to do this every time to get it to run. Assuming you have electron-forge installed, you can type `npm run make` in the same folder as before, and it should make an executable in the path `./out/password_gen-win32-x64`. You can run this executable at any time through the use of a shortcut, or directly running it from the folder. 
