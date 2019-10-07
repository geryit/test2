// const dev = process.env.NODE_ENV !== 'production';
const gulp = require('gulp');
// const fs = require('fs');
const less = require('gulp-less');
const sass = require('gulp-sass');
const connect = require('gulp-connect');
// const gulpIf = require('gulp-if');

const concat = require('gulp-concat');

const nano = require('gulp-cssnano');
const uncss = require('gulp-uncss');
const clean = require('gulp-clean');
const bless = require('gulp-bless');
const rsync = require('gulp-rsync');
const gutil = require('gulp-util');
// const penthouse = require('penthouse');
// const mkdirp = require('mkdirp');
const rev = require('gulp-rev');
const webp = require('gulp-webp');

// const JS_SRC = 'pages/**/*.js';
// const JS_DEST = 'pages';

const SEM_SRC = '_semantic/semantic.less';
const SEM_WATCH_SRC = '_semantic/**/**';

const SASS_SRC = '_scss/base.scss';
const SASS_WATCH_SRC = '_scss/**/*.scss';

const DEV_CSS_DEST = 'static/css/uncompressed/';
// becase of concat order, we need to use absolute
const DEV_CSS_WATCH_SRC = [`${DEV_CSS_DEST}semantic.css`, `${DEV_CSS_DEST}base.css`];


const FINAL_CSS_FILENAME = 'site.css';
const FINAL_CSS_DEST = 'static/css/';
const FINAL_CSS = `${FINAL_CSS_DEST}${FINAL_CSS_FILENAME}`;

const ALL_CSS = `${FINAL_CSS_DEST}**.css`;

const HASHED_CSS = () => FINAL_CSS_DEST + require('./public/static/css/rev-manifest')['site.css'];

const includePaths = [
  './node_modules/react-dates/lib/css/',
  './node_modules/react-intl-tel-input/src/styles/',
];

const cleanAllCss = () => gulp.src(ALL_CSS, { read: false })
  .pipe(clean());

// const cleanCss = () => gulp.src(FINAL_CSS_DEST, { read: false })
//   .pipe(clean());

const cleanUncompressedCss = () => gulp.src(DEV_CSS_DEST, { read: false })
  .pipe(clean());

// const cleanHtmlExportUnusedFolders = () => gulp.src([
//   '_html_export/_next'], { read: false })
//   .pipe(clean());

const blessCSS = ({ f = HASHED_CSS(), url = '' }) => gulp.src(f)
  .on('end', () => { gutil.log(url, f); })
  .pipe(bless({ log: true }));
  // .pipe(connect.reload());
// .pipe(gulp.dest('./'));


const devCss = () => gulp.src(DEV_CSS_WATCH_SRC)
  // .pipe(sourcemaps.init({ loadMaps: true }))
  .pipe(concat(FINAL_CSS_FILENAME))
  // .pipe(sourcemaps.write())
  .pipe(gulp.dest(FINAL_CSS_DEST))
  // .on('end', () => blessCSS())
  .pipe(connect.reload());
  // .on('end', () => cleanHtmlExportUnusedFolders())


const prodCss = () => gulp.src(FINAL_CSS)
  .pipe(uncss({
    html: ['./_html_export/**/*.html'],
  }))
  .pipe(nano())
  .pipe(rev())
  .pipe(gulp.dest(FINAL_CSS_DEST))
  .pipe(rev.manifest())
  .pipe(gulp.dest(FINAL_CSS_DEST))
  .on('end', () => cleanUncompressedCss())
  .on('end', () => blessCSS({}))
  .on('end', () => gulp.src(FINAL_CSS, { read: false }).pipe(clean()));
//
// gulp.src(FINAL_CSS)
// .pipe(postcss([
//   postcssUncss({
//     stylesheets: ['static/css/site.css'],
//     html: ['./_html_export/**/*.html'],
//     timeout: 0,
//     report: false,
//     ignore: [
//       /.*.(no-horizontal-padding|embed-modal).*/,
//     ],
//   }),
//   cssnano({ discardComments: { removeAll: true } }),
// ]))
// .pipe(gulp.dest(FINAL_CSS_DEST))
// .on('end', () => cleanUncompressedCss())
// .on('end', () => blessCSS({}));


gulp.task('watch', () => {
  // livereload.listen();
  gulp.watch(SEM_WATCH_SRC, ['semantic-less', () => devCss()]);
  gulp.watch(SASS_WATCH_SRC, ['sass', () => devCss()]);
  // gulp.watch(DEV_CSS_WATCH_SRC, [','dev_css'']);
  // gulp.watch(JS_SRC, ['lint-n-fix']);
});

gulp.task('connect', () => {
  connect.server({
    livereload: true,
    port: 8085,
  });
});

gulp.task('semantic-less', () => gulp.src(SEM_SRC)
  // .pipe(plumber())
  // .pipe(sourcemaps.init())
  .pipe(less())
  // .pipe(sourcemaps.write())
  .pipe(gulp.dest(DEV_CSS_DEST)));

