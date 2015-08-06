var fs = require('fs'),
    typings = require('bower-typings'),
    allTypings = typings(),
    name = 'ex',
    meta = {
        name: name,
        ports: {
            testsite: 7001,
            stress: 7002
        },
        files: {
            src: [
                'typings/*.d.ts',
                'src/_version.ts',
                'src/polyfill/**/*.ts',
                'src/**/*.ts'
            ].concat(typings({includeSelf: false})),
            test: [
                'typings/*.d.ts',
                'test/**/*.ts',
                '!test/lib/**/*.ts',
                'dist/' + name + '.d.ts'
            ].concat(allTypings)
        }
    };

fs.readdirSync('./gulp')
    .forEach(function (file) {
        require('./gulp/' + file)(meta);
    });