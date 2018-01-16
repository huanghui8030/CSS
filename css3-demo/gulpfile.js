/**
 * @description gulp配置文件，整合css/js/images等自动化插件
 * @author huanghui
 * @date 20160808
 */
var gulp = require('gulp'),                     //本地安装gulp所用到的地方
    less = require('gulp-less'),                //less文件转为css
    autoprefixer = require('gulp-autoprefixer'),//css添加厂商前缀
    rename = require('gulp-rename'),            //重命名
    concatCss = require('gulp-concat-css'),     //合并css
    watch = require('gulp-watch'),              //即时编译
    assetRev = require('gulp-chsi-rev'),	      //添加版本号
    clean = require('gulp-clean'),               //删除文件，做操作前先删除文件
    cssnano = require('gulp-cssnano');   //合并重复的css
var ArrAll = {     
    lessDir: 'css/less',//需要解析的less文件目录
    cssDir : 'css/custom',       //需要解析的less文件目录
};   

/**
 * @description：将less转化为css、加厂商前缀、css文件中链接加入版本号、重命名和压缩等
 * @author：huangh@chsi.com.cn 
 * @date：20160804
 **/

gulp.task('custionLess', function () {
    gulp.src([ArrAll.lessDir+'/*.less','!'+ArrAll.lessDir+'/_*.less']) //该任务针对的文件和不对其进行处理的文件
        .pipe(less())                      //将less转化为css
        .pipe(autoprefixer({               //加厂商前缀
            browsers: ['Android 2.3','Android >= 4','iOS >= 6',
              'Explorer >= 6','Chrome >= 20','Firefox >= 24','Opera >= 12'],
            cascade: true,                  //是否美化属性值 默认：true 
            remove:true                     //是否去掉不必要的前缀 默认：true 
        }))
        .pipe(assetRev())                   //给css中的链接添加版本号
        .pipe(gulp.dest(ArrAll.cssDir))     //生成css文件，less放到css源目录中，然后在同一压缩
});

/**
 * @description：css文件合并，不解析的js以下划线开头"_test.js"
 * @author：huangh@chsi.com.cn 
 * @date：20160805
 **/
gulp.task('concatCss',function(){
  gulp.src([ArrAll.cssDir+'/*.css','!'+ArrAll.cssDir+'/common*.css'])
      .pipe(concatCss('common.css'))
      .pipe(autoprefixer({               //加厂商前缀
            browsers: ['Android 2.3','Android >= 4','iOS >= 6',
              'Explorer >= 6','Chrome >= 20','Firefox >= 24','Opera >= 12'],
            cascade: true,                  //是否美化属性值 默认：true 
            remove:true                     //是否去掉不必要的前缀 默认：true 
        }))
      .pipe(assetRev())                   //给css中的链接添加版本号
      .pipe(gulp.dest(ArrAll.cssDir))
      .pipe(rename({ suffix: '.min' }))
      .pipe(cssnano())
      .pipe(gulp.dest(ArrAll.cssDir));
});

/**
 * @description：clean清空文件夹
 * @author：huangh@chsi.com.cn 
 * @date：20160804
 **/
gulp.task('clean',function(){
  gulp.src([ArrAll.cssDir+'/*.css',ArrAll.jsSrc+'/*.min.js'])
      .pipe(clean());
});

/**
 * @description：即时编译文件文件
 * @author：huangh@chsi.com.cn 
 * @date：20160804
 **/
gulp.task('watch',function(){
  gulp.watch(ArrAll.lessDir+'/*.less',['custionLess']);    //less解析为css，并进行优化处理 
});

/**
 * @description：默认任务
 * @author：huangh@chsi.com.cn 
 * @date：20160804
 **/
gulp.task('default',function(){
	gulp.start(['clean','custionLess','watch']);
});

