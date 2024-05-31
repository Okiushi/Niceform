const {create, read, update, remove} = require('./crud_module');

create('test',
    {
        name: 'test',
        value: 1
    }
)
