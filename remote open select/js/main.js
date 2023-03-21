$("label").mouseover(function () {
    var $this = $(this);
    var $input = $('#' + $(this).attr('for'));
    if ($input.is("select") && !$('.lfClon').length) {
        var $clon = $input.clone();
        var getRules = function ($ele) {
            return {
                position: 'absolute',
                left: $ele.offset().left,
                top: $ele.offset().top,
                width: $ele.outerWidth(),
                height: $ele.outerHeight(),
                opacity: 0,
                margin: 0,
                padding: 0
            };
        };
        var rules = getRules($this);
        $clon.css(rules);
        $clon.on("mousedown.lf", function () {
            $clon.css({
                marginLeft: $input.offset().left - rules.left,
                marginTop: $input.offset().top - rules.top,
            });
            $clon.on('change blur', function () {
                $input.val($clon.val()).show();
                $clon.remove();
            });
            $clon.off('.lf');
        });
        $clon.on("mouseout.lf", function () {
            $(this).remove();
        });
        $clon.prop({
            id: '',
            className: 'lfClon'
        });
        $clon.appendTo('body');
    }
});