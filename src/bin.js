#!/usr/bin/env node

let program = require('commander');
let farseek = require('./farseek');
let knowns = require('./known-list-util');

program
    .version('Farseek [v1.0.0]\n')
    .command('known')
    .option('-g, --get [package]', 'Selects a package avalible on the known-packages list')
    .option('-a, --add [name]@[package]', 'Creates a commit request to add a package to the global known package library')
    .option('-r, --remove [package]', 'Remove the specified known resource by package name from the global options')
    .option('-f, --format [format]', 'Specify the format for the embed tag. Html & pug / jade currently only supported', 'html')
    .option('-l, --log', 'Print the embed to the console insted of coping it', false)
    .action(cmd => {
        // Add package

        if (!cmd.get && cmd.add) {
            let packageName = cmd.add.split('@').shift();
            let packagePath = cmd.add.substring(packageName.length + 1);
            knowns.AddNewItem(packageName, packagePath);
        }

        // Get package
        else if (cmd.get) {
            knowns.GetItemPathSync(cmd.get, path => {
                let output = farseek.FormatLink(path, cmd.format);
                if (!cmd.log) {
                    farseek.Copy(output);
                    console.log('👍  Embed copied to clipboard!');
                } else console.log(output);
                process.exit(0);
            });
        }

        // Remove package
        else if (cmd.remove)
            knowns.RemoveItem(cmd.remove)
    });

program
    .command('npmjs <package> <path>')
    .option('-m, --min', 'Minify the file. Only avalible for .js files', false)
    .option('-f, --format [format]', 'Specify the format for the embed tag. Html & pug / jade currently only supported', 'html')
    .option('-p, --packageVersion [version]', 'Specify the npm package version to use', 'latest')
    .option('-l, --log', 'Print the embed to the console insted of coping it', false)
    .action((package, path, cmd) => {
        let output = farseek.FormatLink(
            farseek.GetLink(
                {
                    package,
                    path,
                    min: cmd.min,
                    host: 'npm',
                    version: cmd.packageVersion
                }
            ), cmd.format
        );

        if (!cmd.log) {
            farseek.Copy(output);
            console.log('👍  Embed copied to clipboard!');
        } else console.log(output);
    });

program
    .command('github <user> <repo> <path>')
    .option('-m, --min', 'Minify the file. Only avalible for .js files', false)
    .option('-f, --format [format]', 'Specify the format for the embed tag. Html & pug / jade currently only supported', 'html')
    .option('-l, --log', 'Print the embed to the console insted of coping it', false)
    .action((user, repo, path, cmd) => {
        let output = farseek.FormatLink(
            farseek.GetLink(
                {
                    host: 'github',
                    repo,
                    user,
                    min: cmd.min,
                    path
                }
            ), cmd.format
        );

        if (!cmd.log) {
            farseek.Copy(output);
            console.log('👍  Embed copied to clipboard!');
        } else console.log(output);
    });

program.parse(process.argv);