const fs = require('fs-extra');
const path = require('path');

const changefol = async (fn,fol)=>{

    fs.move(__dirname+`/${fn}`,__dirname+`/profile/${fn}`);

}
const changefolPost = async (fn,fol)=>{
    fs.move(__dirname+`/${fn}`,__dirname+`/post/${fn}`);
}
module.exports = changefol;
module.exports = changefolPost;