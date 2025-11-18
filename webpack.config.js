const path = require('path');

module.exports = {
    mode: "production",
    entry: {
        index: './src/public/index/index.js',
        admin: './src/public/admin/admin.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'public/js'),
    },
};