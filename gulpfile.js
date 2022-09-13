const {
    src,
    dest,
    watch,
    gulp
} = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("autoprefixer");
const postcss = require("gulp-postcss");

function css() {
    const postCssPlugins = [
        autoprefixer({
            cascade: true,
            flexbox: 'no-2009'
        }),
    ];

    return src("sass/style.sass")
        .pipe(sass())
        .pipe(postcss(postCssPlugins))
        .pipe(dest("css"));
}

exports.css = css;

exports.default = function () {
    css();
    watch("sass/**/*.sass", {
        usePolling: true
    }, css);
};