gulp.task('sass', () => gulp.src(SASS_SRC)
  .pipe(sass({
    includePaths,
  }))
  // .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  // .pipe(sourcemaps.write())
  .pipe(gulp.dest(DEV_CSS_DEST)));


gulp.task('rsync', () => {
  gulp.src('./')
    .pipe(rsync({
      username: 'ubuntu',
      hostname: '52.1.186.176',
      destination: '/home/ubuntu/c.geryit.com/',
      recursive: true,
      archive: true,
      silent: false,
      compress: true,
      progress: true,
      clean: true,
      exclude: ['.git', 'node_modules', '.next', '.idea', '*.iml',
        '.DS_Store', '.editorconfig', '.gitignore', '*.md',
        '.sass-cache', '.eslintrc', '_html_export/next', 'newrelic_agent.log'],
    }));
});


// const cssNano = ({ src, dest }) => gulp.src(src)
//   .pipe(nano())
//   .pipe(gulp.dest(dest));
//   // .on('end', () => blessCSS(src));

// const concatFiles = ({ src, file, dest }) => gulp.src(src)
//   .pipe(concat(file))
//   .pipe(gulp.dest(dest))
//   .on('end', () => blessCSS({ f: dest + file }))
//   .on('end', () => cssNano({ src: dest + file, dest }));


// const criticalCSS = (urls) => {
//   urls.map((url, i) => setTimeout(() => penthouse({
//     url, // can also use file:/// protocol for local files
//     css: './static/css/site.css', // path to original css file on disk
//
//     // OPTIONAL params
//     width: 1300, // viewport width
//     height: 900, // viewport height
//     keepLargerMediaQueries: false, // when true, will not filter out larger media queries
//     // forceInclude: [ // selectors to keep
//     //   '.four',
//     // ],
//     propertiesToRemove: [
//       '(.*)transition(.*)',
//       // 'font-family',
//       // 'src',
//       'line-height',
//       'cursor',
//       'pointer-events',
//       '(-webkit-)?tap-highlight-color',
//       '(.*)user-select',
//       'font-face',
//       'loader',
//     ],
//     timeout: 300000, // ms; abort critical CSS generation after this timeout
//     strict: false, // set to true to throw on CSS errors (will run faster if no errors)
//     maxEmbeddedBase64Length: 10000, // characters; strip out inline base64 encoded resources larger than this
//     // userAgent: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
//     renderWaitTime: 100, // ms; render wait timeout before CSS processing starts (default: 100)
//     blockJSRequests: true, // set to false to load (external) JS (default: true)
//   })
//     .then((cri) => {
//       // use the critical css
//
//       mkdirp('./static/css/uncompressed/critical/', (err) => {
//         if (err) console.error(err);
//         else {
//           fs.writeFileSync(`./static/css/uncompressed/critical/${i}.css`, cri);
//           blessCSS({ f: `./static/css/uncompressed/critical/${i}.css`, url });
//
//           if (i === urls.length - 1) {
//             setTimeout(() => concatFiles({
//               src: ['static/css/uncompressed/critical/*.css'],
//               file: 'critical.css',
//               dest: './static/',
//             }), 5000);
//           }
//         }
//       });
//
//       // fs.writeFileSync(`./static/css/uncompressed/critical/${i}.css`, cri);
//     })
//     .catch((err) => {
//       console.log(err, url);
//       // handle the error
//     })), 5000);
// };


// gulp.task('generate-critical-css', () => criticalCSS([
//   // 'http://localhost:3000/practice/carbon-primary-care/carbon-financial-district/walkin',
//   // 'http://localhost:3000/practice/nice-healthcare/noLocation/virtual/embed',
//   // 'http://localhost:3000/scheduler/northbay/all/all/walkin/',
//   'http://localhost:3000',
//   'http://localhost:3000/locations',
//   'http://localhost:3000/carbon-financial-district',
//   'http://localhost:3000/instant-care',
//   'http://localhost:3000/urgent-care',
//   'http://localhost:3000/r/urinary-tract-infection-uti-symptoms',
// ]));

// gulp.task('critical-css', ['clean_uncompressed_css', 'generate-critical-css']);
//
// gulp.task('clean_allcss', () => cleanAllCss());
// gulp.task('clean_css', () => cleanCss());
// gulp.task('clean_uncompressed_css', () => cleanUncompressedCss());
// gulp.task('dev_css', () => devCss());
// gulp.task('prod_css', () => prodCss());
//
gulp.task('clean_allcss', () => cleanAllCss());

gulp.task('dev', gulp.series(gulp.parallel('clean_allcss', 'semantic-less', 'sass'),
  () => devCss()));

gulp.task('prod', gulp.series('dev', () => prodCss()));

gulp.task('webp', () => (
  gulp.src([
    './static/img/v5/**/*.png',
    './static/img/v5/_clinic_photos/**/*.jpg',
    // './static/img/insurance-logos/**/*.png',
  ], { base: './' })
    .pipe(webp({
      quality: 75,
      // lossless: true,
    }))
    .pipe(gulp.dest('./'))
));

// gulp.task('default', ['dev', 'connect', 'watch']);
