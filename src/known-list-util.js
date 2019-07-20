const mongoUtil = require('./mongo-util');
const spinner = require('./spinner');
const farseek = require('./farseek');

function AddNewItem(name, path) {    
    (async () => {
        spinner.start('Loading paths');
        let paths = await mongoUtil.GetPaths();

        spinner.start('Testing for name duplicates');
        for (let path of paths) {
            if (path.name == name) {
                spinner.stop();
                console.error(`❌  Error! The supplied path name (${name}) already exists! [{${path.name}@${path.path}]`);
                process.exit(1);
                return;
            }
        }
        spinner.start('Adding item');
        await mongoUtil.AddNew(name, path);
        spinner.stop();
        console.log('👍  Success!');
        process.exit(0);
    })();
}

function GetItemPathSync(name, callback) {
    (async () => {
        spinner.start('Loading paths');
        let paths = await mongoUtil.GetPaths();
        spinner.start('Looking for ' + name);
        
        for (let obj of paths) {
            if (obj.name == name) {
                spinner.stop();
                callback(obj.path);
            }
        }

        spinner.stop();
        console.error('❌  Could not find ' + name);
        process.exit(1);
    })();
}

function RemoveItem(name) {
    (async () => {
        spinner.start('Loading paths');
        let paths = await mongoUtil.GetPaths();
        let pathToRemove;

        spinner.start('Looking for matching name');
        for (let path of paths) {
            if (path.name == name)
                pathToRemove = path.path;
        }

        if (!pathToRemove) {
            spinner.stop();
            console.error(`❌  Error! The supplied path name (${name}) could not be found in the farseek records`);
            process.exit(1);
            return;
        }

        spinner.start('Removing item');
        await mongoUtil.Remove(name);
        spinner.stop();
        console.log('Please be respectful and only remove paths you added 😊');
        console.log('👍  Success!');
        process.exit(0);
    })();
}

module.exports = { AddNewItem, RemoveItem, GetItemPathSync }