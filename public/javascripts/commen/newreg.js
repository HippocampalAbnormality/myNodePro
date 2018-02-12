;
/**
 * 新版WAP注册通用js  注册v4.0
 * @date 2016-09-13
 * @author cl
 */
(function($,itz) {
    
    itz.wap = itz.wap || {};

    /*
    * 需要动画时可调用，取代settimeout
    */
    itz.wap.rqa = function(callback, time){
        var s = window.requestAnimationFrame 
                || window.webkitRequestAnimationFrame 
                || window.mozRequestAnimationFrame 
                || window.setTimeout;
        return s(callback, time);
    };
    /*
     * 需要动画时可调用，取代cleartimeout
    */
    itz.wap.clearrqa = function(loop){
        var c = window.cancelAnimationFrame 
                || window.mozCancelAnimationFrame;
        if(typeof c == 'undefined') {
            clearTimeout(loop);
        } else {
            c(loop);
        }
    };
    /*
     * 简单的秒单位倒计时实现
    */
    itz.wap.countDown = function(op) {
        
        if(!op || !op.obj || op.obj.length<1) return;
        
        if(!(this instanceof itz.wap.countDown)) {
            return new itz.wap.countDown(op);
        }
        
        var me = this;
        me.op = $.extend({
            start: 60
            , startEl: ''
            , endEl: ''
            , property: 'html'
        }, op);

        me.st = new Date().getTime();
        me.span = me.st;
        me.cur = me.op.start;   
        var _c = [];

        var _cd = function(){
        
            me.op.obj[me.op.property](me.op.startEl + (me.cur<10&&me.cur>0 ? '0'+me.cur : me.cur) + me.op.endEl);
            
            var _td = new Date(),
                _temp = _td.getTime(),
                _span = _temp - me.st;

            if(_span < me.op.start*1000 && _temp-me.span>1000) {
                me.cur = me.op.start - Math.floor(_span/1000);
                me.span = _temp;
            }
            if(_span >= me.op.start*1000) {
                me.cur = 0;
                while(_c && _c.length>0) {
                    itz.wap.clearrqa(_c.pop());
                }
                typeof me.op.callback == 'function' && me.op.callback();
                return ;
            }
            _c.push(itz.wap.rqa(_cd, 1000));
        }
        _cd();
    };


    /**
     * 
     * @param  {[type]} _options [description]
     * @return {[type]}          [description]
     */

     /**
     * 
     * options添加changeBorder字段，一个类名，+name属性，用来选取dom，例：err-phone
     * 给validation对象的校验方法添加参数：$input
     * 添加增加/删除类名方法：addBorder/removeBorder
     */
    itz.wap.register = function(_options) {

        this.options = $.extend(true, {
            //检查手机号是否注册接口
            checkPhoneUrl : '/apiService/phone/isCertified',
            //发送验证码接口
            sendSmsUrl : '/apiService/phone/getSmsVcode',
            //注册接口
            regUrl : '/wap/user/newreg',
            //注册表单选择器
            form : '#regForm',
            //是否显示清除按钮
            showClean : true,
            //清除按钮选择器
            cleanClass : '.icon-clear',
            //错误提示选择器前缀，针对单个input错误使用方式是.error-[name],例如:手机号错误提示.error-phone
            errorClass : '.error',
            //其他错误提示选择器，若没有指定单个input错误提示，所有错误提示都显示在这个类下
            otherErrorClass : '.other-error',
            //密码是否可见按钮选择器
            eyeClass : '.icon-eye',
            //密码是否可见图标选择器
            eyeIcon : '.icon-eye',
            //密码是否可见，可见时样式类名
            showPwdClass : 'enable',
            //获取验证码按钮
            getSmsBtn : '.phone-valicode-btn',
            //图形验证码父级选择器
            validCodeWrapper : '#valicode-li',
            //图形验证码刷新按钮选择器
            validCodeReflash : '.vcode-wrapper',
            //注册按钮选择器
            regBtn : '.reg-btn',

            // 是否控制输入框样式改变
            changeBorder: false
        }, _options);

        var _this = this;

        //表单检验状态
        var valid = {
            phone : false,
            password : false,
            valicode : true,
            phoneValicode : false,
            invitee : true
        }

        //是否需要图形验证码校验
        var needVcode = false;
        //是否已发送短信验证码
        var isSendSms = false;
        //发送验证码按钮是否可点击（手机号、密码、图形验证码校验通过后）
        var enableGetSms = 1;

        /**
         * 显示错误提示
         * @param  {[jq对象]} $errorEle 显示错误提示的jq对象
         * @param  {[string]} msg       错误消息
         */
        function showError($errorEle,msg) {
            if ($errorEle && $errorEle[0]) {
                $errorEle.html(msg);
                $errorEle.show();
            }else if ($(_this.options.otherErrorClass) && $(_this.options.otherErrorClass)[0]) {
                $(_this.options.otherErrorClass).html(msg);
                $(_this.options.otherErrorClass).show();
            }
        }
        /**
         * 隐藏错误提示
         * @param  {[jq对象]} $errorEle 显示错误提示的jq对象
         */
        function hideError($errorEle) {
            if ($errorEle && $errorEle[0]) {
                $errorEle.html();
                $errorEle.hide();
            }else if ($(_this.options.otherErrorClass) && $(_this.options.otherErrorClass)[0]) {
                $(_this.options.otherErrorClass).html();
                $(_this.options.otherErrorClass).hide();
            }
        }

        /**
         * 根据校验状态更新获取验证码按钮样式
         * @return {[type]} [description]
         */
        // function toggleSmsBtnCls(){
        //     var $getSmsBtn = $(_this.options.getSmsBtn);
        //     if(!needVcode){
        //         if(valid.phone && valid.password && enableGetSms){
        //             $getSmsBtn.addClass('red');
        //         }else{
        //             $getSmsBtn.removeClass('red');
        //         }
        //     }else {
        //         if(valid.phone && valid.password && valid.valicode && enableGetSms){
        //             $getSmsBtn.addClass('red');
        //         }else{
        //             $getSmsBtn.removeClass('red');
        //         }
        //     }
        // }

        /**
         * 添加增加/删除类名方法：addBorder/removeBorder
         * @param $target 目标元素
         * @param className 类名
         */
        function addBorder($target, className) {
            if (_this.options.changeBorder) {
                $target.addClass(className);
            };
        };
        function removeBorder($target, className) {
            if (_this.options.changeBorder) {
                $target.removeClass(className);
            };
        };

        //表单校验对象
        var validation = {
            //开始按顺序校验
            run : function(name,value) {
                var name = name,value = value;
                $(_this.options.errorClass).hide();
                if (!valid.phone) {
                    name = 'phone';
                    value = $('input[name='+name+']').val();
                } else if (!valid.password) {
                    name = 'password';
                    value = $('input[name='+name+']').val();
                } else if (needVcode && !valid.valicode) {
                    name = 'valicode';
                    value = $('input[name='+name+']').val();
                } else if (!valid.phoneValicode) {
                    name = 'phoneValicode';
                    value = $('input[name='+name+']').val();
                }
                var $errorEle = $(_this.options.errorClass+'-'+name);
                var $input = $('.' + _this.options.changeBorder+'-'+name);
                this[name] && this[name].call(this,$.trim(value),$errorEle,undefined,$input);
            },
            //校验手机号
            phone : function(value,$errorEle,errorMsg,$input) {
                
                var patten = new RegExp(/^1\d{10}$/);
                if (errorMsg) {
                    valid.phone = false;
                    showError($errorEle,errorMsg);
                    return false;
                } else if (!value) {
                    valid.phone = false;
                    addBorder($input, _this.options.changeBorder);
                    showError($errorEle,'请输入正确的手机号码');
                    return false;
                } else if (!patten.test(value)) {
                    valid.phone = false;
                    addBorder($input, _this.options.changeBorder);                     
                    showError($errorEle,'手机号码格式不正确，请重新输入');
                    return false;
                } else {
                    valid.phone = true;
                    removeBorder($input, _this.options.changeBorder);
                    hideError($errorEle);
                    return true;
                }
            },
            //校验密码
            password : function(value,$errorEle,errorMsg,$input) {
                if (errorMsg) {
                    valid.password = false;
                    showError($errorEle,errorMsg);
                    return false;
                } else if (!value) {
                    valid.password = false;
                    addBorder($input, _this.options.changeBorder);                     
                    showError($errorEle,'请输入密码');
                    return false;
                } else if (/[^0-9a-zA-Z`~!@#\$%\^&\*()\-=_\+\[\]\\\{\}\|\;':",\.\/<>?]/.test(value)) {
                    valid.password = false;
                    addBorder($input, _this.options.changeBorder);                     
                    showError($errorEle,'密码只能包含字母、数字及标点符号（除空格）');
                    return false;
                } else if (value.length < 6 || value.length > 16) {
                    valid.password = false;
                    addBorder($input, _this.options.changeBorder);                     
                    showError($errorEle,'密码请输入6-16位字符');
                    return false;
                } else{
                    valid.password = true;
                    removeBorder($input, _this.options.changeBorder);
                    hideError($errorEle);
                    return true;
                }
            },
            //校验图形验证码
            valicode : function(value,$errorEle,errorMsg,$input) {
                if (needVcode == false) {
                    return true;
                } else if (errorMsg) {
                    valid.valicode = false;
                    showError($errorEle,errorMsg);
                    return false;
                } else if (!value) {
                    valid.valicode = false;
                    addBorder($input, _this.options.changeBorder);                     
                    showError($errorEle,'请输入图形验证码');
                    return false;
                } else if (!/^[\da-zA-Z]{4,10}$/.test(value)) {
                    valid.valicode = false;
                    addBorder($input, _this.options.changeBorder);                     
                    showError($errorEle,'图形验证码不正确，请重新输入');
                    return false;
                }else{
                    valid.valicode = true;
                    removeBorder($input, _this.options.changeBorder);
                    hideError($errorEle);
                    return true;
                }

            },
            //校验短信验证码（仅前端校验）
            phoneValicode : function(value,$errorEle,errorMsg,$input) {
                if (errorMsg) {
                    valid.phoneValicode = false;
                    showError($errorEle,errorMsg);
                    return false;
                } else if (!value) {
                    valid.phoneValicode = false;
                    addBorder($input, _this.options.changeBorder);                     
                    showError($errorEle,'请输入短信验证码');
                    return false;
                } else if (!isSendSms) {
                    valid.phoneValicode = false;
                    addBorder($input, _this.options.changeBorder);                     
                    showError($errorEle,'短信验证码不正确，请重新输入');
                    return false;
                } else{
                    valid.phoneValicode = true;
                    removeBorder($input, _this.options.changeBorder);
                    hideError($errorEle);
                    return true;
                }

            },
            //校验邀请人
            invitee : function(value,$errorEle,errorMsg,$input) {
                if (errorMsg) {
                    valid.invitee = false;
                    showError($errorEle,errorMsg);
                    return false;
                } else if (!value) {
                    addBorder($input, _this.options.changeBorder);                     
                    valid.invitee = true;
                    hideError($errorEle); 
                } else{
                    valid.invitee = true;
                    removeBorder($input, _this.options.changeBorder);
                    hideError($errorEle);
                    return true;
                }
            }
        }
        
        
        var $regForm = $(this.options.form);
        var $getSmsBtn = $(_this.options.getSmsBtn);
        $regForm.find('input').bind('input', function(event) {
            if (_this.options.showClean) {
                var $iconClear = $(this).siblings(_this.options.cleanClass);
                if ($(this).val() == '') {
                    $iconClear.hide();
                } else {
                    $iconClear.show();
                }
            }
            //重新输入时清除校验状态
            var name = $(this).attr('name');
            valid[name] = false;
            if (name == 'valicode' && !needVcode) {
                valid.valicode = true;
            }else if(name == 'invitee'){
                valid.invitee = true;
            }

            if( name == 'phone' ){
                if( (new RegExp(/^1\d{0,10}/)).test($(this).val()) ){
                    $getSmsBtn.addClass('red');
                }else{
                    $getSmsBtn.removeClass('red');
                }
            }
        });
        //清除输入按钮事件绑定
        if (this.options.showClean) {
            $(_this.options.cleanClass).on('click', function(event) {
                event.preventDefault();
                var $input = $(this).siblings('input');
                $input.val('');
                var name = $(this).siblings('input').attr('name');
                valid[name] = false;
                if (name == 'valicode' && !needVcode) {
                    valid.valicode = true;
                }else if(name == 'invitee'){
                    valid.invitee = true;
                }
                $(this).hide();
                validation.run(name,$input.val());

            });
        }

        //输入框失去焦点时校验
        $regForm.find('input').bind('blur', function(event) {
            validation.run($(this).attr('name'),$(this).val());
            // toggleSmsBtnCls();
        });

        //密码是否可见事件绑定
        var $showPwd = $(_this.options.eyeClass),
            $eyeIcon = $(_this.options.eyeIcon),
            $password = $regForm.find('input[type=password]');
        $showPwd.on("click", function(){
            $eyeIcon.toggleClass(_this.options.showPwdClass);
            if( $eyeIcon.hasClass(_this.options.showPwdClass) ){
                $password.attr("type", "text");
            }else{
                $password.attr("type", "password");
            }
        });
        //刷新图形验证码
        function reflashVcode() {
            $('input[name=valicode]').val('');
            $(_this.options.validCodeReflash).find('img')[0].src = '/apiService/captcha/reg?t=' + Math.random();
        }

        $(_this.options.validCodeReflash).on('click', function(event) {
            event.preventDefault();
            reflashVcode();
        });

        var $vcodeWrapper = $(_this.options.validCodeWrapper);
        //显示图形验证码（需要校验图形验证码时）
        function showVcodeWrapper() {
            $vcodeWrapper.find('img')[0].src = '/apiService/captcha/reg?t=' + Math.random();
            $vcodeWrapper.slideDown();
            needVcode = true;
            valid.valicode = false;
        }
        //判断是否需要图形验证码
        function checkIfNeedVcode(){
            if( !needVcode ){
                return true;
            }else{
                if( validation.valicode($regForm.find("input[name='valicode']").val()) ){
                    return true;
                }else{
                    return false;
                }
            }
        }
        //获取短信验证码按钮事件绑定
        $regForm.on('click', _this.options.getSmsBtn, function(event) {
            event.preventDefault();
            // if ( !validation.phone($regForm.find("input[name='phone']").val()) || !checkIfNeedVcode() ){
            //     return false;
            // }
            if (!validation.phone($regForm.find("input[name='phone']").val()) || !checkIfNeedVcode() || !enableGetSms) {
                return false;
            }
            var phoneVal = $.trim($regForm.find('input[name=phone]').val()),
                valicodeVal = $.trim($regForm.find('input[name=valicode]').val());
            var $getSmsBtn = $(_this.options.getSmsBtn);
            enableGetSms = 0;
            send && send.abort();
            $getSmsBtn.html('获取中...');
            var send = $.ajax({
                url: _this.options.sendSmsUrl,
                type: 'post',
                data: {
                    phone: phoneVal, 
                    voice: false, 
                    valicode: valicodeVal
                },
                dataType: 'json',
                success: function( data, ts ){
                    isSendSms = true;
                    if ( data.code > 0 ) {
                        if ( data.code === 2008 && $vcodeWrapper.is(':hidden') ) {
                            showVcodeWrapper();
                            validation.valicode('',$(_this.options.errorClass+'-valicode'),data.info);
                        }else if (data.code === 2106 || data.code === 2105) {
                            validation.valicode('',$(_this.options.errorClass+'-valicode'),data.info);
                            reflashVcode();
                        } else if (data.code === 2018) {
                            validation.phone('',$(_this.options.errorClass+'-phone'),'该手机号码已注册，立即<a href="/newuser/index/loginWap?username=' + phoneVal + '">登录</a>');
                        } else {
                            validation.phoneValicode('',$(_this.options.errorClass+'-phoneValicode'),data.info);
                        }
                        enableGetSms = 1;
                        $getSmsBtn.html('获取验证码');
                    } else {
                        $getSmsBtn.addClass('font_small');
                        itz.wap.countDown({
                            obj: $getSmsBtn,
                            endEl: 's重新获取',
                            callback: function() {
                                enableGetSms = 1;
                                $getSmsBtn.html('重新获取');
                                $getSmsBtn.removeClass("font_small");
                                // $getSmsBtn.addClass("red");
                                // toggleSmsBtnCls();
                                
                            }
                        });
                    }
                    // toggleSmsBtnCls();
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    enableGetSms = 1;
                    var error = (textStatus == "timeout") ? '请求超时，请重试' : '爱亲，网络不畅，请重试';
                    validation.phoneValicode('',$(_this.options.errorClass+'-phoneValicode'),error);
                }
            })
        });

        //注册按钮事件绑定
        var enableSubmit = 1;
        $regForm.on('click', _this.options.regBtn, function(event) {
            event.preventDefault();
            if (!valid.phone || !valid.password || (needVcode && !valid.valicode) || !valid.phoneValicode || !enableSubmit) {
                validation.run();
                return false;
            }

            var params = $regForm.serialize();
            enableSubmit = 0;
            var ajaxObj;
            ajaxObj && ajaxObj.abort();
            ajaxObj = $.ajax({
                url: _this.options.regUrl,
                type: 'post',
                dataType: 'json',
                data: params,
                timeout: 20000,
                success: function(data) {
                    if (data.code === 0) {
                        var redirectUrl = '/wap/user/regSuccess',
                            r_data = data.data;
                        if(r_data.event_flag && r_data.event_url){
                            redirectUrl = r_data.event_url;
                        }
                        location.href = redirectUrl;
                    } else {
                        if ( data.code === 2008 && $vcodeWrapper.is(':hidden') ) {
                            showVcodeWrapper();
                        }
                        if (needVcode) {
                            reflashVcode();
                        }
                        switch (data.code) {
                            case 2006:
                                validation.phone('',$(_this.options.errorClass+'-phone'),data.info);
                                break;
                            case 2012:
                                validation.phone('',$(_this.options.errorClass+'-phone'),data.info);
                                break;
                            case 2018:
                                validation.phone('',$(_this.options.errorClass+'-phone'),data.info);
                                break;
                            case 2007:
                                validation.password('',$(_this.options.errorClass+'-password'),data.info);
                                break;
                            case 2014:
                                validation.password('',$(_this.options.errorClass+'-password'),data.info);
                                break;
                            case 2008:
                                validation.valicode('',$(_this.options.errorClass+'-valicode'),data.info);
                                break;
                            case 2105:
                                validation.valicode('',$(_this.options.errorClass+'-valicode'),data.info);
                                break;
                            case 2106:
                                validation.valicode('',$(_this.options.errorClass+'-valicode'),data.info);
                                break;
                            case 2004:
                            case 2054:
                                validation.invitee('',$(_this.options.errorClass+'-invitee'),data.info);
                                break;
                            case 2043:
                                validation.phoneValicode('',$(_this.options.errorClass+'-phoneValicode'),data.info);
                                break;
                            case 2104:
                                validation.phoneValicode('',$(_this.options.errorClass+'-phoneValicode'),data.info);
                                break;
                            default:
                                $(_this.options.otherErrorClass).html(data.info).show();
                        }
                        // toggleSmsBtnCls();
                        enableSubmit = 1;
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    if (needVcode) {
                        reflashVcode();
                    }
                    enableSubmit = 1;
                    if (textStatus == "timeout") {
                        $(_this.options.otherErrorClass).html('请求超时，请重试').show();
                        return;
                    }
                    $(_this.options.otherErrorClass).html('爱亲，网络不畅，请重试').show();
                }
            });

        });




    };

})(jQuery,itz||{});
