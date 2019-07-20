const clip = require('clipboardy');

function Copy(str) {
    clip.writeSync(str)
}


function GetFileExt(link) {
    return link.split(/\./).pop();
}

function FormatLink(link, format) {
    
    let ext = GetFileExt(link);
    if (ext == 'js') {
        if (format == 'html')
            return `<script src="${link}"></script>`;
        else if (format == 'pug')
            return `script(src="${link}")`;
    }
    if (ext == 'css' || ext == 'sass' || ext == 'scss') {
        if (format == 'html')
            return `<link rel="stylesheet", href="${link}" />`;
        else if (format == 'pug')
            return `link(rel="stylesheet", href="${link}")`;
    }

    if (format == 'html')
        return `<link href="${link}" />`;
    else if (format == 'pug')
        return `link(href="${link})`;
}

function GetLink(options) {
    if (options.host == 'github') {
        if (options.user && options.repo && options.path) {
            let ext = GetFileExt(options.path);
            let min = (options.min && ext == 'js') ? '.min' : '';
            return `http://cdn.jsdelivr.net/gh/${options.user}/${options.repo}@${options.branch || 'master'}/${options.path.substring(0, options.path.length - ext.length - 1)}${min}.${ext}`;
        }
    } 
    if (options.host == 'npm') {
        if (options.package) {
            if (options.path)
                options.path = '/' + options.path;
            let ext = GetFileExt(options.path);
            let min = (options.min && ext == 'js') ? '.min' : '';
            return `http://cdn.jsdelivr.net/npm/${options.package}@${options.version || 'latest'}${options.path.substring(0, options.path.length - ext.length - 1)}${options.path ? min + '.' + ext : ''}`;
        }
    }
    if (options.path)
        return options.path;
    return null;
}

module.exports = { FormatLink, GetLink, Copy }